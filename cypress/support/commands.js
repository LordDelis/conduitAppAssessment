/// <reference types="cypress" />

// Custom commands can be added here
Cypress.Commands.add('validLogin', (email, password) => {
    cy.visit('/login')
    cy.get('.mb-3 > .group-input > .form-control').clear().type(email)
    cy.get('.mb-2 > .group-input > .form-control').clear().type(password)
    cy.get('.btn').click()
})
