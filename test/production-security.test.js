import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const read = (file) => fs.readFileSync(path.resolve(file), 'utf8');

test('Public GM access no longer grants authority by hard-coded email', () => {
  const source = read('lineage-idle/main.js');
  const app = read('src/App.tsx');
  const markup = read('src/idle/markup.ts');

  // Legacy email whitelist must be gone from the public client.
  assert.doesNotMatch(source, /AUTHORIZED_ADMIN_EMAILS/);
  assert.doesNotMatch(source, /duuh\.alaminos@gmail\.com|eduardol\.alaminos@gmail\.com/);
  assert.doesNotMatch(app, /duuh\.alaminos@gmail\.com|eduardol\.alaminos@gmail\.com/);

  // GM modal remains gated by isAuthorizedAdmin().
  assert.match(source, /function openAdminModal\(\) \{\s*if \(!isAuthorizedAdmin\(\)\)/);

  // Chat commands still reject users without local/dev authorization.
  assert.match(source, /if \(isAdminCmd\) \{\s*if \(!isAuthorizedAdmin\(\)\)/);

  // The public button is hidden by default and only follows current authorization state.
  assert.match(source, /adminBtn\.style\.display = isAuthorizedAdmin\(\) \? 'inline-flex' : 'none';/);
  assert.match(markup, /<button id="admin-top-btn" class="tb-btn tb-btn--admin" style="display:none;"/);

  // Server-wide destructive controls are not exposed in the local GM panel.
  assert.doesNotMatch(markup, /admin-wipe-database-btn|完整清空資料庫/);
});

test('isAuthorizedAdmin accepts only explicit local/dev authorization state', () => {
  function mockIsAuthorizedAdmin(mockWindow, devEnabled = false) {
    if (!mockWindow) return false;
    if (mockWindow.currentUserIsAdmin === true) return true;
    if (devEnabled) return true;
    return false;
  }

  assert.equal(mockIsAuthorizedAdmin(null), false);
  assert.equal(mockIsAuthorizedAdmin({}), false);
  assert.equal(mockIsAuthorizedAdmin({ currentUserIsAdmin: false }), false);
  assert.equal(mockIsAuthorizedAdmin({ currentUserEmail: 'random_player@gmail.com' }), false);
  assert.equal(mockIsAuthorizedAdmin({ currentUserIsAdmin: true }), true);
  assert.equal(mockIsAuthorizedAdmin({}, true), true);
});

test('Firestore rules do not grant server admin by legacy email or unrestricted authentication', () => {
  const rules = read('firestore.rules');

  assert.doesNotMatch(rules, /duuh\.alaminos@gmail\.com|eduardol\.alaminos@gmail\.com/);
  assert.match(rules, /function isServerAdmin\(\) \{\s*return isAuthenticated\(\)\s*&& \(\('admin' in request\.auth\.token\) && request\.auth\.token\.admin == true\);\s*\}/);

  assert.doesNotMatch(rules, /allow create, update, delete: if isAuthenticated\(\) \|\| isServerAdmin\(\);/);
  assert.doesNotMatch(rules, /allow write, delete: if isAuthenticated\(\) \|\| isServerAdmin\(\);/);
  assert.match(rules, /match \/server_meta\/\{docId\} \{\s*allow read: if isAuthenticated\(\);\s*allow write, delete: if isServerAdmin\(\);/);
});
