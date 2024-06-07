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
  // await page.getByText('cool title cool authorView').click()
  // await page.getByRole('button', { name: 'View' }).click()
  // await page.getByText('Likes 0Like').click();
  // await page.getByRole('button', { name: 'Like' }).click();
  // await page.getByText('Likes 1Like').click();
  // page.once('dialog', dialog => {
  //   console.log(`Dialog message: ${dialog.message()}`);
  //   dialog.dismiss().catch(() => {});
  // });
  // await page.getByRole('button', { name: 'Remove' }).click();
  // page.once('dialog', dialog => {
  //   console.log(`Dialog message: ${dialog.message()}`);
  //   dialog.dismiss().catch(() => {});
  // });
  // await page.getByRole('button', { name: 'Remove' }).click();
  // page.once('dialog', dialog => {
  //   console.log(`Dialog message: ${dialog.message()}`);
  //   dialog.dismiss().catch(() => {});
  // });
  // await page.getByRole('button', { name: 'Remove' }).click();
  // await page.getByText('Blog cool title by cool').click();
}

export { loginWith, createBlog }