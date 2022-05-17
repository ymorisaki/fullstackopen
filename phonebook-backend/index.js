const express = require('express');
const morgan = require('morgan');
const app = express()
const PORT = 3001

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

let persons = [
  {
    id: '1',
    name: 'yuji',
    number: '03-3333-3333'
  },
  {
    id: '2',
    name: 'morisaki',
    number: '03-3333-3333'
  },
  {
    id: '3',
    name: 'inaba',
    number: '03-3333-3333'
  },
  {
    id: '4',
    name: 'miyuki',
    number: '03-3333-3333'
  },
]

app.use(express.json())
app.use(morgan(''))
app.use(requestLogger)

app.post('/api/persons', (request, response) => {
  const {body} = request
  const newPerson = {
    name: body.name,
    number: body.number,
    id: Math.random().toString().slice(2)
  }

  if (
    !newPerson.name ||
    !newPerson.number
  ) {
    return response.status(400).json({
      error: '名前もしくは電話番号は必須です'
    })
  }

  if (
    persons.some(person => person.name === newPerson.name)
  ) {
    return response.status(400).json({
      error: '同名のユーザーが既に登録されています'
    })
  }

  persons.push(newPerson)
  response.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id

  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

app.get('/', (request, response) => {
  response.send('Hello World')
})

app.get('/info', (request, response) => {
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p><br>
    ${new Date()}
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const filterPerson = persons.filter(person => person.id === request.params.id)
  if (filterPerson.length) {
    response.json(filterPerson)
  } else {
    response.status(404).end()
  }
})

app.use(unknownEndPoint)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})
