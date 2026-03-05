export class AdminModule {
  constructor(client, handleError) {
    this.client = client;
    this._handleError = handleError;
    this._user = null;
  }

  /**
   * Login as admin
   */
  async login(email, password) {
    try {
      const { data } = await this.client.post('/admin/login', { email, password });
      if (data.access_token) {
        localStorage.setItem('axon_admintoken', data.access_token);
      }
      
      // CRITICAL: Must match the key in your Axios interceptor
      if (data.refresh_token) {
        localStorage.setItem('axon_admin_refresh', data.refresh_token);
      }

      if (data.user) {
        localStorage.setItem('axon_admin_user', JSON.stringify(data.user));
        this._user = data.user;
      }
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Logout current admin
   */
  logout() {
    localStorage.removeItem('axon_admintoken');
    localStorage.removeItem('axon_admin_refresh');
    localStorage.removeItem('axon_admin_user');
  }

  /**
   * Check if admin is signed in
   */
  get isSignedIn() {
    return !!localStorage.getItem('axon_admin_refresh');
  }

  /**
   * Check if token has expired
   */
  get tokenExpired() {
    return !this.isSignedIn;
  }

  /**
   * Get current admin token
   */
  getToken() {
    return localStorage.getItem('axon_admintoken');
  }

  /**
   * Get current admin user data
   */
  get currentUser() {
    const user = localStorage.getItem('axon_admin_user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Decode and check if token is expired
   */

  // ============ Applications ============

  /**
   * List applications with pagination
   */
  async listApplications(page = 1, perPage = 10) {
    try {
      const { data } = await this.client.get('/applications/', {
        params: { page, per_page: perPage }
      });
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Get single application by ID
   */
  async getApplication(id) {
    try {
      const { data } = await this.client.get(`/applications/${id}`);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Approve an application
   */
  async approveApplication(id) {
    try {
      const { data } = await this.client.post(`/applications/${id}/approve`);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Reject an application
   */
  async rejectApplication(id) {
    try {
      const { data } = await this.client.post(`/applications/${id}/reject`);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  // ============ Invites ============

  /**
   * Generate an invite link
   */
  async createInvite(note = 'You') {
    try {
      const { data } = await this.client.post('/admin/generate-invite', { 
        for: note 
      });
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Revoke an invite link
   */
  async revokeInvite(id) {
    try {
      const { data } = await this.client.post(`/admin/invites/${id}/revoke`);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }
  /**
   * Revoke an invite link
   */
  async checkInvite(id) {
    try {
      const { data } = await this.client.post(`/admin/check-invite`, {token : id});
      return data
    } catch (err) {
      throw this._handleError(err);
    }
  }
}