// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
import {baseUrlForTestToBackend} from '../../globals';

Cypress.Commands.add("login", (email, password) => {
    cy.visit('/')

    cy.get('input#md-input-email')
        .type(email)

    cy.get('input#md-input-password')
        .type(password)

    cy.contains('Войти')
        .click()

    cy.wait(5000)
})

Cypress.Commands.add("loginRequest", (email, password) => {
    cy.request({
        method: 'POST',
        url: `${baseUrlForTestToBackend}login`,
        body: {
           email: email,
           password: password,
        }
    }).then((response) => {
        let vuex = {
            user: {
                token: `Bearer ${response.body.token}`
            }
        }

        window.localStorage.setItem('vuex', JSON.stringify(vuex));
    })
})


//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
