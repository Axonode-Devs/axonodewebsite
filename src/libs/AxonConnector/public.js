/**
 * axonode/public.js — unauthenticated routes
 * No token is attached to any request in this module.
 */
export class PublicModule {
  /** @param {import('axios').AxiosInstance} client */
  constructor(client) {
    this._client = client;
  }

  /**
   * GET /api/v1/invites/<token>/validity
   * Validate an invite token before showing the registration form.
   * Does NOT consume the invite — consumption happens on submitApplication().
   *
   * @param   {string} token
   * @returns {{ id, note, expires_at }}
   */
  async checkInvite(token) {
    const { data } = await this._client.get(`/invites/${token}/validity`);
    return data.data;
  }

  /**
   * POST /api/v1/applications
   * Submit a membership application (with or without an invite token).
   *
   * @param   {object} payload — see ApplicationCreate schema on the server
   * @returns {object} created application
   */
  async submitApplication(payload) {
    const { data } = await this._client.post('/applications/', payload);
    return data.data;
  }

  /**
   * POST /api/v1/contact
   *
   * @param {{ name: string, email: string, message: string }} payload
   * @returns {{ message: string }}
   */
  async submitContact(payload) {
    const { data } = await this._client.post('/contact/', payload);
    return data.data;
  }
}
