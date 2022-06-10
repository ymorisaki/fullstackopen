import React, { useState } from 'react'
import blogService from '../services/blogs'

const FormNewPost = ({ user, blogs, setBlogs, setMessage }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !title ||
      !author ||
      !url
    ) {
      return
    }

    const data = await blogService.post({
      title,
      author,
      url
    })

    setBlogs(blogs.concat([data]))
    setMessage({
      message: `a new blog ${title}`,
      error: false,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    setTimeout(() => {
      setMessage({
        message: '',
        error: false,
      })
    }, 4000)
  }
  return (
    <>
      {user.username &&
    <form onSubmit={handleSubmit}>
      <label>title <input id="input-title" type="text" value={title} onChange={({ target }) => setTitle(target.value)} /></label>
      <br />
      <label>author <input id="input-author" type="text" value={author} onChange={({ target }) => setAuthor(target.value)} /></label>
      <br />
      <label>url <input id="input-url" type="text" value={url} onChange={({ target }) => setUrl(target.value)} /></label>
      <br />
      <button id="button-create" type="submit">Create</button>
    </form>
      }
    </>
  )
}

export default FormNewPost