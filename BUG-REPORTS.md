# BUG-REPORTS.md

## Table of Contents
1. [BUG-001] Registration Bypass via Leading/Trailing Whitespace in Username
2. [BUG-002] Inconsistent Error Payload Structure for Missing Registration Fields
3. [BUG-003] Client-Side Validation Hypersensitivity on Valid Special Character Email Aliases
4. [BUG-004] Lack of Password Complexity Policy and Visual Strength Feedback
5. [BUG-005] Registration Bypass on Completely Invalid Email Address Formats

---

### BUG-001: [CRITICAL] Registration Bypass via Leading/Trailing Whitespace in Username

*   **Bug ID:** BUG-001
*   **Severity:** Critical
*   **Priority:** High
*   **Environment:** Production / Staging (`https://api.realworld.io/api`)
*   **Preconditions:** None.
*   **Reproduction Steps:**
    1. Open Postman or a cURL terminal.
    2. Send a `POST` request to `/api/users`.
    3. Provide a payload where the username contains leading or trailing spaces (e.g., `"username": " JohnDoe "`).
    4. Provide a unique email and valid password.
    5. Send the request.
    6. Send a second registration request with the trimmed version of the username (e.g., `"username": "JohnDoe"`), using a different unique email.
*   **Expected Behaviour:** 
    The server should trim whitespace from fields before processing. If `"JohnDoe"` already exists, a duplicate username with spaces `" JohnDoe "` should be rejected with a `422 Unprocessable Entity` error to prevent impersonation and data corruption.
*   **Actual Behaviour:** 
    The server accepts both `" JohnDoe "` and `"JohnDoe"` as completely distinct accounts. On the UI/frontend, these users appear completely identical, presenting a massive security/impersonation risk.
*   **Supporting Evidence:**
    ```json
    // POST /api/users payload
    {
      "user": {
        "username": " JohnDoe ",
        "email": "space_test@example.com",
        "password": "password123"
      }
    }
    // Response: 201 Created
    ```

---

### BUG-002: [HIGH] Inconsistent Error Payload Structure for Missing Registration Fields

*   **Bug ID:** BUG-002
*   **Severity:** High
*   **Priority:** Medium
*   **Environment:** Staging / Test Automation Environment
*   **Preconditions:** Automated testing pipeline executing API contract validation.
*   **Reproduction Steps:**
    1. Issue a registration `POST` request missing the `email` key entirely.
    2. Note the structure of the JSON error response.
    3. Issue a second registration `POST` request, this time including the `email` key but leaving it as an empty string `""`.
    4. Compare the structures of the returned error bodies.
*   **Expected Behaviour:** 
    The error payload should strictly adhere to the RealWorld API specification format for validation errors across all input states:
    ```json
    { "errors": { "email": ["can't be blank"] } }
    ```
*   **Actual Behaviour:** 
    When the key is completely missing, the backend returns a generic, top-level framework exception string. When the key is present but empty, it returns the specification-compliant object structure. This inconsistency frequently breaks strict frontend deserialization logic and automated Postman test collections.
*   **Supporting Evidence:**
    *   *Missing Key Response:* `400 Bad Request` -> `{"message": "Invalid payload body"}`
    *   *Empty String Response:* `422 Unprocessable Entity` -> `{"errors":{"email":["can't be blank"]}}`

---

### BUG-003: [MEDIUM] Client-Side Validation Hypersensitivity on Valid Special Character Email Aliases

*   **Bug ID:** BUG-003
*   **Severity:** Medium
*   **Priority:** Medium
*   **Environment:** Production / Frontend Application UI
*   **Preconditions:** User possesses a valid RFC 5322 compliant email alias utilizing tags (e.g., `user+conduit@domain.com`).
*   **Reproduction Steps:**
    1. Navigate to the Conduit Registration page UI.
    2. Input a valid username and password.
    3. Enter `test+alias@example.com` into the email field.
    4. Attempt to click the "Sign up" button.
*   **Expected Behaviour:** 
    The frontend regex should accept sub-addressing / email tags (`+`) as they are fully compliant with global email standards and widely used by QA engineers and power users.
*   **Actual Behaviour:** 
    The frontend client-side validation marks the field as invalid instantly, blocking the form submission event entirely and forcing a hard stop on the user.
*   **Supporting Evidence:**
    Frontend console logs show regex evaluation failing locally against a restrictive pattern: `/^[a-zA-O0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` that was improperly built or parsed by the UI framework layer.

---

### BUG-004: [LOW/USABILITY] Lack of Password Complexity Policy and Visual Strength Feedback

*   **Bug ID:** BUG-004
*   **Severity:** Low / Usability
*   **Priority:** Low
*   **Environment:** All Environments
*   **Preconditions:** User navigating the registration UI.
*   **Reproduction Steps:**
    1. Go to the Sign Up form.
    2. Enter a highly insecure password such as `1` or `a`.
    3. Submit the registration.
*   **Expected Behaviour:** 
    The registration form should enforce basic security hygiene (e.g., minimum 8 characters) or at least display a visual warning indicator notifying the user of an insecure password choice.
*   **Actual Behaviour:** 
    The system seamlessly registers the account with a single-character password without any visual friction, presenting an ongoing security risk to the user's data integrity.
*   **Supporting Evidence:** Accounts can actively be queried and authenticated against with single-character credentials in the production database environment.

---

### BUG-005: [CRITICAL] Registration Bypass on Completely Invalid Email Address Formats

*   **Bug ID:** BUG-005
*   **Severity:** Critical
*   **Priority:** High
*   **Environment:** Production / Staging (`https://api.realworld.io/api`)
*   **Preconditions:** None.
*   **Reproduction Steps:**
    1. Navigate to the Conduit Registration page or open your API client (Postman/cURL).
    2. Input a valid unique username and a password.
    3. In the email field, enter a string lacking standard domain structure, missing both the `@` symbol and top-level domain (e.g., `testuser`).
    4. Submit the registration form or execute the `POST /api/users` request.
*   **Expected Behaviour:** 
    The server or client-side validation layer must intercept the request, reject the registration with an HTTP status code `422 Unprocessable Entity` (or `400 Bad Request`), and return a descriptive validation error (e.g., `{"errors":{"email":["is invalid"]}}`).
*   **Actual Behaviour:** 
    The registration request completely bypasses all data integrity checks. The server returns a `201 Created` status code, generates an authentication token, and persists a user record with an unroutable, malformed string (`testuser`) in the database email column.
*   **Supporting Evidence:**
    ```json
    // POST /api/users
    {
      "user": {
        "username": "ValidUser123",
        "email": "testuser",
        "password": "SecurePassword123"
      }
    }

    // Response: 201 Created
    {
      "user": {
        "email": "testuser",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "username": "ValidUser123",
        "bio": null,
        "image": null
      }
    }
    ```