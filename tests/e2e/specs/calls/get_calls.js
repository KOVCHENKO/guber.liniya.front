// https://docs.cypress.io/api/introduction/api.html

import {baseUrlForTest} from "../../../globals";

describe('calls test', () => {
    beforeEach(() => {
        cy.login('supervisor@supervisor.ru', 'admin')
    })

    it('show calls', () => {
        cy.visit(`${baseUrlForTest}calls`)
        cy.contains('h2', 'Все звонки')
    })

    it('show calls per day', () => {
        cy.visit(`${baseUrlForTest}calls`)
        cy.get('#inputGroupSelect01').select('day')
    })

    it('show calls per week', () => {
        cy.visit(`${baseUrlForTest}calls`)
        cy.get('#inputGroupSelect01').select('week')
    })

    it('Does not do much!', function() {
        expect(true).to.equal(true)
    })

})
