export function storeUsername(username) {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem("june-username", JSON.stringify(username));
  }
}

export function getStoredUsername() {
  if (typeof sessionStorage !== 'undefined') {
    const stored = sessionStorage.getItem("june-username");
    return stored ? JSON.parse(stored) : null;
  }
  return null;
}
