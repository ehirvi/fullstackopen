import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect } from 'vitest'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 3,
  }

  // const user = {
  //   username: 'username',
  //   name: 'name'
  // }

  // const mockFunc1 = vi.fn()
  // const mockFunc2 = vi.fn()

  render(<Blog blog={blog} />) // handleAddingLike={mockFunc1} handleBlogDeletion={mockFunc2} user={user} />)
  const element = screen.getByText('TestTitle TestAuthor')
  expect(element).toBeDefined()
})

test('renders all content when button is pressed', async () => {
  const user = {
    username: 'TestUsername',
    name: 'TestName',
  }
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 3,
    user: user,
  }

  render(<Blog blog={blog} user={user} />)
  const tester = userEvent.setup()
  const button = screen.getByText('View')
  await tester.click(button)

  const url = screen.getByText('TestUrl')
  const likes = screen.getByText('Likes 3')
  const name = screen.getByText('TestName')
})

test('like button can be pressed twice', async () => {
  const user = {
    username: 'TestUsername',
    name: 'TestName',
  }
  const blog = {
    title: 'TestTitle',
    author: 'TestAuthor',
    url: 'TestUrl',
    likes: 3,
    user: user,
  }

  const mockEventHandler = vi.fn()

  render(<Blog blog={blog} user={user} handleAddingLike={mockEventHandler} />)
  const tester = userEvent.setup()
  const viewButton = screen.getByText('View')
  await tester.click(viewButton)
  const likeButton = screen.getByText('Like')
  await tester.click(likeButton)
  await tester.click(likeButton)
  // screen.debug()

  expect(mockEventHandler.mock.calls).toHaveLength(2)
})
