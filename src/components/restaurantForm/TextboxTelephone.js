import React from 'react'
import { connect } from 'react-redux'
import { actionsChangeTelephoneNumber } from '../../actions/restaurantActions'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import { FlatButton, TextField, RaisedButton } from 'material-ui'

class TextboxTelephone extends React.Component {
  constructor (props) {
    super(props)

    this.handleTelephoneAddField = this.handleTelephoneAddField.bind(this)
    this.handleTelephoneRemoveField = this.handleTelephoneRemoveField.bind(this)
    this.handleTelephonOnEnter = this.handleTelephonOnEnter.bind(this)
  }

  handleTelephoneAddField () {
    let { telephoneNumbers } = this.props
    if (!telephoneNumbers) {
      telephoneNumbers = ['']
    } else {
      telephoneNumbers.push('')
    }
    this.props.dispatch(actionsChangeTelephoneNumber(telephoneNumbers))
  }

  handleTelephoneRemoveField (i) {
    let { telephoneNumbers } = this.props
    delete telephoneNumbers[i]
    telephoneNumbers = telephoneNumbers.filter(telephone => telephone)
    this.props.dispatch(actionsChangeTelephoneNumber(telephoneNumbers))
  }

  handleTelephonOnEnter (e, i) {
    let { telephoneNumbers } = this.props
    telephoneNumbers[i] = e.target.value
    this.props.dispatch(actionsChangeTelephoneNumber(telephoneNumbers))
  }

  render () {
    return (
      <div className="wrapper">
        <h3>Telephone numbers</h3>
        <div className="telephone-numbers">
          {this.props.telephoneNumbers.map((number, i) => {
            return (
              <div key={i} className="number row">
                <div className="col-xs-8 col-sm-9 col-md-10">
                  <TextField
                    name="telephoneNumbers[]"
                    type="number"
                    floatingLabelText="Telephone number"
                    hintText="ex. 023456789"
                    fullWidth={true}
                    value={number}
                    tabIndex={i}
                    onChange={e => this.handleTelephonOnEnter(e, i)}
                  />
                </div>
                <div className="col-xs-4  col-sm-3 col-md-2">
                  <FlatButton
                    icon={<ContentRemoveCircle color='#CCCCCC' />}
                    fullWidth={true}
                    style={{ marginTop: '28px' }}
                    onClick={() => this.handleTelephoneRemoveField(i)}
                  />
                </div>
              </div>
            )
          })}
        </div>
        <RaisedButton style={{ marginTop: '10px' }} label="Add more telephone number" onClick={this.handleTelephoneAddField} />
      </div>
    )
  }
}

export default connect(state => state)(TextboxTelephone)
