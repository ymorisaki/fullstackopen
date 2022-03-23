const express= require('express')
const app = express()
const PORT = 3001

app.use(express.json())

let phoneBook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.end('Hello')
})

app.get('/api/persons', (request, response) => {
  response.json(phoneBook)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = phoneBook.filter(person => person.id === id)
  if (person.length === 0) {
    return response.status(404).end()
  }

  response.json(person)
})

app.get('/info', (request, response) => {
  response.end(`<p>PhoneBook has info for ${phoneBook.length + 1} people<br>${new Date()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phoneBook = phoneBook.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  console.log(request.body)
  const {body} = request
  const person = {
    id: Math.random().toString().substring(2),
    number: body.number,
    name: body.name
  }

  if (!person.number || !person.name) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  if (phoneBook.some(book => book.name === person.name)) {
    return response.status(400).json({
      error: '同名の人物が登録済みです'
    })
  }

  console.log(phoneBook)
  phoneBook = phoneBook.concat(person)
  response.json(person)
})

app.listen(PORT)

console.log(`http://localhost:${PORT}`)