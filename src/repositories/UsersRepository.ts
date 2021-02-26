import { firestore, auth } from '../components/firebase/firebase.config'
import firebase from 'firebase/app'
import CreateOrUpdateRegistro from '../services/registro/CreateOrUpdateRegistro'
import User, { IUser } from '../entities/User'
import { IGruposDeHabitos } from 'src/entities/Registro'
import TemLivroOptions from '../enums/user/TemLivroOptions'

interface ICreateParameters {
  nome: string
  email: string
  password: string
  objetivos: Array<string>
  temLivro: TemLivroOptions
  sentimentos: Array<string>
  gruposDeHabitos: Array<IGruposDeHabitos>
}

export interface IUsersRepository {
  add(params): Promise<IUser>
}

export default class UsersRepository implements IUsersRepository {
  private collection

  constructor() {
    this.collection = firestore.collection('user')
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
    this.collection.doc(user.uid).set(data)
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
}
