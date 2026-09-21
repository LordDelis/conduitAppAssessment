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
   git clone https://github.com/LordDelis/conduitAppAssessment.git
   cd conduitAppAssessment
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Install newman**
   ```bash
   npm install -g newman
   ```   

4. **Start the conduit application server:**
   ```bash
   npm run dev
   ```


---

## 🏃‍♂️ Test Execution & Reporting

Tests can be triggered across interactive execution, headless regression cycles, or isolated spec runs.

### 1. Interactive Runner (GUI Mode)
Ideal for writing new test blocks or debugging selectors locally.
```bash
npm run cy:open
```

### 2. Headless Regression Runs (CLI Mode)
Runs the entire test inventory inside a headless browser wrapper.
```bash
npm run cy:run
```

### 3. Isolated Spec Block Runner
To isolate validation execution to a single functional module:
```bash
npx cypress run --spec "cypress/e2e/<specname>.cy.js"
```

### 4. API Test (CLI Mode)
Runs the entire API collection in CLI using Newman.
```bash
npm run test:api
```

### 📊 Report Generation
The suite uses **Mochawesome** to combine all individual specification results into unified visual logs.
* **HTML Reports:** Saved automatically to `cypress/reports/html/index.html` after headless runs.
* **Artifacts & Screenshots:** Failed test sessions automatically generate matching frame captures inside `cypress/screenshots/` and video feeds inside `cypress/videos/`.

---

## ⚠️ Framework Limitations

* **Cross-Domain Verification Restrictions:** In alignment with Cypress browser security profiles, this suite does not navigate outside the configured primary application domain (e.g., trying to test third-party OAuth sign-ins via an external platform redirect directly).

---

## 🤖 AI Usage & Engineering Acknowledgments

This framework, its architectural scaffolding, and the corresponding scenario map (`TEST-CASES.md`) were co-designed using generative AI models alongside human QA testing criteria. 
* **Scaffolding Efficiency:** Generative models were leveraged to build scalable test specifications, setup standard hook configurations (`beforeEach`), and structure mock fixture data.
* **Validation Bounds:** Edge case test configurations, state-transition assertions, and authorization boundary definitions were synthesized with AI guidance to ensure industry-standard coverage.