// https://docs.cypress.io/api/introduction/api.html

import {baseUrlForTest} from "../../globals";

describe('calls test', () => {
    beforeEach(() => {
        cy.loginRequest('supervisor@supervisor.ru', 'admin')
    })

    it('show calls', () => {
        cy.visit(`${baseUrlForTest}calls`)
        cy.contains('h2', 'Все звонки')
    })

})
