import {baseUrlForTest} from '../../globals';


describe('roles test', () => {
    beforeEach(() => {
        cy.loginRequest('admin@admin.ru', 'yjdsqgfhjkmlkzflvbyf')
    })

    it('show roles', () => {
        cy.visit(`${baseUrlForTest}all_roles`)
        cy.contains('h2', 'Все роли')
    })

})
