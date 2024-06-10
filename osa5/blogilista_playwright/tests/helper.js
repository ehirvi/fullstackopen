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

export { loginWith, createBlog }