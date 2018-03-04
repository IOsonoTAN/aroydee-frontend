import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import App from './App'
import './styles/index.css'

// store.subscribe(() => {
//   console.log('stote changed ->', store.getState())
// })

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>
, document.getElementById('app'))

registerServiceWorker()
