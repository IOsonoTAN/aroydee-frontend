import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { connect } from 'react-redux'
import { setLoggedIn } from '../../actions/userActions'
import config from '../../config'

const { facebook } = config.account

class ButtonFacebookLogin extends React.Component {
  responseLogin(response) {
    this.props.dispatch(setLoggedIn(response))
  }

  render() {
    return (
      <FacebookLogin
        appId={facebook.appId}
        autoLoad={facebook.autoLoad}
        fields={facebook.fields}
        callback={this.responseLogin.bind(this)} />
    )
  }
}

export default connect(state => state)(ButtonFacebookLogin)
