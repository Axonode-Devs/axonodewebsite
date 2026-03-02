# AxonConnector

Firebase-like API client for Axonode Backend.

## Setup

```javascript
import { initializeAxon, auth, admin, submitApplication } from 'axonconnector';

// Initialize once at app startup
initializeAxon({
  baseURL: 'https://api.example.com' // optional
});
```

## User Features

### Submit Application
```javascript
await submitApplication({
  email: 'user@example.com',
  name: 'John Doe',
  company: 'Acme',
  role: 'Developer'
});
```

### Activate Account (from email token)
```javascript
const token = new URLSearchParams(window.location.search).get('token');
await auth.setPassword(token, 'SecurePass123');
```

### Sign In
```javascript
const result = await auth.signInWithEmailPassword('user@example.com', 'password');
console.log(result.user);
```

### Check Auth Status
```javascript
if (auth.isSignedIn) {
  console.log('User logged in');
  console.log(auth.currentUser); // { id, email, role }
}
```

### Sign Out
```javascript
auth.signOut();
```

## Admin Features

### Login
```javascript
await admin.login('admin@example.com', 'password');
```

### List Applications
```javascript
const { applications, total, pages } = await admin.listApplications(page, perPage);
```

### Approve/Reject
```javascript
await admin.approveApplication(appId);
await admin.rejectApplication(appId);
```

### Manage Invites
```javascript
const { invite_link } = await admin.createInvite('John Doe');
await admin.revokeInvite(inviteId);
```

### Check Admin Status
```javascript
if (admin.isSignedIn) {
  console.log('Admin logged in');
  console.log(admin.currentUser); // { id, email, role }
}

if (admin.tokenExpired) {
  console.log('Need to login again');
}
```

### Sign Out
```javascript
admin.logout();
```

## Error Handling

All methods throw errors with this structure:
```javascript
{
  msg: 'Error message',
  status: 401,
  errors: [] // validation errors if any
}
```

Example:
```javascript
try {
  await auth.signInWithEmailPassword(email, password);
} catch (error) {
  console.error(error.msg); // "Invalid credentials"
  console.error(error.status); // 401
}
```

## Token Management

Tokens are automatically stored in localStorage:
- User: `axon_token`
- Admin: `axon_admintoken`

Manually access:
```javascript
const userToken = auth.getToken();
const adminToken = admin.getToken();
```

