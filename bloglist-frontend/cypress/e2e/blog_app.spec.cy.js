describe('Blog app', function () {
  it('frontend page can be opend', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('username')
  })

  it('login', function () {
    cy.visit('http://localhost:3000')
    cy.get('#input-name').type('yuji')
    cy.get('#input-password').type('password')
    cy.get('#button-login').click()
    cy.contains('yuji logged in')
  })
})
