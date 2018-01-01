import React from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { TextField, DatePicker } from 'material-ui'
import ButtonFacebookLogin from '../components/login/ButtonFacebookLogin'
import ButtonGoogleLogin from '../components/login/ButtonGoogleLogin'
import ButtonLogout from '../components/login/ButtonLogout'
import logo from '../images/logo.svg'

let queries = {}

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    queries = queryString.parse(props.location.search)

    this.state = {
      date: new Date(),
      name: 'Guest',
      form: {
        date: new Date(),
        name: ''
      }
    }

    this.nameChange = this.nameChange.bind(this)
    this.dateChange = this.dateChange.bind(this)
  }

  nameChange(event) {
    this.setState({
      form: {
        ...this.state.form,
        name: event.target.value
      }
    })
  }

  dateChange(event, value) {
    this.setState({
      form: {
        ...this.state.form,
        date: value
      }
    })
  }

  handleSubmit(event) {
    console.log('form ->', this.state.form)
    event.preventDefault()
  }

  render() {
    const { loggedIn } = this.props.user
    const LoginButton = (!loggedIn ? (
      <div className="social-login-buttons">
        <ButtonFacebookLogin />
        <ButtonGoogleLogin />
      </div>
    ) : <ButtonLogout />)

    return (
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.<br />
        </p>
        { Object.keys(queries).length > 0 ?
          <div className="queryString">{queries.google}</div> : undefined
        }
        {LoginButton}
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <label htmlFor="name">
                {!this.state.form.name ? 'enter your name' : `hello, ${this.state.form.name} how are you doing?` }
              </label>
              <br/>
              <TextField
                id="name"
                label="Name"
                value={this.state.form.name}
                onChange={this.nameChange}
                margin="normal"
              />
              <form onSubmit={this.handleSubmit.bind(this)}>
                <DatePicker
                  hintText="Controlled Date Input"
                  autoOk={true}
                  mode="landscape"
                  minDate={new Date('2017/12/10')}
                  maxDate={new Date('2018/01/10')}
                  onChange={this.dateChange}
                  value={this.state.form.date}
                />
                <input type="submit" value="Submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(HomePage)
