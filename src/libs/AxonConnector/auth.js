export class AuthModule {
  constructor(client, keys) {
    this.client = client;
    this.keys = keys; // Required for _cfg()
  }

  // Helper for interceptor to know which storage keys to use
  _cfg() {
    return {
      _tokenKey: this.keys.userToken,
      _refreshKey: this.keys.userRefresh
    };
  }

  /**
   * Consolidated Sign In
   */
  async signIn(email, password) {
    // We pass _cfg() as the third argument (axios config)
    const { data } = await this.client.post(
      "/auth/sessions",
      { email, password },
      this._cfg() 
    );
    this._saveSession(data.data);
    return data.data;
  }

  _saveSession({ access_token, refresh_token, user }) {
    // Use the keys passed in the constructor
    localStorage.setItem(this.keys.userToken, access_token);
    localStorage.setItem(this.keys.userRefresh, refresh_token);
    localStorage.setItem("user_data", JSON.stringify(user));
  }

  /**
   * Password Setup (Account Activation)
   */
  async activateAccount(setupToken, newPassword) {
    const { data } = await this.client.post(
      "/auth/credentials",
      { password: newPassword },
      {
        headers: { Authorization: `Bearer ${setupToken}` },
        _skipAuth: true, // Tell interceptor not to inject stored tokens
      }
    );
    this._saveSession(data.data);
    return data.data.user;
  }

  signOut() {
    localStorage.clear();
  }

  get isSignedIn() {
    const tokenKey = this.keys?.userToken || 'access_token';
    return !!localStorage.getItem(tokenKey);
  }

  get currentUser() {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }
}