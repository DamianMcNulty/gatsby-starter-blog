---
title: Test after deployment
date: "2015-05-01T22:12:03.284Z"
---

After the site is successfully deployed, Netlify can trigger other services. For example it can trigger a CircleCI build and pass the new url. CircleCI can run the same Cypress tests against that url to make sure the website is working as expected at the new address.
