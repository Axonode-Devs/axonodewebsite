export class AuthModule {
  constructor(client, handleError) {
    this.client = client;
    this._handleError = handleError;
  }

  /**
   * Set password during account activation
   */
  async setPassword(token, password) {
    try {
      const { data } = await this.client.post('/auth/set-password', 
        { password }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      this._saveSession(data)
      return data; 
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Sign in with email and password
   **/
  async signInWithEmailPassword(email, password) {
    try {
      const { data } = await this.client.post('/auth/login', { email, password });
      this._saveSession(data)
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Internal helper to save tokens and user data
   */
  _saveSession(data) {
    if (data.access_token) {
      localStorage.setItem('axon_token', data.access_token);
    }
    if (data.refresh_token) {
      // THIS IS CRITICAL: The interceptor needs this key
      localStorage.setItem('axon_refresh', data.refresh_token);
    }
    if (data.user) {
      localStorage.setItem('axon_user', JSON.stringify(data.user));
    }
  }

  /**
   * Sign out current user
   */
  signOut() {
    localStorage.removeItem('axon_token');
    localStorage.removeItem('axon_refresh');
    localStorage.removeItem('axon_user');
  }

  /**
   * Check if user is signed in
   */
  get isSignedIn() {
    return !!localStorage.getItem('axon_token') || !!localStorage.getItem('axon_refresh');
  }

  /**
   * Get current user data
   */
  get currentUser() {
    const user = localStorage.getItem('axon_user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Get current user data (alias)
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Get current user token
   */
  getToken() {
    return localStorage.getItem('axon_token');
  }
}
