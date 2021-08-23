import User, { IUser } from '../entities/User'

export interface IUserFactory {
  build(userSnapshot: any): IUser
}

export default class UserFactory {
  build(userSnapshot: any): IUser {
    const { id } = userSnapshot
    const {
      nome,
      email,
      password,
      temLivro,
      objetivos,
      role,
      novidadesDispensadas
    } = userSnapshot.data()

    const dados = userSnapshot.data()
    const lastAccess = dados.lastAccess ? dados.lastAccess.toDate() : null
    const countAccess = dados.countAccess ? dados.countAccess : 0

    return new User({
      id,
      nome,
      email,
      password,
      temLivro,
      objetivos,
      role,
      novidadesDispensadas: novidadesDispensadas || [],
      lastAccess: lastAccess,
      countAccess: countAccess
    })
  }
}
