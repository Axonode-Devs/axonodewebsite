/**
 * axonode/admin.js — admin authentication + management routes
 */
export class AdminModule {
  /**
   * @param {import('axios').AxiosInstance} client
   * @param {import('./keys.js').KEYS} keys
   */
  constructor(client, keys) {
    this._client = client;
    this._keys   = keys;
  }

  // Attach admin token + refresh key to every outgoing request config.
  _cfg() {
      return {
      _tokenKey:   this._keys.userToken,   // Use 'access_token'
      _refreshKey: this._keys.userRefresh, // Use 'refresh_token'
    };
  }

  // ── Applications ─────────────────────────────────────────────────────────

  /**
   * GET /api/v1/applications
   *
   * @param {object} [params]
   * @param {string} [params.status]        "pending"|"invited"|"approved"|"rejected"
   * @param {string} [params.search]
   * @param {string} [params.search_field]  "fullname"|"email"
   * @param {string} [params.sort_by]       "created_at"|"fullname"|"email"|"status"
   * @param {string} [params.order]         "asc"|"desc"
   * @param {string} [params.from_date]     ISO date e.g. "2024-01-01"
   * @param {string} [params.to_date]       ISO date e.g. "2024-12-31"
   * @param {number} [params.page]
   * @param {number} [params.per_page]
   * @returns {{ data: object[], meta: { total, pages, page, per_page } }}
   */
  async listApplications(params = {}) {
    const { data } = await this._client.get(
      '/applications/',
      { ...this._cfg(), params },
    );
    return data;
  }

  /**
   * PATCH /api/v1/applications/<id>
   * @param   {number} id
   * @returns {object} updated application
   */
  async approveApplication(id) {
    const { data } = await this._client.patch(
      `/applications/${id}`,
      { status: 'approved' },
      this._cfg(),
    );
    return data.data;
  }

  /**
   * PATCH /api/v1/applications/<id>
   * @param   {number} id
   * @returns {object} updated application
   */
  async rejectApplication(id) {
    const { data } = await this._client.patch(
      `/applications/${id}`,
      { status: 'rejected' },
      this._cfg(),
    );
    return data.data;
  }
  async createInvite(note) {
    // If 'note' is an object {note: '...'}, extract the string
    const noteText = typeof note === 'object' ? note.note : note;
    
    const { data } = await this._client.post(
      '/admin/invites',
      { note: noteText || 'General Invite' },
      this._cfg(),
    );
    return data.data;
  }
  // ── Invites ──────────────────────────────────────────────────────────────

  /**
   * GET /api/v1/admin/invites
   *
   * @param {object} [params]
   * @param {string} [params.status]    "active"|"used"|"revoked"|"expired"
   * @param {string} [params.sort_by]   "created_at"|"expires_at"
   * @param {string} [params.order]     "asc"|"desc"
   * @param {number} [params.page]
   * @param {number} [params.per_page]
   * @returns {{ data: object[], meta: { total, pages, page, per_page } }}
   */
  async listInvites(params = {}) {
    const { data } = await this._client.get(
      '/admin/invites',
      { ...this._cfg(), params },
    );
    return data;
  }

  /**
   * POST /api/v1/admin/invites
   * @param   {string} [note]
   * @returns {object} created invite, includes invite_link
   */
  async createInvite(note = 'General Invite') {
    const { data } = await this._client.post(
      '/admin/invites',
      note,
      this._cfg(),
    );
    return data.data;
  }

  /**
   * PATCH /api/v1/admin/invites/<id>
   * @param   {number} id
   * @returns {object} updated invite
   */
  async revokeInvite(id) {
    const { data } = await this._client.patch(
      `/admin/invites/${id}`,
      { revoked: true },
      this._cfg(),
    );
    return data.data;
  }

  _saveSession({ access_token, refresh_token, user }) {
    if (access_token)  localStorage.setItem(this._keys.adminToken,   access_token);
    if (refresh_token) localStorage.setItem(this._keys.adminRefresh, refresh_token);
    if (user)          localStorage.setItem(this._keys.adminUser,    JSON.stringify(user));
  }
}
