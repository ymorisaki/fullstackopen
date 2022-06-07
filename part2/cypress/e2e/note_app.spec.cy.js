describe('Note app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      username: 'yuji',
      name: 'mori',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)
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

  it('login fails with wrong password', function () {
    cy.get('#username').type('yuji')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
    cy.get('html').should('not.contain', 'yuji was loggedin')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'yuji', password: 'password' })
    })

    it('a new note can be created', function () {
      cy.get('#note-input').type('a new created by cypress')
      cy.get('#note-save').click()
      cy.contains('a new created by cypress')
    })

    describe('and several notes exist', function () {
      beforeEach(function () {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('one of those can be made important', function () {
        cy.contains('second note').parent().find('button').click()
        cy.contains('second note').parent().find('button').should('contain', 'is importance')
      })
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false,
        })
      })

      it('it can be made important', function () {
        cy.contains('another note cypress').parent().find('button').click()
        cy.contains('another note cypress').parent().find('button').should('contain', 'is importance')
      })
    })
  })
})
