describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('create user', function () {
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'yuji',
      name: 'mori',
      password: 'password'
    })
  })

  describe('login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'yuji',
        name: 'mori',
        password: 'password'
      })
    })

    it('success', function () {
      cy.get('#input-name').type('yuji')
      cy.get('#input-password').type('password')
      cy.get('#button-login').click()
      cy.contains('yuji logged in')
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

  it('test', function () {
    cy.contains('Blogs')
  })
})
