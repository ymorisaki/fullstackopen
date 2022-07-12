import React, {useState, useEffect} from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../query/query'

const EditAuthor = ({setError}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      {
        query: ALL_AUTHORS
      }
    ]
  })

  const submit = event => {
    event.preventDefault()

    if (!name || !born) {
      return
    }

    editAuthor({
      variables: {name, born: Number(born)}
    })

    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('Person not found')
    }
  }, [result.data])

  return (
    <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <select onChange={({target}) => setName(target.value)}>
              <option value=""></option>
              {authors.data.allAuthors.map(author => (
                <option
                  key={author.id}
                  value={author.name}
                >
                  {author.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              type="text"
              value={born}
              onChange={({target}) => setBorn(target.value)}
            />
          </label>
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default EditAuthor