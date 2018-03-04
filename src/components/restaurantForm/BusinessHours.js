import React from 'react'
import { connect } from 'react-redux'
import { Toggle, TimePicker } from 'material-ui'
import { actionsChangeBusinessHours } from '../../actions/restaurantActions'
import config from '../../config'
import { string } from '../../helpers'

const { defaultValues } = config

class BusinessHours extends React.Component {
  constructor (props) {
    super(props)

    this.handleBusinessHoursToggle = this.handleBusinessHoursToggle.bind(this)
    this.handleTimePicker = this.handleTimePicker.bind(this)
  }

  handleBusinessHoursToggle (e, day) {
    const businessHours = this.props.businessHours
    const isEnabled = (e.target.getAttribute('data-enabled') === 'true')
    
    businessHours[day].enabled = (isEnabled !== true)

    this.props.dispatch(actionsChangeBusinessHours(businessHours))
  }

  handleTimePicker (type, day, date) {
    const businessHours = this.props.businessHours
    const hours = string.zeroFill(date.getHours())
    const minutes = string.zeroFill(date.getMinutes())

    businessHours[day][type] = new Date(`1989/11/02 ${hours}:${minutes}:00`)

    this.props.dispatch(actionsChangeBusinessHours(businessHours))
  }

  render () {
    const textFieldStyle = {
      fontSize: '14px',
      height: '40px',
      cursor: 'pointer'
    }

    return (
      <div className="wrapper">
        <h3>Business hours</h3>
        <div className="row">
          {defaultValues.days.map(day => {
            const dayHours = this.props.businessHours[day]
            const isEnabled = dayHours.enabled
            const openHours = (typeof dayHours.open === 'string' ? new Date(dayHours.open) : dayHours.open)
            const closeHours = (typeof dayHours.close === 'string' ? new Date(dayHours.close) : dayHours.close)

            return (
              <div key={day}>
                <div className="col-xs-6 col-sm-4 margin-bottom-10">
                  <div className="row">
                    <div className="col-xs-12">
                      <Toggle
                        label={day}
                        onToggle={e => this.handleBusinessHoursToggle(e, day)}
                        toggled={isEnabled}
                        data-enabled={isEnabled}
                        style={{
                          textTransform: 'capitalize'
                        }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <TimePicker
                        format="24hr"
                        hintText="Open time"
                        minutesStep={5}
                        fullWidth={true}
                        textFieldStyle={textFieldStyle}
                        autoOk={true}
                        disabled={!isEnabled}
                        value={openHours}
                        onChange={(e, date) => this.handleTimePicker('open', day, date)}
                      />
                    </div>
                    <div className="col-xs-6">
                      <TimePicker
                        format="24hr"
                        hintText="Close time"
                        minutesStep={5}
                        fullWidth={true}
                        textFieldStyle={textFieldStyle}
                        autoOk={true}
                        disabled={!isEnabled}
                        value={closeHours}
                        onChange={(e, date) => this.handleTimePicker('close', day, date)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(BusinessHours)
