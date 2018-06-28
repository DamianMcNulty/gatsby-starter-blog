/// <reference types="cypress" />
it('works', () => {
  // actual url is "baseUrl" in "cypress.json"
  cy.visit('/')
  cy.contains('Test All The Things')
  // https://on.cypress.io/screenshot
  cy.screenshot('site', {capture: 'runner'})
})
