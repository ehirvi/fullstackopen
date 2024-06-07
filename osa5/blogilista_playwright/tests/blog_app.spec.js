const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'human',
        username: 'nameuser',
        password: 'wordpass'
      }
    })
    await page.goto('http://localhost:5173')
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
      const errorNotification = page.locator('.error')
      await expect(errorNotification).toContainText('Wrong username or password')
      await expect(errorNotification).toHaveCSS('border-style', 'solid')
      await expect(errorNotification).toHaveCSS('color', 'rgb(255, 0, 0)')
      await expect(page.getByText('pekka logged in')).not.toBeVisible()
    })
  })
})