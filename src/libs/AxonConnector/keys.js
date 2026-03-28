/**
 * axonode/keys.js
 * Central definition of every localStorage key used by the SDK.
 * Import from here — never hardcode a key string in a module file.
 */
export const KEYS = {
  // Regular user session
  userToken:   'axon_user_access',
  userRefresh: 'axon_user_refresh',
  userUser:    'axon_user_user',

  // Admin session
  adminToken:   'axon_admin_access',
  adminRefresh: 'axon_admin_refresh',
  adminUser:    'axon_admin_user',
};
