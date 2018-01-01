export const setLoggedIn = (payload) => {
  localStorage.setItem('isLoggedIn', true)
  return {
    type: 'LOGGED_IN',
    payload
  }
}

export const setLogOut = () => {
  localStorage.removeItem('isLoggedIn')
  return {
    type: 'LOGOUT'
  }
}
