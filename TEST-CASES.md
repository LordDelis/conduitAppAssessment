# 🧪 Conduit Application Test Cases

This document outlines the high-impact test scenarios for the **Conduit** social blogging application. It covers core user workflows, happy paths, negative boundaries, state transitions, and authorization checks.

---

## 📂 Table of Contents
1. [User Registration & Authentication](#1-user-registration--authentication)
2. [Article Lifecycle Management](#2-article-lifecycle-management)
3. [Comments System](#3-comments-system)
4. [Favorites & Social Interactions](#4-favorites--social-interactions)
5. [User Profiles & Follow Mechanics](#5-user-profiles--follow-mechanics)
6. [Authorization Boundaries & Security](#6-authorization-boundaries--security)

---

## 1. User Registration & Authentication

### TC-AUTH-01: Successful User Registration (Positive)
* **Objective:** Verify a new user can successfully create an account with valid, unique credentials.
* **Pre-conditions:** User is on the Sign-Up page. Email and username do not exist in the system.
* **Steps:**
  1. Input a unique username (e.g., `testuser_2026`).
  2. Input a valid, unused email format (e.g., `testuser_2026@example.com`).
  3. Input a secure password (e.g., `P@ssword123`).
  4. Click the "Sign up" button.
* **Expected Result:** Account is successfully created. User is automatically logged in, redirected to the Home Page, and their username is visible in the navigation header.

### TC-AUTH-02: Registration with Existing Credentials (Negative / Boundary)
* **Objective:** Ensure the system prevents duplicate account creation for existing usernames or emails.
* **Pre-conditions:** An account already exists with username `conduit_dev` and email `dev@conduit.io`.
* **Steps:**
  1. Attempt registration using the exact duplicate email or username.
  2. Fill out remaining fields validly and click "Sign up".
* **Expected Result:** Registration fails. An explicit, human-readable validation error message appears (e.g., `"email has already been taken"` or `"username has already been taken"`)

### TC-AUTH-03: Login Session Persistence (State Transition)
* **Objective:** Verify user session persists across page reloads and browser tab closures.
* **Pre-conditions:** User logs in successfully with valid credentials.
* **Steps:**
  1. Complete login and confirm dashboard access.
  2. Manually reload the browser window (`F5`).
  3. Close the browser tab, open a new tab, and navigate back to the Conduit URL.
* **Expected Result:** The application retains the authenticated state (via `localStorage` token). The user remains logged in without being forced to re-authenticate.

---

## 2. Article Lifecycle Management

### TC-ART-01: Create and Publish Article (Positive)
* **Objective:** Verify an authenticated user can publish a valid markdown blog article.
* **Pre-conditions:** User is logged in and navigates to the "New Post" editor.
* **Steps:**
  1. Enter a valid Title and Short Description.
  2. Input a body.
  3. Enter tags (e.g., `cypress`, `testing`) separated by enters/commas.
  4. Click "Publish Article".
* **Expected Result:** The article is published instantly. The user is redirected to the published article's unique URL, and the markdown formatting renders accurately into clean HTML.

### TC-ART-02: Edit Existing Article Owned by User (Positive / State Transition)
* **Objective:** Verify an author can modify their own article content and tags.
* **Pre-conditions:** An article exists, authored by the currently logged-in user. User is on the specific article details view.
* **Steps:**
  1. Click the "Edit Article" button.
  2. Modify the body text and add a new tag.
  3. Click "Publish Article" to update.
* **Expected Result:** Changes save successfully. The user is redirected back to the updated article details view showing the newly edited body text and tags.

### TC-ART-03: Delete Article Owned by User (Positive / State Transition)
* **Objective:** Verify an author can permanently remove their own article.
* **Pre-conditions:** An article exists, authored by the currently logged-in user.
* **Steps:**
  1. Click the "Delete Article" button.
* **Expected Result:** The article is purged from the database. The user is redirected to the Home Page, and the deleted article disappears from both the Global Feed and the user's My Articles feed.

---

## 3. Comments System

### TC-COM-01: Add Comment to an Article (Positive)
* **Objective:** Verify authenticated readers can append comments to any active article.
* **Pre-conditions:** User is logged in and viewing an article detail page (authored by self or someone else).
* **Steps:**
  1. Scroll down to the comment card input area.
  2. Type a valid text comment.
  3. Click "Post Comment".
* **Expected Result:** The comment card renders immediately at the top/bottom of the comment section list without requiring a full page refresh. The author's profile picture and username attach properly.

### TC-COM-02: Empty Comment Submission Prevention (Negative / Boundary)
* **Objective:** Prevent backend clutter by blocking empty or whitespace-only comment submissions.
* **Pre-conditions:** User is logged in and viewing an article.
* **Steps:**
  1. Leave the comment box blank or type only empty space characters.
  2. Click "Post Comment".
* **Expected Result:** The application blocks submission at the UI layer or returns a clear error payload. No empty text card is appended to the DOM feed.

---

## 4. Favorites & Social Interactions

### TC-FAV-01: Toggle Favorite Status (State Transition)
* **Objective:** Verify liking and unliking an article correctly adjusts the counter metrics.
* **Pre-conditions:** User is logged in. An article authored by *another user* is visible in the Global Feed with `0` favorites.
* **Steps:**
  1. Click the green "Favorite" heart icon button on the card. (Observe transition to filled state, count shifts to `1`).
  2. Click the exact same "Favorited" button again. (Observe transition back to empty state, count shifts back to `0`).
* **Expected Result:** UI toggles filled states dynamically. The backend updates the counter seamlessly, and navigating to the user's profile shows the article appearing and disappearing under the "Favorited Articles" tab layout.

---

## 5. User Profiles & Follow Mechanics

### TC-PROF-01: Follow/Unfollow Author Profile (State Transition)
* **Objective:** Validate the follow toggle logic updates user feeds and counters accurately.
* **Pre-conditions:** User A is logged in. User B has an existing public profile with articles.
* **Steps:**
  1. Navigate to User B's profile page.
  2. Click "+ Follow [User B]". (Button changes text to "Unfollow [User B]").
  3. Navigate to User A's homepage and click the "Your Feed" tab.
  4. Return to User B's profile page and click "Unfollow [User B]".
* **Expected Result:** Following adds User B's posts into User A's custom dashboard "Your Feed". Unfollowing safely truncates them out of the feed instantaneously.

---

## 6. Authorization Boundaries & Security

### TC-AUTHZ-01: Unauthenticated Read-Only Access (Boundary)
* **Objective:** Verify guests can consume content but cannot execute state-changing actions.
* **Pre-conditions:** User is completely logged out (Anonymous Guest).
* **Steps:**
  1. Access the base URL.
  2. Try navigating into an article details page.
  3. Try to locate the "New Post", "Settings", or comment text fields.
* **Expected Result:** Guest can view the Global Feed and read full articles. However, they cannot comment, favorite posts, follow authors, or access the markdown post creation suite. Interacting with these prompts redirects them to the Sign-In landing page.

### TC-AUTHZ-02: Unauthorized Article Manipulation Protection (Boundary)
* **Objective:** Prevent malicious or accidental edits/deletions of third-party articles.
* **Pre-conditions:** User A is logged in. An article authored strictly by User B exists in the ecosystem.
* **Steps:**
  1. User A navigates directly to User B's article view screen.
  2. Scan the screen for "Edit Article" or "Delete Article" actionable UI buttons.
  3. Force-navigate URL manually to `editor/<user-b-article-slug>` via the browser search bar.
* **Expected Result:** The action buttons are hidden from the UI. Attempting to force-navigate the URL directly throws a graceful `403 Forbidden` API exception or forcefully kicks User A back to the dashboard.
