describe('Note app', function() {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form can be open', function () {
    cy.get('#username').type('yuji')
    cy.get('#password').type('password')
    cy.get('#login-button').click()

    cy.contains('yuji was loggedin')
  })
})
