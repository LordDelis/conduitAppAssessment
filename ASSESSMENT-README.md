# Conduit E2E Test Suite (Cypress)

This repository contains the end-to-end (E2E) testing suite for the **Conduit (RealWorld)** social blogging application. The framework is engineered to validate core user journeys, business rules, API synchronization, and security boundaries.

---

## 🛠️ Tools & Technologies Used

* **Testing Framework:** [Cypress (v13+)](https://www.cypress.io/) - Selected for its native browser execution, automatic waiting mechanisms, and built-in network interception capabilities.
* **Language:** JavaScript (ES6+).
* **Reporting Engines:** 
  * `cypress-mochawesome-reporter` for rich, standalone HTML visual report generation.
* **CI/CD Integration:** GitHub Actions

---

## ⚙️ Initial Project Setup

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and `npm` installed.

1. **Clone the Testing Repository:**
   ```bash
   git clone https://github.com/your-organization/conduit-cypress-tests.git
   cd conduit-cypress-tests
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `cypress.env.json` file in the root directory to store static execution targets and test accounts securely:
   ```json
   {
     "baseUrl": "https://conduit.productionready.io",
     "apiServer": "https://conduit-api.productionready.io/api"
   }
   ```

---

## 🏃‍♂️ Test Execution & Reporting

Tests can be triggered across interactive execution, headless regression cycles, or isolated spec runs.

### 1. Interactive Runner (GUI Mode)
Ideal for writing new test blocks or debugging selectors locally.
```bash
npm run cy:open
```
*Alternative:* `npx cypress open`

### 2. Headless Regression Runs (CLI Mode)
Runs the entire test inventory inside a headless browser wrapper.
```bash
npm run cy:run
```
*Alternative:* `npx cypress run`

### 3. Isolated Spec Block Runner
To isolate validation execution to a single functional module:
```bash
npx cypress run --spec "cypress/e2e/auth.cy.js"
```

### 📊 Report Generation
The suite uses **Mochawesome** to combine all individual specification results into unified visual logs.
* **HTML Reports:** Saved automatically to `cypress/reports/html/index.html` after headless runs.
* **Artifacts & Screenshots:** Failed test sessions automatically generate matching frame captures inside `cypress/screenshots/` and video feeds inside `cypress/videos/`.

---

## 💡 Engineering Assumptions

1. **Deterministic Backend State:** It is assumed that the Conduit API server supports independent payload isolation or that test datasets utilize dynamic stamps (e.g., `testuser_${Date.now()}@example.com`) to completely avoid race conditions or dirty state conflicts during parallel test execution.
2. **Network Reliability:** The framework assumes stable connectivity to the Conduit hosted API layer. Network spikes above Cypress's standard command timeout setting (`4000ms`) are mitigated globally via custom event extensions in `cypress.config.js`.
3. **Consistent SPA Framework Architecture:** The testing architecture assumes standard React, Angular, or Vue RealWorld specifications where elements map cleanly to deterministic data attributes or standard predictable semantic elements.

---

## ⚠️ Framework Limitations

* **Cross-Domain Verification Restrictions:** In alignment with Cypress browser security profiles, this suite does not navigate outside the configured primary application domain (e.g., trying to test third-party OAuth sign-ins via an external platform redirect directly).
* **Database Level Teardowns:** The suite lacks access to perform direct backend truncation (`TRUNCATE TABLE`) commands. All clean-up cycles rely entirely on UI component deletions or isolated API DELETE network payloads.
* **Mochawesome Report Merging:** In standard multi-threaded execution environments, an explicit post-test command execution script (`mochawesome-merge`) must run to generate a single consolidated asset view.

---

## 🤖 AI Usage & Engineering Acknowledgments

This framework, its architectural scaffolding, and the corresponding scenario map (`TEST-CASES.md`) were co-designed using generative AI models alongside human QA testing criteria. 
* **Scaffolding Efficiency:** Generative models were leveraged to build scalable test specifications, setup standard hook configurations (`beforeEach`), and structure mock fixture data.
* **Validation Bounds:** Edge case test configurations, state-transition assertions, and authorization boundary definitions were synthesized with AI guidance to ensure industry-standard coverage for complex asynchronous UI interactions.