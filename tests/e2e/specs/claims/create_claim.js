import {baseUrlForTest} from '../../../globals';


describe('create claim', () => {
    beforeEach(() => {
        cy.login('dispatcher@dispatcher.ru', 'admin')
    })

    it('create simple claim by dispatcher based on call', () => {
        cy.get('i[class="fas fa-pencil-alt"]').first().click()

        cy.get('label').contains('Заявка').click()

        cy.contains('Продолжить').click()


    })

})
