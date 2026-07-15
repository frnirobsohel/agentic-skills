# Error Handling & Form Validation

This module outlines the protocol for standardizing server-side error payloads and mapping them directly to frontend form input fields and user interfaces.

---

## ⚡ Core Philosophy
Errors must never be generic strings or dump server traces. Server-side validation errors must be structured so that frontend applications can dynamically map errors to specific user interface components, providing contextual feedback to users.

---

## 🛠️ Best Practices

### 1. RFC 7807 (Problem Details) Specification
All error payloads must follow the **RFC 7807** standard. For validation errors, return a `422 Unprocessable Entity` status with detailed field violations:

```json
{
  "type": "https://api.example.com/errors/validation-error",
  "title": "Validation Failed",
  "status": 422,
  "detail": "One or more fields failed validation requirements.",
  "instance": "/api/v1/users",
  "errors": {
    "email": [
      {
        "code": "email_taken",
        "message": "This email address is already registered."
      }
    ],
    "password": [
      {
        "code": "too_short",
        "message": "Password must be at least 8 characters."
      }
    ]
  }
}
```

### 2. Frontend Validation Pipeline
A production-grade form input validation lifecycle runs in two tiers:
1. **Client-Side Pre-validation (Tier 1)**: Basic checks (required fields, regex matches, password length) are checked instantly on the client to avoid redundant network roundtrips.
2. **Server-Side Validation (Tier 2)**: Complex constraints (unique checks, permission gates, multi-field database assertions) must run on the backend and return the standard RFC 7807 error format.

### 3. Dynamic Field Mapping
When mapping server-side error arrays into the UI:
- **Associate errors with inputs**: The keys in the server's `errors` object must match the names/IDs of form inputs.
- **Accessibility (WCAG)**:
  - Set `aria-invalid="true"` on invalid inputs.
  - Attach the error container ID to the input's `aria-describedby` attribute.
- **Focus Management**: On form submit failure, move keyboard focus to the first form input field that contains an error.

```javascript
// Example: Mapping server error to React Form State (e.g., React Hook Form / Formik)
function handleFormSubmitError(serverError, setErrorField) {
  if (serverError.status === 422 && serverError.errors) {
    Object.entries(serverError.errors).forEach(([fieldName, fieldErrors]) => {
      // Set field error to the first error message
      setErrorField(fieldName, {
        type: fieldErrors[0].code,
        message: fieldErrors[0].message
      });
    });
  }
}
```

### 4. Handling Global Errors
- **500, 403, 401 Errors**: Do not map database errors, timeouts, or unauthorized actions to input fields. Use global banners, layout error boundaries, or Toast notifications (e.g., `react-hot-toast`).
- **Never expose raw stack traces**: In production, raw logs or query stack traces should be suppressed and mapped to a generic `Correlation ID` for monitoring (e.g., Sentry).

---

## 🚫 Anti-Patterns to Avoid
- ❌ **Using HTTP 200 for Errors**: Returning a 200 OK with `{ "success": false, "error": "msg" }`. This breaks standard HTTP caching, logging, and routing middleware.
- ❌ **Plain Text Errors**: Returning a single string (e.g., `res.status(400).send("Email exists")`) which makes structured localization and styling impossible.
- ❌ **Flickering Error States**: Removing the validation error while the user is actively typing, only to flash it back immediately. Clear errors when input validity changes, not on keydown.
