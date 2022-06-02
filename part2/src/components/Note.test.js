import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
import Note from './Note'

test('render content', () => {
  const note = {
    content: 'this is my wife',
    important: true,
  }

  render(<Note note={note}/>)
  const element = screen.getByText('this is my wife')

  expect(element).toBeDefined()
})
test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const { container } = render(<Note note={note} />)
  const div = container.querySelector('.note')
  const element = screen.getByText('Component testing is done with react-testing-library')
  const user = useEvent.setup()
  const button = screen.getByText('is importance')

  await user.click(button)
  screen.debug(element)

  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(button).toHaveTextContent('is importance')
})

test('クリックイベント', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportant={mockHandler} />
  )

  const user = useEvent.setup()
  const button = screen.getByText('is importance')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
