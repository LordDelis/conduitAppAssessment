import 'cypress-mochawesome-reporter/register';
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Objects are not valid as a React child')) {
    return false;
  }
  return true;
});


before(function () {
  cy.log('This should execute before all test cases')
})

beforeEach(function () {
  cy.log('This should execute before each test case')
})

after(function () {
  cy.log('This should execute after all test cases')
})

afterEach(function () {
  cy.log('This should execute after each test case')
})


