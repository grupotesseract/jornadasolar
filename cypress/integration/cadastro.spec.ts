/// <reference types="cypress" />
/// <reference types="cypress-firebase" />
export {}

describe('Cadastro', () => {
  beforeEach(() => {
    cy.visit('/cadastro')

    cy.exec('node  ./cypress/support/deleteAuthUserFirebase.js', {
      env: { email: 'testecadastro@teste.com' }
    })

    cy.callFirestore('get', 'user', {
      where: ['email', '==', 'testecadastro@teste.com']
    }).then(users => {
      ;(users || []).forEach(user => {
        cy.callFirestore('get', 'diario', {
          where: ['userId', '==', user.id]
        }).then(diarios => {
          ;(diarios || []).forEach(diario =>
            cy.callFirestore('delete', `diario/${diario.id}`)
          )
        })

        cy.callFirestore('delete', `user/${user.id}`)
      })
    })
  })

  it('successfully signs up', () => {
    // Preenche passos para o cadastro
    cy.get('[data-cy=identificacao_nome]').type('Teste cadastro')
    cy.get('[data-cy=submit]').click()
    cy.get('input[name=Autoconhecimento]').check()
    cy.get('[data-cy=submit]').click()
    cy.get('input[name=Alegre]').check()
    cy.get('[data-cy=submit]').click()
    cy.get('input[name=Amigos]').check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=autenticacao_email]').type('testecadastro@teste.com')
    cy.get('[data-cy=autenticacao_password]').type('123321')
    cy.get('[data-cy=submit]').click().as('diario')

    // Verifica se os dados preenchidos no cadastro estão sendo exibidos
    cy.get('[data-cy=ver-mais]').first().click()
    cy.get('[data-cy=diario]').first().contains('Alegre')
    cy.get('[data-cy=diario]').eq(1).contains('Amigos')

    // Volta para página diário
    cy.get('[data-cy=link-voltar]').click()
  })
})
