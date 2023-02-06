import { test, expect } from "@playwright/test";

test("Handle invalid urls", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const urlField = page.getByLabel("URL");
  const errorMessage = page.getByText("Invalid URL");
  const saveButton = page.getByRole("button", { name: "Save" });

  // make sure we can't add bad urls
  await urlField.fill("I'm not a valid url");
  await urlField.blur();
  await expect(errorMessage).toBeVisible();
  await expect(saveButton).toBeDisabled();
});

test("Full flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const nameField = page.getByLabel("Name");
  const uriField = page.getByLabel("URL");
  const errorMessage = page.getByText("Invalid URL");
  const saveButton = page.getByRole("button", { name: "Save" });
  const deleteButton = page.getByRole("button", { name: "Delete Link" });

  // fill with valid values
  await nameField.fill("Bob's Site");
  await uriField.fill("https://bob.obringer.net");

  // make sure we're displaying everything as valid
  await uriField.blur();
  await expect(errorMessage).not.toBeVisible();
  await expect(saveButton).not.toBeDisabled();

  // And add it
  await saveButton.click();

  // make sure we've routed to the address to edit the new item
  await expect(page).toHaveURL(
    /^http:\/\/[a-zA-Z0-9-]+:[0-9]+\/link\/[a-z0-9]{8}$/
  );

  const shortLink = (await page.url()).split("/").pop();
  // const date = new Date().toISOString().substring(0, 10);
  // const newLinkSelectorString = `${shortLink} • ${date} 0 Bob's Site`;

  // this also tests accessibility (we should describe each bit better it better, but...)
  const newRecord = page.getByTestId(`link-${shortLink}`);
  await expect(newRecord).toBeVisible();
  await expect(newRecord).toHaveAttribute("aria-current", "true");

  // get another link
  const anotherLink = page.getByTestId("link-igkb6r9t");
  await anotherLink.click();

  // make sure we navigated and the form is updated
  await expect(page).toHaveURL("http://localhost:3000/link/igkb6r9t");
  await expect(nameField).toHaveValue("");
  await expect(uriField).toHaveValue(
    "https://www.youtube.com/watch?v=hYWJrZ4G6o8"
  );

  // edit it
  await nameField.fill("Test Name");
  await saveButton.click();
  const updatedLink = page.getByTestId("link-igkb6r9t");
  await expect(updatedLink).toHaveAttribute("aria-current", "true");

  // delete it
  await deleteButton.click();
  await expect(page).toHaveURL("http://localhost:3000/");
  await expect(updatedLink).not.toBeVisible();

  // helpful for using playwright tools to get most appropriate selector
  // await page.pause();
});

test("Sorting and Filtering", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  const dateSort = page.getByRole("button", { name: "Sort By Date" });
  const countSort = page.getByRole("button", { name: "Sort By Count" });
  const list = page.getByRole("list", { name: "Link List" });

  await expect(list.first()).toHaveText(/igkb6r9t/);
  await dateSort.click();
  await expect(list.first()).toHaveText(/f2u9mqhb/);
  await dateSort.click();
  await expect(list.first()).toHaveText(/igkb6r9t/);

  await countSort.click();
  await expect(list.first()).toHaveText(/qa40lal9/);
  await countSort.click();
  await expect(list.first()).toHaveText(/3dxusvfh/);
  await countSort.click();
  await expect(list.first()).toHaveText(/qa40lal9/);

  await dateSort.click();
  await expect(list.first()).toHaveText(/igkb6r9t/);
});
