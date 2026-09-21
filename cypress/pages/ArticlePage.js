import { Logger } from "../utils/logger";

class UserSignUpPage {

  // Page Elements
  elements = {

    signUpText() {
      return cy.get(':nth-child(3) > .nav-link')
    },
    nameInput(){
      return cy.get('[name="username"]')
    },
    emailInput(){
      return cy.get('[name="email"]')
    },
    passwordInput(){
      return cy.get('[name="password"]')
    },
    signUpButton(){
      return cy.get('.btn')
    },
    newArticleText(){
      return cy.get('.pull-xs-right > :nth-child(2) > .nav-link')
    },
    yourFeedText(){
      return cy.get('.feed-toggle > .nav > :nth-child(1) > .nav-link')
    }

  }

  // Page Actions
  visitRegistrationPage() {
    Logger.step('Opening registration page')
    cy.visit('/');
    this.elements.signUpText().should('be.visible').click()
  }

  enterName(name){
    Logger.step('Entering name...')
    if(name) {
      this.elements.nameInput().clear().type(name)
      Logger.info('Name successfully entered')
    } else {
      Logger.error('Error entering name')
    }
  }

  enterEmail(email) {
    Logger.step('Entering email...')
    if(email) {
      this.elements.emailInput().clear().type(email)
      Logger.info('Email successfully entered')
    } else {
      Logger.error('Error entering email')
    }
  }

  enterPassword(password) {
    Logger.step('Entering password...')
    if(password){
      this.elements.passwordInput().clear().type(password)
      Logger.info('Password successfully entered')
    } else {
      Logger.error('Error entering last password')
    }
  }

  signUp(){
    this.elements.signUpButton().click()
    Logger.info('Successfully clicked on signup button')
    this.elements.newArticleText().should('be.visible')
    this.elements.yourFeedText().should('be.visible')
    Logger.info('Account created successfully')
  }

}

export default new UserSignUpPage();
