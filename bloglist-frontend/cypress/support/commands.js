// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('createUser', () => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username: 'yuji',
    name: 'mori',
    password: 'password'
  })
})

Cypress.Commands.add('login', () => {
  cy.get('#input-name').type('yuji')
  cy.get('#input-password').type('password')
  cy.get('#button-login').click()
})
