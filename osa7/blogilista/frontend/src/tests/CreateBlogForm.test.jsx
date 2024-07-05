import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from '../components/CreateBlogForm'
import { expect } from 'vitest'

test('form sends correct data', async () => {
  const tester = userEvent.setup()
  const handleBlogCreation = vi.fn()

  render(<CreateBlogForm handleBlogCreation={handleBlogCreation} />)

  const titleInput = screen.getByPlaceholderText('write the title')
  const authorInput = screen.getByPlaceholderText('write the author')
  const urlInput = screen.getByPlaceholderText('write the url')
  const sendButton = screen.getByText('Create')

  await userEvent.type(titleInput, 'TestInput')
  await userEvent.type(authorInput, 'TestAuthor')
  await userEvent.type(urlInput, 'TestUrl')
  await userEvent.click(sendButton)

  expect(handleBlogCreation.mock.calls).toHaveLength(1)
  expect(handleBlogCreation.mock.calls[0][0].title).toBe('TestInput')
  expect(handleBlogCreation.mock.calls[0][0].author).toBe('TestAuthor')
  expect(handleBlogCreation.mock.calls[0][0].url).toBe('TestUrl')
})
