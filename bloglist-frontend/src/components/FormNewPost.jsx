import React, {useState} from 'react'

const FormNewPost = ({user}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      !title ||
      !author ||
      !url
    ) {
      return
    }

    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
    {user.username &&
    <form onSubmit={handleSubmit}>
      <label>title <input type="text" value={title} onChange={({target}) => setTitle(target.value)} /></label>
      <br />
      <label>author <input type="text" value={author} onChange={({target}) => setAuthor(target.value)} /></label>
      <br />
      <label>url <input type="text" value={url} onChange={({target}) => setUrl(target.value)} /></label>
      <br />
      <button type="submit">Create</button>
    </form>
    }
    </>
  )
}

export default FormNewPost