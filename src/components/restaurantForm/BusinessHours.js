import React from 'react'
import { Toggle, TimePicker } from 'material-ui'
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
    const isToggled = ((e.target.getAttribute('data-toggled') === 'true') === false)
    const { businessHours, businessHoursOpen, businessHoursClose, restaurant } = this.state

    businessHours[day].enabled = isToggled
    businessHoursOpen[day].time = (businessHoursOpen[day].time ? businessHoursOpen[day].time : defaultValues.businessHours.open)
    businessHoursClose[day].time = (businessHoursClose[day].time ? businessHoursClose[day].time : defaultValues.businessHours.close)
    this.setState({
      businessHours,
      businessHoursOpen,
      businessHoursClose
    })

    for (const defaultDay of defaultValues.days) {
      restaurant.businessHours[defaultDay] = {
        enabled: (businessHours[defaultDay].enabled === true),
        open: (businessHoursOpen[day].time ? businessHoursOpen[day].time : defaultValues.businessHours.open),
        close: (businessHoursClose[day].time ? businessHoursClose[day].time : defaultValues.businessHours.close)
      }
    }
    this.setState({
      restaurant: {
        ...this.state.restaurant,
        businessHours: restaurant.businessHours
      }
    })
  }

  handleTimePicker (type, day, date) {
    const { businessHoursOpen, businessHoursClose, restaurant } = this.state
    const hours = string.zeroFill(date.getHours())
    const minutes = string.zeroFill(date.getMinutes())

    if (type === 'open') {
      businessHoursOpen[day].time = new Date(`1989/11/02 ${hours}:${minutes}:00`)
    } else {
      businessHoursClose[day].time = new Date(`1989/11/02 ${hours}:${minutes}:00`)
    }

    this.setState({
      restaurant: {
        ...this.state.restaurant,
        businessHoursOpen,
        businessHoursClose
      }
    })

    for (const defaultDay of defaultValues.days) {
      restaurant.businessHours[defaultDay].open = (businessHoursOpen[defaultDay].time ? businessHoursOpen[defaultDay].time : defaultValues.businessHours.open)
      restaurant.businessHours[defaultDay].close = (businessHoursClose[defaultDay].time ? businessHoursClose[defaultDay].time : defaultValues.businessHours.close)
    }
    this.setState({
      restaurant: {
        ...this.state.restaurant,
        businessHours: restaurant.businessHours
      }
    })
  }

  render () {
    return (
      <div className="wrapper">
        <h3>Business hours</h3>
        <div className="row">
          {defaultValues.days.map(day => {
            const businessHours = this.props.businessHours[day]
            const businessHoursOpen = this.props.businessHoursOpen[day]
            const businessHoursClose = this.props.businessHoursClose[day]
            const dataToggled = (businessHours ? businessHours.enabled : false)
            const defaultOpenTime = defaultValues.businessHours.open
            const defaultCloseTime = defaultValues.businessHours.close

            return (
              <div key={day}>
                <div className="col-xs-6 col-sm-4 margin-bottom-10">
                  <div className="row">
                    <div className="col-xs-12">
                      <Toggle
                        label={day}
                        onToggle={e => this.props.handleBusinessHoursToggle(e, day)}
                        toggled={dataToggled}
                        data-toggled={dataToggled}
                        ref={el => this.props.businessHours[day] = el}
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
                        textFieldStyle={{
                          fontSize: '14px',
                          height: '40px',
                          cursor: 'pointer'
                        }}
                        autoOk={true}
                        disabled={!dataToggled}
                        value={businessHoursOpen && businessHoursOpen.time ? businessHoursOpen.time : defaultOpenTime}
                        ref={el => this.props.businessHoursOpen[day] = el}
                        onChange={(e, date) => this.props.handleTimePicker('open', day, date)}
                      />
                    </div>
                    <div className="col-xs-6">
                      <TimePicker
                        format="24hr"
                        hintText="Close time"
                        minutesStep={5}
                        fullWidth={true}
                        textFieldStyle={{
                          fontSize: '14px',
                          height: '40px',
                          cursor: 'pointer'
                        }}
                        autoOk={true}
                        disabled={!dataToggled}
                        value={businessHoursClose && businessHoursClose.time ? businessHoursClose.time : defaultCloseTime}
                        ref={el => this.props.businessHoursClose[day] = el}
                        onChange={(e, date) => this.props.handleTimePicker('close', day, date)}
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

export default BusinessHours
