---
title: Test locally
date: "2015-05-28T22:40:32.169Z"
---

You can run Cypress tests while writing your Gatsby blog. Just install Cypress as a dev dependency and start testing! Assuming Gatsby is installed:

- `npm install -D cypress`
- `npm run develop` to start local blog instance
- `npx cypress open` to start Cypress application

Instead of hard coding the blog post url, drop it into `cypress.json` file

```json
{
  "baseUrl": "http://localhost:8000"
}
```

Drop some tests into the `cypress/integration/spec.js` file and click on it. Here is an example test that opens the site, checks the title and takes a screenshot.

```js
it('works', () => {
  // actual url is "baseUrl" in "cypress.json"
  cy.visit('/')
  cy.contains('Test All The Things')
  // https://on.cypress.io/screenshot
  cy.screenshot('site', {capture: 'runner'})
})
```

To start Gatsby, wait for it to start serving locally and run Cypress tests there is a little utility [start-server-and-test](https://github.com/bahmutov/start-server-and-test). Here are the script commands in the `package.json` to test the blog before deploying.

```json
{
  "scripts": {
    "test": "start-test develop 8000 cy:run",
    "develop": "gatsby develop",
    "build": "gatsby build",
    "predeploy": "CI=1 npm i cypress; npm test",
    "deploy": "npm run build",
    "cy:run": "cypress run",
    "cy:open": "cypress open"
  }
}
```

So when I run `npm test` it starts the server, runs Cypress tests and closes the server.

**Tip** if the terminal stops echoing back keys as you type after running these tests, run shell command `reset` to get it back.
