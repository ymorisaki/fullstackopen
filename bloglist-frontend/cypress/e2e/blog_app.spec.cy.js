describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'yuji',
      name: 'mori',
      password: 'password'
    })
  })

  it('test', function () {
    cy.contains('Blogs')
  })
})
