import React from 'react'
import { connect } from 'react-redux'
import { Toggle, TimePicker, SelectField, MenuItem } from 'material-ui'
import {
  actionsChangeBusinessHours,
  actionsChangeOpenCloseDay
} from '../../actions/restaurantActions'
import config from '../../config'
import { string } from '../../helpers'

const { defaultValues } = config

class BusinessHours extends React.Component {
  constructor (props) {
    super(props)

    this.handleBusinessHoursToggle = this.handleBusinessHoursToggle.bind(this)
    this.handleTimePicker = this.handleTimePicker.bind(this)
    this.setDefaultTimes = this.setDefaultTimes.bind(this)
    this.handleOpenCloseDay = this.handleOpenCloseDay.bind(this)
  }

  handleBusinessHoursToggle (e, day) {
    const businessHours = this.props.businessHours
    const isEnabled = (e.target.getAttribute('data-enabled') === 'true')
    
    businessHours[day].enabled = (isEnabled !== true)

    this.props.dispatch(actionsChangeBusinessHours(businessHours))
  }

  handleTimePicker (type, day, date) {
    const { businessHours } = this.props
    const hours = string.zeroFill(date.getHours())
    const minutes = string.zeroFill(date.getMinutes())

    businessHours[day][type] = new Date(`1989/11/02 ${hours}:${minutes}:00`)

    this.props.dispatch(actionsChangeBusinessHours(businessHours))
  }

  setDefaultTimes (type, date) {
    const { businessHours, openCloseDay } = this.props
    const hours = string.zeroFill(date.getHours())
    const minutes = string.zeroFill(date.getMinutes())

    for (const day of Object.keys(businessHours)) {
      businessHours[day][type] = new Date(`1989/11/02 ${hours}:${minutes}:00`)
    }

    this.props.dispatch(actionsChangeBusinessHours(businessHours))

    openCloseDay[`${type}Time`] = `${hours}:${minutes}`
    this.props.dispatch(actionsChangeOpenCloseDay(openCloseDay))
  }

  handleOpenCloseDay (type, day) {
    const { openCloseDay } = this.props
    openCloseDay[type] = day
    this.props.dispatch(actionsChangeOpenCloseDay(openCloseDay))
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
          <div className="col-xs-12 margin-bottom-10">
            <div className="row">
              <div className="col-xs-12">
                <p style={{
                  marginBottom: '9px'
                }}>Set this times for everyday</p>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <SelectField
                  name="startDay"
                  floatingLabelText="Start Day"
                  fullWidth={true}
                  value={this.props.openCloseDay.open}
                  onChange={(e, _, value) => this.handleOpenCloseDay('open', value)}
                >
                  <MenuItem value="monday" primaryText="Monday" />
                  <MenuItem value="tuesday" primaryText="Tuesday" />
                  <MenuItem value="wednesday" primaryText="Wednesday" />
                  <MenuItem value="thursday" primaryText="Thursday" />
                  <MenuItem value="friday" primaryText="Friday" />
                  <MenuItem value="saturday" primaryText="Saturday" />
                  <MenuItem value="sunday" primaryText="Sunday" />
                </SelectField>
              </div>
              <div className="col-xs-6">
                <SelectField
                  name="endDay"
                  floatingLabelText="End Day"
                  fullWidth={true}
                  value={this.props.openCloseDay.close}
                  onChange={(e, _, value) => this.handleOpenCloseDay('close', value)}
                >
                  <MenuItem value="monday" primaryText="Monday" />
                  <MenuItem value="tuesday" primaryText="Tuesday" />
                  <MenuItem value="wednesday" primaryText="Wednesday" />
                  <MenuItem value="thursday" primaryText="Thursday" />
                  <MenuItem value="friday" primaryText="Friday" />
                  <MenuItem value="saturday" primaryText="Saturday" />
                  <MenuItem value="sunday" primaryText="Sunday" />
                </SelectField>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-6">
                <TimePicker
                  format="24hr"
                  hintText="Open time"
                  minutesStep={5}
                  fullWidth={true}
                  textFieldStyle={textFieldStyle}
                  autoOk={true}
                  value={new Date(this.props.businessHours.monday.open)}
                  onChange={(e, date) => this.setDefaultTimes('open', date)}
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
                  value={new Date(this.props.businessHours.monday.close)}
                  onChange={(e, date) => this.setDefaultTimes('close', date)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row hidden">
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
