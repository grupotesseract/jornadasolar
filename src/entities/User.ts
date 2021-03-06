import TemLivroOptions from '../enums/user/TemLivroOptions'

interface IUserAttributes {
  id: string
  nome: string
  email: string
  password: string
  objetivos: Array<string>
  temLivro: TemLivroOptions
}

export type IUser = IUserAttributes

export default class User implements IUser {
  public id: string
  public nome: string
  public email: string
  public password: string
  public objetivos: Array<string>
  public temLivro: TemLivroOptions

  constructor({
    id,
    nome,
    email,
    password,
    objetivos,
    temLivro
  }: IUserAttributes) {
    this.id = id
    this.nome = nome
    this.email = email
    this.password = password
    this.objetivos = objetivos
    this.temLivro = temLivro
  }
}
