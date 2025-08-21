export function handleAuthError(response: Response, errorData: any): boolean {
  if (
    response.status === 401 ||
    response.status === 404 ||
    (errorData && (errorData.error === 'User not found' || errorData.error === 'Invalid user data'))
  ) {
    localStorage.removeItem('user');
    window.location.reload();
    return true;
  }
  return false;
} 