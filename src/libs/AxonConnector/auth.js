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
      if (data.access_token) {
        localStorage.setItem('axon_token', data.access_token);
      }
      if (data.user) {
        localStorage.setItem('axon_user', JSON.stringify(data.user));
      }
      return data; 
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Sign in with email and password
   */
  async signInWithEmailPassword(email, password) {
    try {
      const { data } = await this.client.post('/auth/login', { email, password });
      if (data.access_token) {
        localStorage.setItem('axon_token', data.access_token);
      }
      if (data.user) {
        localStorage.setItem('axon_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Sign out current user
   */
  signOut() {
    localStorage.removeItem('axon_token');
    localStorage.removeItem('axon_user');
  }

  /**
   * Check if user is signed in
   */
  get isSignedIn() {
    return !!localStorage.getItem('axon_token');
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
