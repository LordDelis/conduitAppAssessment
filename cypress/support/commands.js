/// <reference types="cypress" />

// Custom commands can be added here
Cypress.Commands.add('userLogin', (email, password) => {
    cy.visit('/')
    cy.get(':nth-child(2) > .nav-link').click()
    cy.get('[name="email"]').clear().type(email)
    cy.get('[name="password"]').clear().type(password)
    cy.get('.btn').click()
})