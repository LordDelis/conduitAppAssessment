import RegistrationPage from '../pages/RegistrationPage';
import { registrationData } from '../utils/dataBuilder';
import { Logger } from '../utils/logger';

describe('User Sign Up Feature', () => {
  
  let inputData;

  beforeEach(() => {
    inputData = registrationData()
  });

  it('Should successfully fill new user registration form with valid dynamic data', () => {
    RegistrationPage.visitRegistrationPage()

    Logger.step('<<<----Filling User Details ---->>>');

    RegistrationPage.enterName(inputData.nameOfUser)
    RegistrationPage.enterEmail(inputData.emailAddress)
    RegistrationPage.enterPassword(inputData.userPassword)

    Logger.step('Submit User Details');
    RegistrationPage.signUp()

  });

});
