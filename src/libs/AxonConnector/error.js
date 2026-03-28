/**
 * axonode/error.js
 *
 * ApiError — a real Error subclass so callers can:
 *   - catch with instanceof ApiError
 *   - branch on err.code  (machine-readable, e.g. "INVALID_CREDENTIALS")
 *   - show  err.message   (human-readable, safe to display)
 *   - read  err.details   (field-level validation errors from the server)
 *   - log   err.status    (HTTP status code)
 *
 * The original SDK used a plain object from _handleError(), which had no
 * stack trace and couldn't be caught with instanceof.
 */
export class ApiError extends Error {
  /**
   * @param {string} code
   * @param {string} message
   * @param {number} status
   * @param {Array}  details
   */
  constructor(code, message, status, details = []) {
    super(message);
    this.name    = 'ApiError';
    this.code    = code;
    this.status  = status;
    this.details = details;
  }
}
