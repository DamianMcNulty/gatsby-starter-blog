/// <reference types="cypress" />
beforeEach(() => {
  cy.visit('/')
})
it('works', () => {
  cy.contains('Combination of Gatsby to Netlify and tested using Cypress.io is pretty cool.')
  // https://on.cypress.io/screenshot
  cy.screenshot('site', {capture: 'runner'})
})
