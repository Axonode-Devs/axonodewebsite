/**
 * Admin Module for Managing Applications
 */
export class AdminModule {
  constructor(client, handleError) {
    this.client = client;
    this._handleError = handleError;
  }

  async login(email, password) {
    try {
      const { data } = await this.client.post('/admin/login', { email, password });
      console.log(data)
      if (data.access_token) {
        localStorage.setItem('axon_token', data.access_token);
        // Optional: Save admin info if returned
      }
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  get currentUser() {
    const token = localStorage.getItem('axon_token');
    // If you wanted to get fancy, you could parse the JWT here 
    // to return the user's ID or email, but for a boolean check:
    return !!token; 
  }

  /**
   * Fetch paginated list of applications
   */
  async listApplications(params = { page: 1, per_page: 10 }) {
    try {
      const { data } = await this.client.get('/applications/', { params });
      return data; 
    } catch (err) {
      throw this._handleError(err);
    }
  }

  async approve(id) {
    try {
      const { data } = await this.client.post(`/applications/${id}/approve`);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  async reject(id) {
    try {
      const { data } = await this.client.post(`/applications/${id}/reject`);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }
}