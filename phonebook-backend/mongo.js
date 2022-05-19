const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const {PASSWORD} = process.env
const name = process.argv[2]
const number = process.argv[3]
const url = `mongodb+srv://yuji:${PASSWORD}@cluster0.t2mhw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
const person = new Person({
  name,
  number,
})

person.save().then(result => {
  console.log(`Added ${name} number ${number} to phonebook`)

  Person.find({}).then(persons => {
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
})

