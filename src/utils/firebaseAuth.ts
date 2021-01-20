interface Message {
  email?: string
  password?: string
}

export const getMessageFromCode = (code: string): Message => {
  switch (code) {
    case 'auth/email-already-in-use':
      return { email: 'Email já cadastrado' }
    case 'auth/invalid-email':
      return { email: 'Email inválido' }
    case 'auth/weak-password':
      return { password: 'A senha deve ter 6 caracteres ou mais' }
    case 'auth/wrong-password':
      return {
        password:
          'Senha incorreta. Tente novamente ou clique em "Esqueceu a senha?" para redefini-la'
      }
    case 'auth/user-not-found':
      return { email: 'Email não encontrado' }
    default:
      return null
  }
}
