import { Logger } from "../utils/logger";

class MerchantSignUpPage {
  // UI Elements
  elements = {

    createAccountText() {
      return cy.get('.fw-sbold')
    },
    selectNewUser(){
      return cy.get('.mt-4 > :nth-child(2)')
    },
    selectExistingUser(){
      return cy.get('.mt-4 > :nth-child(1)')
    },
    backToLoginText(){
      return cy.get('.fz-14')
    },
    continueButton(){
      return cy.get('.text-white')
    },
    businessNameInput(){
      return cy.get('.overflow-y-scroll > :nth-child(2) > .group-input > .form-control')
    },
    firstNameInput(){
      return cy.get(':nth-child(1) > .group-input > .form-control')
    },
    lastNameInput(){
      return cy.get('.ps-2 > .group-input > .form-control')
    },
    businessEmailAddressInput(){
      return cy.get(':nth-child(4) > .group-input > .form-control')
    },
    nationalityDropdown(){
      return cy.get('#mat-select-value-1')
    },
    selectNationality(){
      return cy.get('.mdc-list-item__primary-text')
    },
    genderDropdown(){
      return cy.get('#mat-select-value-3')
    },
    maleGenderOption(){
      return cy.get('#mat-option-0')
    },
    femaleGenderOption(){
      return cy.get('#mat-option-1')
    },
    phoneNumberInput(){
      return cy.get('#mat-input-0')
    },
    passwordInput(){
      return cy.get(':nth-child(8) > .group-input > .form-control')
    },
    termsAndConditionCheckbox(){
      return cy.get('.mat-mdc-checkbox-touch-target')
    },
    createAccountButton(){
      return cy.get('.btn > span')
    }

  }

  // Page Actions
  visitRegistrationPage() {
    Logger.step('Opening registration page')
    cy.visit('/');
    this.elements.createAccountText().should('be.visible').click()
    this.elements.selectNewUser().should('be.visible')
    this.elements.selectExistingUser().should('be.visible')
    this.elements.backToLoginText().should('be.visible')
    cy.url().should('include', '/onboard/choose-account')
  }

  selectNewUserRegistration(){
    Logger.step('New user registration selected')
    this.elements.selectNewUser().click()
    this.elements.continueButton().click()
  }

  fillBusinessName(businessName){
    Logger.step('Entering business name...')
    if(businessName) {
      this.elements.businessNameInput().clear().type(businessName)
      Logger.info('Business name successfully entered')
    } else {
      Logger.error('Error entering business name')
    }
  }

  fillFirstName(firstName) {
    Logger.step('Entering first name...')
    if(firstName) {
      this.elements.firstNameInput().clear().type(firstName)
      Logger.info('First name successfully entered')
    } else {
      Logger.error('Error entering first name')
    }
  }

  fillLastName(lastName) {
    Logger.step('Entering last name...')
    if(lastName){
      this.elements.lastNameInput().clear().type(lastName)
      Logger.info('Last name successfully entered')
    } else {
      Logger.error('Error entering last name')
    }
  }

  fillBusinessEmailAddress(email){
    Logger.step('Entering business email address...')
    if(email){
      this.elements.businessEmailAddressInput().clear().type(email)
      Logger.info('Email address successfully entered')
    } else {
      Logger.error('Error entering business email address')
    }
  }

  fillNationality(){
    Logger.step('Selecting nationality from the drop-down list...')
    this.elements.nationalityDropdown().click()
    this.elements.selectNationality()
        .should('be.visible')
        .and('not.be.disabled')
        .and('contain.text', 'Nigeria')
        .click()
    Logger.info('Nationality selected successfully')
  }

  selectGender(gender) {
    Logger.step('Selecting gender...')
    if (!gender){
      Logger.error("Gender cannot be selected")
    } else {
      Logger.step('Clicking on gender drop-down...')
      this.elements.genderDropdown().click()
      if (gender === 'MALE') {
        this.elements.maleGenderOption().click()
        Logger.info(`Successfully selected ${gender} gender`)
      } else if (gender === 'FEMALE') {
        this.elements.femaleGenderOption().click()
        Logger.info(`Successfully selected ${gender} gender`)
      }
    }
  }

  enterPhoneNumber(phoneNumber){
    Logger.step('Selecting Phone number..')
    if(phoneNumber){
      this.elements.phoneNumberInput().clear().type(phoneNumber)
      Logger.info('Phone number entered successfully')
    } else {
      Logger.error('Phone number cannot be entered')
    }
  }

  fillPassword(password) {
    Logger.step('Entering password...')
    if(password){
      this.elements.passwordInput().clear().type(password)
      Logger.info('Phone number entered successfully')
    } else {
      Logger.error('Error entering phone number')
    }
  }

  agreeToTermsAndCondition(){
    Logger.step('Agreeing to terms and condition')
    this.elements.termsAndConditionCheckbox().click()
    Logger.info('Successfully agreed to terms and condition')
  }

  createAccount(){
    this.elements.createAccountButton().click()
    Logger.info('Successfully clicked on create account button')
  }

}

export default new MerchantSignUpPage();
