export class AuthModule {
  constructor(client, handleError) {
    this.client = client;
    this._handleError = handleError;
  }

  async setPassword(token, password) {
    try {
      // Endpoint: auth.py -> /credentials
      const { data } = await this.client.post('/auth/credentials', 
        { password }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      this._saveSession(data.data); // data.data contains tokens/user
      return data.data; 
    } catch (err) {
      throw this._handleError(err);
    }
  }

  async signInWithEmailPassword(email, password) {
    try {
      // Endpoint: auth.py -> /sessions
      const { data } = await this.client.post('/auth/sessions', { email, password });
      this._saveSession(data.data);
      return data.data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  _saveSession(sessionData) {
    if (sessionData.access_token) {
      localStorage.setItem('axon_token', sessionData.access_token);
    }
    if (sessionData.refresh_token) {
      localStorage.setItem('axon_refresh', sessionData.refresh_token);
    }
    if (sessionData.user) {
      localStorage.setItem('axon_user', JSON.stringify(sessionData.user));
    }
  }

  signOut() {
    localStorage.removeItem('axon_token');
    localStorage.removeItem('axon_refresh');
    localStorage.removeItem('axon_user');
  }

  get isSignedIn() {
    return !!localStorage.getItem('axon_token');
  }

  get currentUser() {
    const user = localStorage.getItem('axon_user');
    return user ? JSON.parse(user) : null;
  }
}