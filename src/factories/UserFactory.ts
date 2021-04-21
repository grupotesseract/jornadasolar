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
      role
    } = userSnapshot.data()

    return new User({
      id,
      nome,
      email,
      password,
      temLivro,
      objetivos,
      role
    })
  }
}
