const resetDatabase = async (request) => {
  await request.post('/api/testing/reset')
}

const createUser = async (request, name, username, password) => {
  await request.post('/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }
  })
}

const sendBlogPostReq = async (request, token, title, likes) => {
  await request.post('/api/blogs', {
    data: {
      title: title,
      author: 'author',
      url: 'url',
      likes: likes
    },
    headers: {
      authorization: `Bearer ${token}`
    }
  })
}

const populateDatabase = async (request) => {
  const response = await request.post('/api/login', {
    data: {
      username: 'nameuser',
      password: 'wordpass'
    }
  })
  const data = await response.json()
  const token = data.token
  await sendBlogPostReq(request, token, 'least likes', 1)
  await sendBlogPostReq(request, token, 'most likes', 5)
  await sendBlogPostReq(request, token, 'middle', 3)
}

const loginWith = async (page, username, password) => {
  await page.locator('input[type="text"]').fill(username)
  await page.locator('input[type="password"]').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'New blog' }).click()
  await page.getByPlaceholder('write the title').fill(title)
  await page.getByPlaceholder('write the author').fill(author)
  await page.getByPlaceholder('write the url').fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}

export { resetDatabase, createUser, populateDatabase, loginWith, createBlog }