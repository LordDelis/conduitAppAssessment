import ArticlePage from '../pages/ArticlePage';
import users from '../fixtures/users.json';
import { generateArticleData } from '../utils/dataBuilder';
import { Logger } from '../utils/logger';

describe('Create Article Feature', () => {
  
  let inputData;

  beforeEach(() => {
    inputData = generateArticleData()
    cy.userLogin(users.validUser.email, users.validUser.password)
  });

  it('Should successfully create article', () => {
    ArticlePage.createNewArticle()
    ArticlePage.enterTitle(inputData.articleTitle)
    ArticlePage.enterDescription(inputData.articleDescription)
    ArticlePage.enterBody(inputData.articleBody)
    ArticlePage.enterTag(inputData.articleTag)
    ArticlePage.publishArticle()
    Logger.step('Article created successfully');

  });

});
