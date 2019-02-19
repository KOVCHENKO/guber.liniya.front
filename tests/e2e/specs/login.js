// https://docs.cypress.io/api/introduction/api.html

describe('login page test', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('shows authorization', () => {
        cy.contains('h1', 'Авторизация')
    })

    it('can login', () => {
        cy.get('input#md-input-email')
            .type('dispatcher@dispatcher.ru')

        cy.get('input#md-input-password')
            .type('admin')

        cy.contains('Войти')
            .click()

        cy.url().should('include', '/')

    })
})
