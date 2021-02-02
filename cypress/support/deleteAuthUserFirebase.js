/* eslint-disable @typescript-eslint/no-var-requires */
if (!process.env.email) {
  console.log('no email provided')
  process.exit(1)
}

const admin = require('firebase-admin')
const firebaseServiceAccount = require('../plugins/firebaseServiceAccount.json')
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount)
})

admin
  .auth()
  .getUserByEmail(process.env.email)
  .then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    // console.log('Successfully fetched user data:', userRecord.toJSON())
    admin
      .auth()
      .deleteUser(userRecord.uid)
      .then(function () {
        console.log('usuário deletado com sucesso')
        process.exit(0)
      })
      .catch(function (error) {
        console.log(error.code)
        process.exit(1)
      })
  })
  .catch(function (error) {
    if (error.code === 'auth/user-not-found') process.exit(0)
    console.log('Erro ao buscar usuário:', error)
    process.exit(1)
  })
