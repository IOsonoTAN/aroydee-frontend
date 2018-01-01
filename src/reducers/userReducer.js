const isLoggedIn = localStorage.getItem('isLoggedIn')
const loggedIn = (isLoggedIn === "true" ? true : false)

const stateDefaults = {
  data: {},
  loggedIn,
  fetching: false,
  fetched: false,
  error: null
}

export default (state = stateDefaults, action) => {
  switch (action.type) {
    case "LOGGED_IN": {
      return { ...state,
        loggedIn: true,
        data: action.payload
      }
    }
    case "LOGIN_ERROR": {
      return { ...state,
        error: action.error
      }
    }
    case "LOGOUT": {
      return {
        ...state,
        loggedIn: false,
        data: {}
      }
    }
    default:
      return state
  }
}
