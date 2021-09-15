import TemLivroOptions from '../enums/user/TemLivroOptions'

interface IUserAttributes {
  id: string
  nome: string
  email: string
  password: string
  objetivos: Array<string>
  temLivro: TemLivroOptions
  role?: string
  novidadesDispensadas?: Array<string>
  novidadeDispensada?(slug: string): boolean
  lastAccess?: Date
  countAccess?: number
}

export type IUser = IUserAttributes

export default class User implements IUser {
  public id: string
  public nome: string
  public email: string
  public password: string
  public objetivos: Array<string>
  public temLivro: TemLivroOptions
  public role: string
  public novidadesDispensadas: Array<string>
  public lastAccess?: Date
  public countAccess?: number

  constructor({
    id,
    nome,
    email,
    password,
    objetivos,
    temLivro,
    role,
    novidadesDispensadas,
    lastAccess,
    countAccess
  }: IUserAttributes) {
    this.id = id
    this.nome = nome
    this.email = email
    this.password = password
    this.objetivos = objetivos
    this.temLivro = temLivro
    this.role = role
    this.novidadesDispensadas = novidadesDispensadas
    this.lastAccess = lastAccess
    this.countAccess = countAccess
  }

  novidadeDispensada(slug: string): boolean {
    return this.novidadesDispensadas.includes(slug)
  }
}
