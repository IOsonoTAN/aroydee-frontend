import React from 'react'
import { connect } from 'react-redux'
import { setLogOut } from '../../actions/userActions'

class ButtonLogout extends React.Component {
  onLogout() {
    this.props.dispatch(setLogOut())
  }

  render() {
    return <button onClick={this.onLogout.bind(this)}>Logout</button>
  }
}

export default connect(state => state)(ButtonLogout)
