/// <reference types="cypress" />
/// <reference types="cypress-firebase" />
export {}

describe('Diario', () => {
  beforeEach(() => {
    cy.visit('/diario')
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
      })
    })
  })

  it('Preenche diário', () => {
    cy.get('[data-cy=box-diario]')
      .eq(0)
      .find('[data-cy=link-preencher]')
      .first()
      .click()

    // Prenche sentimentos e checa se está sendo exibido
    cy.get('input[name=Alegre]').check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=box-detalhe]').eq(0).contains('Alegre')

    // Prenche hábitos e checa se está sendo exibido
    cy.get('[data-cy=link-editar]').eq(1).click()
    cy.get('input[name=Amigos]').check()
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=box-detalhe]').eq(1).contains('Amigos')

    // Prenche anotações e checa se está sendo exibida
    cy.get('[data-cy=link-editar]').eq(2).click()
    cy.get('[data-cy=text-area]').type('Teste')
    cy.get('[data-cy=submit]').click()
    cy.get('[data-cy=box-detalhe]').eq(2).contains('Teste')

    // Volta para página diário
    cy.get('[data-cy=link-voltar]').click()
  })
})
