describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('create user', function () {
    cy.createUser()
  })

  describe('login', function () {
    beforeEach(function () {
      cy.createUser()
    })

    it('success', function () {
      cy.login()
      cy.contains('yuji logged in')
    })

    it.only('a blog can be created', function () {
      cy.login()
      cy.get('#input-title').type('test-title')
      cy.get('#input-author').type('test-user')
      cy.get('#input-url').type('http://localhost')
      cy.get('#button-create').click()
    })

    it('invalid name', function () {
      cy.get('#input-name').type('yuj')
      cy.get('#input-password').type('password')
      cy.get('#button-login').click()
      cy.get('[class*=Message_error][class*=Message_message]')
        .should('have.css', 'color', 'rgb(193, 31, 31)')
        .should('have.css', 'border-color', 'rgb(193, 31, 31)')
      cy.contains('username or password invalid')
    })

    it('invalid password', function () {
      cy.get('#input-name').type('yuji')
      cy.get('#input-password').type('passwor')
      cy.get('#button-login').click()
      cy.get('[class*=Message_error][class*=Message_message]')
        .should('have.css', 'color', 'rgb(193, 31, 31)')
        .should('have.css', 'border-color', 'rgb(193, 31, 31)')
      cy.contains('username or password invalid')
    })
  })
})
