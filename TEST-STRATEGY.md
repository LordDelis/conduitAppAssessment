# TEST-STRATEGY.md

This document outlines the testing strategy for the **Conduit** application (RealWorld spec), focusing on maximizing test coverage for critical user journeys while managing resource constraints. 

## 🎯 Risk Analysis & Prioritization

### High-Risk Areas
* **Registration:** Registration bypass for invalid email address and duplicate username

### Testing Priorities
1. **Core Transactional Flows:** User registration, login, article creation, and commenting.
2. **State Mutators:** Favoriting/unfavoriting articles and following/unfollowing profiles.
3. **API Payload Compliance:** Validating that request/response schemas strictly match the RealWorld OpenAPI specification.

---

## 🧪 Testing Types Implemented

### 1. API Integration Testing
* **Focus:** Component communication and contract validation.
* **Scope:** Verifying HTTP response codes (200, 201, 422), response schema validation, and correct CRUD behavior across all endpoints (`/api/users`, `/api/articles`, etc.).

### 2. End-to-End (E2E) Testing
* **Focus:** Critical user paths.
* **Scope:** Testing the complete UI workflow from a user's perspective, including markdown rendering in articles, dynamic feed updates, and persistent login states across page refreshes.

---

## 🚫 Scope Exclusions
1. Performance and Load Testing
2. Third-Party Integrations
3. Visual Regression Testing: Minor CSS shifts, font rendering variations across browsers, and dark/light mode cosmetic bugs were not covered.

---

## 📋 Assumptions & Constraints

### Key Assumptions
* **Spec Compliance:** The backend strictly implements the official RealWorld backend specification and returns consistent error structures (e.g., `{"errors":{"body":["can't be blank"]}}`).
* **Clean State:** The database can be safely seeded and reset between test suites to ensure predictable test runs.
