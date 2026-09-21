import MerchantSignUpPage from '../pages/MerchantSignUpPage';
import { generateRegistrationData } from '../utils/dataBuilder';
import { Logger } from '../utils/logger';

describe('Merchant Sign Up Feature', () => {
  
  let registrationData;

  beforeEach(() => {
    // Generate fresh data for every test iteration to ensure unique payloads
    registrationData = generateRegistrationData()
  });

  it('Should successfully fill new merchant registration form with valid dynamic data', () => {
    MerchantSignUpPage.visitRegistrationPage()
    MerchantSignUpPage.selectNewUserRegistration()

    Logger.step('<<<----Filling Merchant Details ---->>>');
    MerchantSignUpPage.fillBusinessName(registrationData.businessName)
    MerchantSignUpPage.fillFirstName(registrationData.merchantFirstName)
    MerchantSignUpPage.fillLastName(registrationData.merchantLastName)
    MerchantSignUpPage.fillBusinessEmailAddress(registrationData.businessEmailAddress)
    MerchantSignUpPage.fillNationality()
    MerchantSignUpPage.selectGender(registrationData.merchantGender)
    MerchantSignUpPage.enterPhoneNumber(registrationData.merchantPhoneNumber)
    MerchantSignUpPage.fillPassword(registrationData.merchantPassword)
    MerchantSignUpPage.agreeToTermsAndCondition()

    Logger.step('Submit Merchant Details');
    MerchantSignUpPage.createAccount()

  });

});
