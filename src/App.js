import React, { Component } from 'react'
import Navigator from './components/Navigator'
import HomePage from './containers/HomePage'
import { Route } from 'react-router-dom'
import './styles/App.css'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navigator />
        <Route exact path="/" component={HomePage} />
      </div>
    )
  }
}

export default App
