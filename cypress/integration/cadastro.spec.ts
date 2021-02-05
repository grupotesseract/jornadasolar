/// <reference types="cypress" />
/// <reference types="cypress-firebase" />
export {}

describe('Cadastro', () => {
  beforeEach(() => {
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
    cy.visit('/cadastro')

    cy.get('[data-cy=identificacao_nome]').type('Teste cadastro')
    cy.get('[data-cy=submit]').click()

    cy.get(
      ':nth-child(1) > .MuiIconButton-label > .PrivateSwitchBase-input-23'
    ).check('Autoconhecimento')
    cy.get('[data-cy=submit').click()

    cy.get(
      ':nth-child(2) > .MuiIconButton-label > .PrivateSwitchBase-input-23'
    ).check(['makeStyles-label-31', 'alegre'])
    cy.get('[data-cy=submit]').click()

    cy.get(
      '.MuiBox-root-50 > .MuiGrid-container > :nth-child(2)> .MuiButtonBase-root > .MuiIconButton-label > .PrivateSwitchBase-input-23'
    ).check()
    cy.get('[data-cy=submit]').click()

    cy.get('[data-cy=autenticacao_email]').type('testecadastro@teste.com')

    cy.get('[data-cy=autenticacao_password]').type('123321')
    cy.get('[data-cy=submit]').click()
  })
})
