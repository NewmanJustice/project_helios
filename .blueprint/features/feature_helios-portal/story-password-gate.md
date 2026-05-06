# User Story — Password Gate

## Story

As a reader (Senior Civil Servant or Judiciary),
I want to be prompted for an access code when I arrive at the portal,
so that only invited readers can access the Helios narrative content.

---

## Acceptance Criteria

**AC1 — Gate shown on load**
Given I navigate to the portal URL,
When the page finishes loading,
Then only the password gate (Section 0) is visible and all sections 1–8 are hidden.

**AC2 — Correct password unlocks the portal**
Given I am on the password gate,
When I enter `helios2025` (exact match, case-sensitive) and submit,
Then the password gate is hidden and sections 1–8 are revealed.

**AC3 — Wrong password shows error and keeps gate visible**
Given I am on the password gate,
When I enter any string that is not exactly `helios2025` and submit,
Then a visible error message is displayed on the gate, the gate remains visible, and no section content is revealed.

**AC4 — Error is non-destructive; retry is possible**
Given I have submitted an incorrect password and the error state is shown,
When I clear or amend the input and submit again,
Then I can attempt re-entry without page reload; there is no lockout or attempt counter.

**AC5 — Password stored in config.js, not inline**
Given the source code of the portal,
When I inspect the JavaScript files,
Then the password value `helios2025` is defined in a dedicated `config.js` file and is not hardcoded inline in the main application JS.

**AC6 — No content accessible without the correct password**
Given I am on a locked session,
When I inspect the DOM or page source,
Then sections 1–8 are present in the DOM but visually hidden (e.g. `display:none` or equivalent) — the gate is an access deterrent, not a content-removal mechanism.

**AC8 — Enter key submits the password form**
Given I am on the password gate with the access code input focused,
When I type the password and press the Enter key (without clicking the submit button),
Then the form is submitted and the same correct/incorrect behaviour applies as for button-click submission.

**AC7 — Refresh returns to locked state**
Given I have successfully unlocked the portal,
When I refresh the browser tab,
Then the password gate is shown again and sections 1–8 are hidden; no session is persisted.

---

## Out of Scope

- Server-side validation of the password
- Lockout after N failed attempts
- "Remember me" or session persistence across refreshes
- Multi-factor or role-based access control
- Any description or treatment of this gate as "secure authentication"
