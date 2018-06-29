---
title: Test after deployment
date: "2015-05-01T22:12:03.284Z"
---

After the site is successfully deployed, Netlify can trigger other services. For example it can trigger a CircleCI build and pass the new url. CircleCI can run the same Cypress tests against that url to make sure the website is working as expected at the new address.

So we have tested our Gatsby blog in _develop_ mode. Then we have built production site and deployed to Netlify CDN. The deployed site gets both a unique url and (unless locked) a public "vanity" url. For example [this deploy](https://app.netlify.com/sites/gatsby-blog-0a5be4/deploys/5b34ea7967610c1dfb6495c7) got unique url [https://5b34ea7967610c1dfb6495c7--gatsby-blog-0a5be4.netlify.com](https://5b34ea7967610c1dfb6495c7--gatsby-blog-0a5be4.netlify.com) and public url [https://master--gatsby-blog-0a5be4.netlify.com](https://master--gatsby-blog-0a5be4.netlify.com). Are these urls working? Or is there a configuration error where some content is not working? We need to test the _deployed_ website too!

Netlify cannot execute post-deploy jobs to run Cypress tests against the new url. But it can trigger arbitrary web hooks. I have configured a [CircleCI project](https://circleci.com/gh/bahmutov/gatsby-starter-blog) and created a personal API token. Then I set the token as an environment variable in Netlify deploy build environments tab (be careful about giving access to the deployment settings to anyone else, Netlify does not hide the variables in the settings!) and have configured a shell command to call CircleCI from Netlify. The command is pretty hairy if you want to pass pull requests correctly, see [trigger-circle.sh](https://github.com/bahmutov/gatsby-starter-blog/blob/master/trigger-circle.sh) for the full glory.

Here is just the relevant portion

```text
curl -u ${CIRCLE_API_USER_TOKEN}: \
  -d build_parameters[CYPRESS_baseUrl]=$DEPLOY_URL \
  https://circleci.com/api/v1.1/project/github/bahmutov/gatsby-starter-blog/tree/$BRANCH
```

We pass the fresh unique url like `https://5b34ea7967610c1dfb6495c7--gatsby-blog-0a5be4.netlify.com` given to use by Netlify via an environment variable as a build parameter `CYPRESS_baseUrl`. CircleCI runs a build job and the environment variable takes precedence over `baseUrl: localhost:8000` default url from `cypress.json`. See [circle configuration file](https://github.com/bahmutov/gatsby-starter-blog/blob/master/.circleci/config.yml). The only interesting part is that we want to run Circle against local server too on GitHub commit, thus the actual test command has two branches

```text
- run:
  name: Run server and E2E tests locally or against external URL
  command: |
    if [[ -v CYPRESS_baseUrl ]]; then
      echo Testing external url $CYPRESS_baseUrl
      npm run cy:run
    else
      echo Running local server and testing it
      npm test
    fi
```

Since Circle is configured to run on each GitHub push, the additional build triggered by the Netlify hook means we test the website locally and remote deployment on Circle.

![Circle two tests](/circle.png)

CirlceCI is full featured CI provider, thus we can store artifacts, do any kind of caching, etc. See a sample run triggered by the Netlify deploy [here](https://circleci.com/gh/bahmutov/gatsby-starter-blog/42#build-parameters/containers/0). The entire run, including installing (cached) dependencies and tests took 46 seconds. So it was very fast!

I do not see double testing as a problem. In fact, I would test a few more times!

- test `develop` version of the site
- build the site, start a static server (still on CI) and run tests against it
- deploy the site to unique url and run tests against it
- Netlify updates vanity url to the new deploy, we could trigger another CI pass against it

Happy testing from our team at [Cypress](https://cypress.io)

