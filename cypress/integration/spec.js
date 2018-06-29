/// <reference types="cypress" />
describe('from root url', () => {

  beforeEach(() => {
    // actual url is "baseUrl" in "cypress.json"
    cy.visit('/')
  })

  it('works', () => {
    cy.visit('/')
    cy.contains('Test All The Things')
    // https://on.cypress.io/screenshot
    cy.screenshot('site', {capture: 'runner'})
  })

  it('has blog post about testing locally', () => {
    cy.contains('h3 a', 'Test locally').click()
    cy.url().should('contain', 'test-locally')
    // check if the image has loaded
    cy.get('img[alt="First test"]')
      .should('be.visible')
      .invoke('css', 'width')
      .then(parseInt)
      .should('gt', 100)
  })
})

describe('direct urls', () => {
  it('has Test on Netlify post', () => {
    cy.visit('/test-on-netlify/')
    cy.contains('h1', 'Test on Netlify')
  })
})
