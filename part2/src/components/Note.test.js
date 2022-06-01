import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import useEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const { container } = render(<Note note={note} />)
  const div = container.querySelector('.note')
  const element = screen.getByText('Component testing is done with react-testing-library')

  screen.debug(element)

  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
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
  const button = screen.getByText('importance')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
