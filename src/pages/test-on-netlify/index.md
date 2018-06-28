---
title: Test on Netlify
date: "2015-05-06T23:46:37.121Z"
---

You can run local Gatsby server and run Cypress tests on Netlify!

Yup, it _just works_.

Here is an [example deployment](https://app.netlify.com/sites/gatsby-blog-0a5be4/deploys/5b34e7c167610c181364954f) of running the tests locally on Netlify. You can ignore the `D-Bus` warning

```text
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
```

Of course, Netlify is not a full CI, so it would be hard to see or download build artifacts like Cypress screenshots or video of the test run.
