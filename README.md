# QA Automation Showcase

[![Playwright Tests](https://github.com/Anand-Priya/qa-automation-showcase/actions/workflows/tests.yml/badge.svg)](https://github.com/Anand-Priya/qa-automation-showcase/actions/workflows/tests.yml)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)

A test automation framework combining **UI automation** (Page Object Model) and **API testing**, built with **Playwright + TypeScript**, running on **GitHub Actions CI** with automated HTML test reports on every run.

Built by **Priya Anand** — QA Automation Engineer / SDET.

📊 **[View the latest test report →](https://anand-priya.github.io/qa-automation-showcase/report/)**

---

## What this demonstrates

- **Page Object Model** design for maintainable, scalable UI test code
- **Cross-browser testing** (Chromium + Firefox) run in parallel
- **API testing** — status codes, response schema validation, negative-path testing — with zero browser overhead
- **CI/CD integration** — tests run automatically on every push, PR, and daily on a schedule
- **Test reporting** — HTML reports with traces, screenshots, and video on failure, published automatically
- **TypeScript** for type-safe test code

## Project structure

```
qa-automation-showcase/
├── tests/
│   ├── ui/
│   │   ├── pages/              # Page Object classes
│   │   │   ├── LoginPage.ts
│   │   │   ├── InventoryPage.ts
│   │   │   └── CartPage.ts     # CartPage + CheckoutPage
│   │   ├── login.spec.ts       # Login flow: valid/invalid/locked-out users
│   │   └── checkout.spec.ts    # End-to-end cart → checkout → order confirmation
│   └── api/
│       └── users.spec.ts       # GET/POST/PUT/DELETE coverage against a REST API
├── playwright.config.ts        # Multi-project config: ui-chromium, ui-firefox, api
├── .github/workflows/tests.yml # CI pipeline
└── package.json
```

## What's under test

- **UI:** [saucedemo.com](https://www.saucedemo.com) — a public e-commerce demo site built for test automation practice (login, product catalog, cart, checkout)
- **API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free, open, no-auth REST API for testing HTTP request/response handling

## Running locally

```bash
# Install dependencies
npm install

# Install browser binaries (one-time)
npx playwright install --with-deps

# Run everything
npm test

# Run just UI or just API tests
npm run test:ui
npm run test:api

# Run with a visible browser window
npm run test:headed

# View the last HTML report
npm run report
```

## CI pipeline

Every push and pull request to `main` triggers the workflow in [`.github/workflows/tests.yml`](.github/workflows/tests.yml), which:

1. Installs dependencies and Playwright browsers
2. Runs the full UI + API suite across Chromium and Firefox
3. Uploads the HTML report as a build artifact
4. Publishes the report to GitHub Pages so it's viewable without downloading anything

A daily scheduled run also keeps the CI badge above reflecting a recent, real pass — not just a one-time green checkmark.

## Why Page Object Model

Each UI page (`LoginPage`, `InventoryPage`, `CartPage`/`CheckoutPage`) encapsulates its own locators and actions. Test specs describe *user behavior* — `login()`, `addItemToCartByName()`, `beginCheckout()` — instead of raw selectors, so when the UI changes, updates happen in one place instead of across every test file.

---

**Contact:** [LinkedIn](https://www.linkedin.com/in/priya-anand2000/) · [Priya959and@gmail.com](mailto:Priya959and@gmail.com) · [GitHub](https://github.com/Anand-Priya)
