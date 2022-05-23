const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./model/person');
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
const errorHandler = (error, request, response, next) => {
  console.log(error.message, error.name)

  if (error.name === 'CastError') {
    response.status(400).send({
      error: 'malformated id'
    })
  }
  if (error.name === 'ValidationError') {
    response.status(400).send({
      error: 'validation error'
    })
  }

  next(error)
}

app.use(express.json())
// app.use(morgan(''))
app.use(cors())
app.use(express.static('build'))
app.use(requestLogger)

app.post('/api/persons', (request, response, next) => {
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

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const person = {
    number: request.body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: 'query'})
    .then(updatedPerson => {
      response.json(updatedPerson)
    }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(result => {
    response.status(204).end()
  }).catch(error => next(error))
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

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  }).catch(error => next(error))
})

app.use(unknownEndPoint)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
