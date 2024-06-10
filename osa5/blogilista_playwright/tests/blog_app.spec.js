const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'human',
        username: 'nameuser',
        password: 'wordpass'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const headerLocator = page.getByText('Log in to application')
    const usernameLocator = page.locator('input[type="text"]')
    const passwordLocator = page.locator('input[type="password"]')
    await expect(headerLocator).toBeVisible()
    await expect(usernameLocator).toBeVisible()
    await expect(passwordLocator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.locator('input[type="text"]').fill('nameuser')
      await page.locator('input[type="password"]').fill('wordpass')
      await page.getByRole('button', { name: 'Login' }).click()
      const locator = page.getByText('human logged in')
      await expect(locator).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.locator('input[type="text"]').fill('pekka')
      await page.locator('input[type="password"]').fill('pekkanen')
      await page.getByRole('button', { name: 'Login' }).click()
      // const errorNotification = page.locator('.error')
      // await expect(errorNotification).toContainText('Wrong username or password')
      // await expect(errorNotification).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('pekka logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'nameuser', 'wordpass')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'cool title', 'cool author', 'cool url')
      // const successNotification = page.locator('.success')
      // await expect(successNotification).toContainText('A new blog cool title by cool author was created')
      // await expect(successNotification).toHaveCSS('color', 'rgb(0, 128, 0)')
      await expect(page.getByText('A new blog cool title by cool author was created')).toBeVisible()
      await expect(page.getByText('cool title cool author')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'cool title', 'cool author', 'cool url')
      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByText('Likes 0')).toBeVisible()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('Likes 1')).toBeVisible()
    })

    test('a blog can be deleted by its creator', async ({ page }) => {
      await createBlog(page, 'cool title', 'cool author', 'cool url')
      await page.getByRole('button', { name: 'View' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'Remove' }).click();
      await expect(page.getByText('Blog cool title by cool author was succesfully removed')).toBeVisible()
      await expect(page.getByText('cool title cool author')).not.toBeVisible()
    })

    test('the delete button is visible only to blog\'s creator', async ({ page, request }) => {
      await createBlog(page, 'cool title', 'cool author', 'cool url')
      await page.getByRole('button', { name: 'Logout' }).click()

      await request.post('/api/users', {
        data: {
          name: 'pekka',
          username: 'pekka',
          password: 'salasana'
        }
      })
      await loginWith(page, 'pekka', 'salasana')
      await page.getByRole('button', { name: 'View' }).click()
      await expect(page.getByRole('button', { name: 'Remove' })).not.toBeVisible()
    })
  })
})