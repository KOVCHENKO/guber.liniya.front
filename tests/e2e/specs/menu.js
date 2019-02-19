describe('check menu', () => {
    beforeEach(() => {
        cy.login('dispatcher@dispatcher.ru', 'admin')
    })

    it('should render dispatcher', () => {
        cy.get('#menu-button').click()

        cy.get('a').contains('Заявки').click()

        cy.url().should('include', '/dispatcher_applications/all')
    })

    it('should render analytics', () => {
        cy.get('#menu-button').click()

        cy.get('a').contains('Аналитика').click()

        cy.url().should('include', '/analytics')
    })

    it('should render calls', () => {
        cy.get('#menu-button').click()

        cy.get('a').contains('Звонки').click()

        cy.url().should('include', '/calls')
    })




})
