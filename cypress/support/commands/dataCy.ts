export {}

Cypress.Commands.add('dataCy', (selector) => {
  return cy.get(`[data-cy=${selector}]`)
})
