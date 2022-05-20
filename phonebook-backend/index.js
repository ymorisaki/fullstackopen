const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./model/person');
const { response } = require('express');
const app = express()
const PORT = process.env.PORT || 3001

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path  :', request.path)
  console.log('Body  :', request.body)
  console.log('---')
  next()
}
const unknownEndPoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(express.json())
app.use(morgan(''))
app.use(cors())
app.use(express.static('build'))
app.use(requestLogger)

app.post('/api/persons', (request, response) => {
  const {body} = request
  const person = new Person({
    name: body.name,
    number: body.number,
  })

  if (
    !person.name ||
    !person.number
  ) {
    return response.status(400).json({
      error: '名前もしくは電話番号は必須です'
    })
  }

  // if (
  //   persons.some(person => person.name === person.name)
  // ) {
  //   return response.status(400).json({
  //     error: '同名のユーザーが既に登録されています'
  //   })
  // }

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/info', (request, response) => {
  Person.find({}).then(result => {
    response.send(`
      <p>Phonebook has info for ${result.length} people</p><br>
      ${new Date()}
    `)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.use(unknownEndPoint)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
