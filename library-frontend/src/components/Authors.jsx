import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../query/query'

const Authors = (props) => {
  const allAuthors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (allAuthors.loading) {
    return (
      <>loding...</>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
