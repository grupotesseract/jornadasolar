const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    scope: '/app'
  }
})

// TODO: Remover quando a funcionalidade de novos hábitos estiver disponível
module.exports = {
  async redirects() {
    return [
      {
        source: '/app/diario/:date/habitos/novo',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
