import { Logger } from "../utils/logger";

class ArticlePage {

  // Page Elements
  elements = {

    newArticleBtn() {
      return cy.get('.pull-xs-right > :nth-child(2) > .nav-link')
    },
    articleTitleInput(){
      return cy.get('[name="title"]')
    },
    articleDescriptionInput(){
      return cy.get(':nth-child(2) > [name="description"]')
    },
    articleBodyInput(){
      return cy.get('[name="body"]')
    },
    articleTagInput(){
      return cy.get('[name="tags"]')
    },
    publishArticleBtn(){
      return cy.get('.btn')
    }

  }

  // Page Actions
  createNewArticle(){
    this.elements.newArticleBtn().click()
    Logger.info('Successfully clicked on New Article button')
    this.elements.articleTitleInput().should('be.visible')
  }

  enterTitle(title) {
    Logger.step('Entering title...')
    if(title) {
      this.elements.articleTitleInput().clear().type(title)
      Logger.info('Title successfully entered')
    } else {
      Logger.error('Error entering Title')
    }
  }

  enterDescription(description) {
    Logger.step('Entering description...')
    if(description) {
      this.elements.articleDescriptionInput().clear().type(description)
      Logger.info('Description successfully entered')
    } else {
      Logger.error('Error entering Description')
    }
  }

  enterBody(body) {
    Logger.step('Entering body...')
    if(body) {
      this.elements.articleBodyInput().clear().type(body)
      Logger.info('Body successfully entered')
    } else {
      Logger.error('Error entering body')
    }
  }

  enterTag(tag) {
    Logger.step('Entering tag...')
    if(tag) {
      this.elements.articleTagInput().clear().type(tag)
      Logger.info('Tag successfully entered')
    } else {
      Logger.error('Error entering tag')
    }
  }

  publishArticle(){
    this.elements.publishArticleBtn().click()
    Logger.info('Successfully clicked on publish article button')
  }

}

export default new ArticlePage();
