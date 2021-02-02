/// <reference types="cypress" />
export {}

describe('Login', () => {
  let user

  beforeEach(() => {
    cy.visit('/login')
    cy.fixture('user.json').then(u => (user = u))
  })

  it('successfully signs in', () => {
    cy.get('[data-cy=login_usuario]').type(user.email)
    cy.get('[data-cy=login_password]').type(user.password)
    cy.get('[data-cy=submit]').click()
  })
})
