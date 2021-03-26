const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public'
  }
})

// TODO: Remover quando a funcionalidade de novos hábitos estiver disponível
module.exports = {
  async redirects() {
    return [
      {
        source: '/diario/:date/habitos/novo',
        destination: '/',
        permanent: true,
      },
    ]
  },
}
