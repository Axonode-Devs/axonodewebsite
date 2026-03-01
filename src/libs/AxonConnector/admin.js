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
    localStorage.removeItem('axon_admin_user');
  }

  /**
   * Check if admin is signed in
   */
  get isSignedIn() {
    const token = localStorage.getItem('axon_admintoken');
    return !!token && !this._isTokenExpired(token);
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
   * Get current admin user data (alias)
   */
  getCurrentUser() {
    return this.currentUser;
  }

  /**
   * Decode and check if token is expired
   */
  _isTokenExpired(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return true;
      
      const decoded = JSON.parse(atob(parts[1]));
      if (!decoded.exp) return false;
      
      const expirationTime = decoded.exp * 1000;
      return Date.now() > expirationTime;
    } catch {
      return true;
    }
  }

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
      const { data } = await this.client.get(`/admin/check-invite/${id}`);
      return data
    } catch (err) {
      throw this._handleError(err);
    }
  }
}