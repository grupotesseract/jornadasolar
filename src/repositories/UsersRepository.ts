import { firestore, auth } from '../components/firebase/firebase.config'
import firebase from 'firebase/app'
import CreateOrUpdateRegistro from '../services/registro/CreateOrUpdateRegistro'
import User, { IUser } from '../entities/User'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import TemLivroOptions from '../enums/user/TemLivroOptions'
import UserFactory, { IUserFactory } from '../factories/UserFactory'
import GetAllGruposDeHabitosModelos from 'src/services/grupoDehabitos/GetAllGruposDeHabitosModelos'
import CreateUserGrupoDeHabitos from 'src/services/user/CreateUserGrupoDeHabitos'
import GetAllSentimentosModelos from 'src/services/sentimentosModelos/GetAllSentimentosModelos'
import CreateUserSentimentos from 'src/services/sentimentos/CreateUserSentimento'
import GetUserGruposDeHabitos from 'src/services/user/GetUserGruposDeHabitos'
import GetSentimentosByUserId from 'src/services/sentimentos/GetSentimentosByUserId'
import { isSameDay } from 'date-fns'

interface ICreateParameters {
  nome: string
  email: string
  password: string
  objetivos: Array<string>
  temLivro: TemLivroOptions
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGrupoDeHabitos>
}

interface IUpdateParameters {
  id: string
  attributes: Record<string, unknown>
}

export interface IUsersRepository {
  add(params): Promise<IUser>
  getById(id: string): Promise<IUser>
  update(params): boolean
  updateAccessFlags(user: IUser): void
}

export default class UsersRepository implements IUsersRepository {
  private collection
  private factory: IUserFactory

  constructor() {
    this.collection = firestore.collection('user')
    this.factory = new UserFactory()
  }

  async add({
    nome,
    email,
    password,
    objetivos,
    temLivro,
    sentimentos,
    gruposDeHabitos
  }: ICreateParameters): Promise<IUser> {
    const now = firebase.firestore.FieldValue.serverTimestamp()

    // Cria usuário no firebase auth
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    await user.updateProfile({
      displayName: nome
    })

    // Cria usuário na collection user
    const data = {
      nome,
      email,
      objetivos,
      temLivro,
      created_at: now,
      updated_at: now,
      lastAccess: now,
      countAccess: 1
    }
    await this.collection.doc(user.uid).set(data)

    // Cria subcollection de gruposDeHabitos com subcollection de habitos na collection user
    const gruposDeHabitosModelos = await new GetAllGruposDeHabitosModelos().call()
    gruposDeHabitosModelos.forEach(async grupoDeHabitoModelo => {
      await CreateUserGrupoDeHabitos({
        userId: user.uid,
        grupoDeHabitos: grupoDeHabitoModelo
      })
    })

    // Busca grupos de hábitos do usuário e atualiza o gruposDeHabitos do registro com os ids
    const gruposDeHabitosDoUsuario = await GetUserGruposDeHabitos(user.uid)
    const gruposDeHabitosAtualizados = gruposDeHabitos.map(grupoDeHabito => {
      const grupoDoUsuario = gruposDeHabitosDoUsuario.find(
        grupoDeHabitosDoUsuario =>
          grupoDeHabitosDoUsuario.nome.toLowerCase() ===
          grupoDeHabito.nome.toLowerCase()
      )
      const habitosDoUsuario = grupoDeHabito.habitos.map(habito => {
        const habitoDoUsuario = grupoDoUsuario.habitos.find(
          habitoDoUsuario =>
            habitoDoUsuario.nome.toLowerCase() === habito.nome.toLowerCase()
        )
        return {
          ...habito,
          id: habitoDoUsuario.id
        }
      })

      return {
        ...grupoDeHabito,
        id: grupoDoUsuario.id,
        habitos: habitosDoUsuario
      }
    })

    // Cria subcollection de sentimentos na collection user
    const sentimentosModelos = await new GetAllSentimentosModelos().call()
    const serviceCreateSentimento = new CreateUserSentimentos(user.uid)

    sentimentosModelos.forEach(async sentimento => {
      const { id, nome, emojiUnicode } = sentimento
      await serviceCreateSentimento.call({
        idSentimentoModelo: id,
        nome,
        emojiUnicode
      })
    })

    const sentimentosDoUsuario = await new GetSentimentosByUserId(
      user.uid
    ).call()
    const sentimentosAtualizado = sentimentos.map(sentimento => {
      const sentimentoUsuario = sentimentosDoUsuario.find(
        sentimentoUser => sentimentoUser.idSentimentoModelo === sentimento
      )
      return sentimentoUsuario.id
    })

    // Cria o primeiro registro do usuário no diário
    await new CreateOrUpdateRegistro().call({
      date: now,
      userId: user.uid,
      sentimentos: sentimentosAtualizado,
      gruposDeHabitos: gruposDeHabitosAtualizados
    })

    return new User({
      id: user.uid,
      nome,
      email,
      password,
      temLivro,
      objetivos
    })
  }

  updateAccessFlags(user: IUser): void {
    const hoje = new Date()
    const mesmoDia = isSameDay(hoje, user.lastAccess)

    if (!mesmoDia) {
      try {
        const acessos = user.countAccess + 1
        if (!user.lastAccess) {
          this.collection
            .doc(user.id)
            .set({ lastAccess: hoje, countAccess: acessos }, { merge: true })
        } else {
          this.update({
            id: user.id,
            attributes: { lastAccess: hoje, countAccess: acessos }
          })
        }
      } catch (e) {
        throw new Error('Ocorreu um erro inesperado ao atualizar usuário.' + e)
      }
    }
  }

  async getById(id: string): Promise<IUser> {
    try {
      const userSnapshot = await this.collection.doc(id).get()
      const user = this.factory.build(userSnapshot)

      return user
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao buscar o usuário:' + e)
    }
  }

  update({ id, attributes }: IUpdateParameters): boolean {
    try {
      this.collection.doc(id).update(attributes)
      return true
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao atualizar usuário.' + e)
    }
  }
}
