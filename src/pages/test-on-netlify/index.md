---
title: Test on Netlify
date: "2015-05-06T23:46:37.121Z"
---

You can run local Gatsby server and run Cypress tests on Netlify!

Yup, it _just works_.

I have set `npm run deploy` as the deploy command on Netlify.

![Netlify deployment settings](/deploy-settings.png)

The only trick is _reinstall_ Cypress binary because while Netlify caches `node_modules` folder, it does not cache `~/.cache` folder where the binary is placed. Here is the script command

```
"predeploy": "CI=1 npm i cypress; npm test",
"deploy": "npm run build"
```

**tip** I am using `CI=1` environment variable to avoid terminal [progress bar issues](https://github.com/cypress-io/cypress/issues/1243)

Here is an [example deployment](https://app.netlify.com/sites/gatsby-blog-0a5be4/deploys/5b34e7c167610c181364954f) of running the tests locally on Netlify. You can ignore the `D-Bus` warning

```text
...
9:53:44 AM: Opening Cypress...
9:53:50 AM: ====================================================================================================
9:53:50 AM:   (Run Starting)
9:53:51 AM:   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
9:53:51 AM:   │ Cypress:    3.0.1                                                                              │
9:53:51 AM:   │ Browser:    Electron 59 (headless)                                                             │
9:53:51 AM:   │ Specs:      1 found (spec.js)                                                                  │
9:53:51 AM:   └────────────────────────────────────────────────────────────────────────────────────────────────┘
9:53:51 AM: ────────────────────────────────────────────────────────────────────────────────────────────────────
9:53:51 AM:   Running: spec.js...                                                                      (1 of 1)
9:53:51 AM: process 1836: D-Bus library appears to be incorrectly set up; ...
9:53:51 AM: See the manual page for dbus-uuidgen to correct this issue.
9:53:54 AM:
9:53:56 AM:   ✓ works (1638ms)
9:53:56 AM:   1 passing (2s)
9:53:56 AM:   (Results)
9:53:56 AM:   (Screenshots)
9:53:56 AM:   - /opt/build/repo/cypress/screenshots/site.png (1280x720)
9:53:56 AM:   (Video)
9:53:56 AM:   - Started processing:   Compressing to 32 CRF
9:53:58 AM:   - Finished processing:  /opt/build/repo/cypress/videos/spec.js.mp4 (1 second)
9:53:58 AM: ====================================================================================================
9:53:58 AM:   (Run Finished)
9:53:58 AM:       Spec                                                Tests  Passing  Failing  Pending  Skipped
9:53:58 AM:   ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
9:53:58 AM:   │ ✔ spec.js                                   00:01        1        1        -        -        - │
9:53:58 AM:   └────────────────────────────────────────────────────────────────────────────────────────────────┘
9:53:58 AM:     All specs passed!                           00:01        1        1        -        -        -
9:53:58 AM:
9:53:58 AM: > gatsby-starter-blog@1.0.0 deploy /opt/build/repo
9:53:58 AM: > npm run build
9:53:58 AM: > gatsby-starter-blog@1.0.0 build /opt/build/repo
9:53:58 AM: > gatsby build
...
```

Of course, Netlify is not a full CI, so it would be hard to see or download build artifacts like Cypress screenshots or video of the test run, or even [configure Cypress binary caching](https://docs.cypress.io/guides/guides/continuous-integration.html#Caching-the-Cypress-Binary). But it works ;)
