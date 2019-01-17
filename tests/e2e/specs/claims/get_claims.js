import {baseUrlForTest} from '../../globals';


describe('claims test', () => {
    beforeEach(() => {
        cy.loginRequest('supervisor@supervisor.ru', 'admin')
    })

    it('show claims title', () => {
        cy.visit(`${baseUrlForTest}dispatcher_applications/all`)
        cy.contains('h2', 'Все заявки')
    })

})
