import { firestore, auth } from '../components/firebase/firebase.config'
import firebase from 'firebase/app'
import CreateOrUpdateRegistro from '../services/registro/CreateOrUpdateRegistro'
import User, { IUser } from '../entities/User'
import { IGrupoDeHabitos } from '../entities/GrupoDeHabitos'
import TemLivroOptions from '../enums/user/TemLivroOptions'
import UserFactory, { IUserFactory } from '../factories/UserFactory'

interface ICreateParameters {
  nome: string
  email: string
  password: string
  objetivos: Array<string>
  temLivro: TemLivroOptions
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGrupoDeHabitos>
}

export interface IUsersRepository {
  add(params): Promise<IUser>
  getById(id: string): Promise<IUser>
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
    const { user } = await auth.createUserWithEmailAndPassword(email, password)
    await user.updateProfile({
      displayName: nome
    })
    const data = {
      nome,
      email,
      objetivos,
      temLivro,
      created_at: now,
      updated_at: now
    }
    await this.collection.doc(user.uid).set(data)
    await new CreateOrUpdateRegistro().call({
      date: now,
      userId: user.uid,
      sentimentos,
      gruposDeHabitos
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

  async getById(id: string): Promise<IUser> {
    try {
      const userSnapshot = await this.collection.doc(id).get()
      const user = this.factory.build(userSnapshot)

      return user
    } catch (e) {
      throw new Error('Ocorreu um erro inesperado ao buscar o usuário:' + e)
    }
  }
}
