/**
 * axonode/auth.js — regular user authentication
 */
import { ApiError } from './error.js';

export class AuthModule {
  /**
   * @param {import('axios').AxiosInstance} client
   * @param {import('./keys.js').KEYS} keys
   */
  constructor(client, keys) {
    this._client = client;
    this._keys   = keys;
  }

  // Attach the user token + refresh key to the request config
  // so the interceptor in index.js knows which token to use/refresh.
  _cfg() {
    return {
      _tokenKey:   this._keys.userToken,
      _refreshKey: this._keys.userRefresh,
    };
  }

  /**
   * POST /api/v1/auth/sessions
   *
   * @param   {string} email
   * @param   {string} password
   * @returns {{ access_token, refresh_token, user }}
   */
  async signIn(email, password) {
    const { data } = await this._client.post(
      '/auth/sessions',
      { email, password },
      this._cfg(),
    );
    this._saveSession(data.data);
    return data.data;
  }

  /**
   * POST /api/v1/auth/credentials
   * Activate account from invite email link.
   *
   * The setup token is a one-time JWT from the email URL — it is NOT the
   * stored user access token, so we pass it explicitly in the header and
   * skip the normal interceptor token attachment.
   *
   * @param   {string} setupToken — from URL query param e.g. ?token=...
   * @param   {string} password
   * @returns {{ access_token, refresh_token, user }}
   */
  async setPassword(setupToken, password) {
    const { data } = await this._client.post(
      '/auth/credentials',
      { password },
      {
        // Override Authorization for this one call only —
        // don't pull from localStorage, use the setup token directly
        headers: { Authorization: `Bearer ${setupToken}` },
        // Mark as _retry so the interceptor never attempts a refresh on this
        _retry: true,
      },
    );
    this._saveSession(data.data);
    return data.data;
  }

  /** Client-side logout — discard both tokens. */
  signOut() {
    localStorage.removeItem(this._keys.userToken);
    localStorage.removeItem(this._keys.userRefresh);
    localStorage.removeItem(this._keys.userUser);
  }

  /** @returns {boolean} */
  get isSignedIn() {
    return !!localStorage.getItem(this._keys.userToken);
  }

  /** @returns {object|null} */
  get currentUser() {
    const raw = localStorage.getItem(this._keys.userUser);
    return raw ? JSON.parse(raw) : null;
  }

  _saveSession({ access_token, refresh_token, user }) {
    if (access_token)  localStorage.setItem(this._keys.userToken,   access_token);
    if (refresh_token) localStorage.setItem(this._keys.userRefresh, refresh_token);
    if (user)          localStorage.setItem(this._keys.userUser,    JSON.stringify(user));
  }
}
