import React from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import logo from '../images/logo.svg'

let queries = {}

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    queries = queryString.parse(props.location.search)

    console.log('queries ->', queries)

    this.state = {}
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      </div>
    )
  }
}

export default connect(state => state)(HomePage)
