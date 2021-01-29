/// <reference types="cypress" />
export {}

describe('Cadastro', () => {
  it('successfully signs up', () => {
    cy.visit('/cadastro')

    cy.get('[data-cy=identificacao_nome]').type('Teste')
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

    cy.get('[data-cy=autenticacao_email]').type('teste@teste.com')

    cy.get('[data-cy=autenticacao_password]').type('123321')
    cy.get('[data-cy=submit]').click()
  })
})
