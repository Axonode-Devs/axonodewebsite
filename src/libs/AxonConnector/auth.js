// auth.js
export class AuthModule {
  constructor(client, handleError) {
    this.client = client;
    this._handleError = handleError;
  }

  /**
   * The final step of activation.
   * This uses the token from the email URL.
   */
  async activateAccount(token, password) {
    try {
      const { data } = await this.client.post('/auth/set-password', 
        { password }, 
        { headers: { Authorization: `Bearer ${token}` } } // Force the setup token
      );
      return data; // { msg: "Password set successfully" }
    } catch (err) {
      throw this._handleError(err);
    }
  }

  

  // Regular user login (once activated)
  async login(email, password) {
    try {
      const { data } = await this.client.post('/auth/login', { email, password });
      if (data.access_token) localStorage.setItem('axon_token', data.access_token);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }
}