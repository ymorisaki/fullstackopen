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

Cypress.Commands.add('createUser2', () => {
  cy.request('POST', 'http://localhost:3003/api/users', {
    username: 'test',
    name: 'mori',
    password: 'password'
  })
})

Cypress.Commands.add('login', () => {
  cy.get('#input-name').type('yuji')
  cy.get('#input-password').type('password')
  cy.get('#button-login').click()
})

Cypress.Commands.add('login2', () => {
  cy.get('#input-name').type('test')
  cy.get('#input-password').type('password')
  cy.get('#button-login').click()
})

Cypress.Commands.add('blogPost', () => {
  cy.get('#input-title').type('test-title')
  cy.get('#input-author').type('test-user')
  cy.get('#input-url').type('http://localhost')
  cy.get('#button-create').click()
})
