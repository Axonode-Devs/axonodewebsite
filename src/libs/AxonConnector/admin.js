export class AdminModule {
  constructor(client, handleError) {
    this.client = client;
    this._handleError = handleError;
  }

  async login(email, password) {
    try {
      // Endpoint: admin.py -> /sessions
      const { data } = await this.client.post("/admin/sessions", {
        email,
        password,
      });
      const adminData = data.data;

      if (adminData.access_token) {
        localStorage.setItem("axon_admintoken", adminData.access_token);
      }
      if (adminData.refresh_token) {
        localStorage.setItem("axon_admin_refresh", adminData.refresh_token);
      }
      if (adminData.user) {
        localStorage.setItem("axon_admin_user", JSON.stringify(adminData.user));
      }
      return adminData;
    } catch (err) {
      throw this._handleError(err);
    }
  }
  /**
   * Check if an invite token is valid (Public Route)
   */
  async checkInvite(token) {
    try {
      // Matches the route in public.py: /api/invites/<token>/validity
      const { data } = await this.client.get(`/invites/${token}/validity`);
      return data.data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  get isTokenExpired() {
    return false;
  }
  logout() {
    localStorage.removeItem("axon_admintoken");
    localStorage.removeItem("axon_admin_refresh");
    localStorage.removeItem("axon_admin_user");
  }

  // ============ Applications ============

  async listApplications(params = {}) {
    try {
      // Endpoint: applications.py -> GET /
      const { data } = await this.client.get("/applications/", { params });
      return data; // returns { data: [], meta: {} }
    } catch (err) {
      throw this._handleError(err);
    }
  }

  /**
   * Status transitions: applications.py -> PATCH /<id>
   */
  async approveApplication(id) {
    try {
      const { data } = await this.client.patch(`/applications/${id}`, {
        status: "approved",
      });
      return data.data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  async rejectApplication(id) {
    try {
      const { data } = await this.client.patch(`/applications/${id}`, {
        status: "rejected",
      });
      return data.data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  // ============ Invites ============

  async createInvite(note = "General Invite") {
    try {
      // Endpoint: admin.py -> POST /invites
      const { data } = await this.client.post("/admin/invites", { for: note });
      return data.data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  async listInvites(params = {}) {
    try {
      // Endpoint: admin.py -> GET /invites
      const { data } = await this.client.get("/admin/invites", { params });
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }

  async revokeInvite(id) {
    try {
      // Endpoint: admin.py -> POST /invites/<id>/revoke
      const { data } = await this.client.post(`/admin/invites/${id}/revoke`);
      return data;
    } catch (err) {
      throw this._handleError(err);
    }
  }
}
