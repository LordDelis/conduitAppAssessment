## Table of Contents
# API BUG
1. [API-BUG-001] Registration Bypass on Completely Invalid Email Address Formats
2. [API-BUG-002] Registration Bypass Permitting Duplicate Usernames
3. [API-BUG-003] Registration Bypasses Password Validation Using Only Whitespace
# UI BUG
1. 
---
### Registration Bypass on Invalid Email Address Formats

*   **Bug ID:** API-BUG-001
*   **Severity:** Critical
*   **Priority:** High
*   **Environment:** Dev (`http://localhost:3001/api`)
*   **Preconditions:** None.
*   **Reproduction Steps:**
    1. Open your API client (Postman).
    2. Input a valid unique username and a password.
    3. In the email field, enter a string lacking standard domain structure, missing both the `@` symbol and top-level domain (e.g., `testuser`).
    4. Execute the `POST /api/users` request.
    
*   **Expected Behaviour:** 
    The server should intercept the request, reject the registration with an HTTP status code `422 Unprocessable Entity` (or `400 Bad Request`), and return a descriptive validation error.

*   **Actual Behaviour:** 
    The registration request completely bypasses all data integrity checks. The server returns a `201 Created` status code, and generates an authentication token.

  *   **Supporting Evidence:**
  
// Request

{
  "user": {
      "username": "reader9932",
      "email": "testuser1223",
      "password": "Password123!",
      "bio": "",
      "image": ""
  }
}

// Response - 201 Created

{
  "user": {
      "email": "testuser1223",
      "username": "reader9932",
      "bio": "",
      "image": "",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWRlcjk5MzIiLCJlbWFpbC"
  }
}


### Registration Bypass Permitting Duplicate Usernames

*   **Bug ID:** API-BUG-002
*   **Severity:** Critical
*   **Priority:** High
*   **Environment:** Dev (`http://localhost:3001/api`)
*   **Preconditions:** An account must already exist in the database with a specific username
*   **Reproduction Steps:**
    1. Open your API client (Postman).
    2. Attempt to register a brand new account using the exact same username, but provide a unique, unused email address and a valid password
    3. In the email field, enter a string lacking standard domain structure, missing both the `@` symbol and top-level domain (e.g., `testuser`).
    4. Execute the `POST /api/users` request.

*   **Expected Behaviour:**
    The server should enforce the database uniqueness constraint on the username column. The request should be rejected with an HTTP status code 422 Unprocessable Entity and return an error message stating that the username has already been taken

*   **Actual Behaviour:**
    The server completely bypassed the unique username constraint. It processed the duplicate registration successfully, returns a 201 Created status code and created a user record in the database sharing the exact same username

  *   **Supporting Evidence:**

// Request

{
  "user": {
      "username": "reader9932",
      "email": "testuser1223@gmail.com",
      "password": "Password123!",
      "bio": "",
      "image": ""
  }
}

// Response: 201 Created

{
  "user": {
      "email": "testuser1223@gmail.com",
      "username": "reader9932",
      "bio": "",
      "image": "",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWRlcjk5MzIiLCJlbWFpbC"
  }
}

### Registration Bypasses Password Validation Using Only Whitespace

*   **Bug ID:** API-BUG-003
*   **Severity:** High
*   **Priority:** High
*   **Environment:** Dev (`http://localhost:3001/api`)
*   **Preconditions:** None
*   **Reproduction Steps:**
    1. Open your API client (Postman).
    2. Input a valid unique username and a unique email address
    3. In the password field, input a string consisting entirely of empty spaces (e.g., "  ")
    4. Execute the `POST /api/users` request.

*   **Expected Behaviour:**
    The server should sanitize and trim input fields or enforce a strict non-empty string policy for credentials. The request should be rejected with an HTTP status code 422 Unprocessable Entity (or 400 Bad Request), returning an error payload indicating that the password cannot be blank or empty

*   **Actual Behaviour:**
    The server accepted the empty space string without evaluating it as blank. It returned a 201 Created status code, and successfully creatd the account

*   **Supporting Evidence:**

// Request

{
    "user": {
        "username": "edgecase_user_5664",
        "email": "edgecase_user_5664@gmail.com",
        "password": "  ",
        "bio": "",
        "image": ""
    }
}

// Response: 201 Created

{
    "user": {
        "email": "edgecase_user_5664@gmail.com",
        "username": "edgecase_user_5664",
        "bio": "",
        "image": "",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlYWRlcjk5MzIiLCJlbWFpbC"
    }
}