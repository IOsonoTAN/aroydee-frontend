import React from 'react'
import GoogleLogin from 'react-google-login'
import { connect } from 'react-redux'
import { setLoggedIn } from '../../actions/userActions'
import config from '../../config'

const { google } = config.account

class ButtonGoogleLogin extends React.Component {
  responseLogin(response) {
    this.props.dispatch(setLoggedIn(response))
  }

  responseFail(response) {
    console.log('response ->', response)
  }

  render() {
    return (
      <GoogleLogin
        clientId={google.clientId}
        buttonText="Login With Google"
        onSuccess={this.responseLogin.bind(this)}
        onFailure={this.responseFail.bind(this)} />
    )
  }
}

export default connect(state => state)(ButtonGoogleLogin)
