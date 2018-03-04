import React from 'react'
import { actionsChangeProvince, actionsChangeLocationLatLng, actionsChangeLocationTitle } from '../../actions/restaurantActions'
import { connect } from 'react-redux'
import { TextField, SelectField, MenuItem } from 'material-ui'

class MapLocation extends React.Component {
  constructor(props) {
    super(props)

    this.handleProvince = this.handleProvince.bind(this)
    this.handleLocationLatLng = this.handleLocationLatLng.bind(this)
    this.handleLocationTitle = this.handleLocationTitle.bind(this)
  }

  handleProvince (e, provinceId, province) {
    this.props.dispatch(actionsChangeProvince(province))
  }

  handleLocationLatLng (e, latLng) {
    this.props.dispatch(actionsChangeLocationLatLng(e.target.name, latLng))
  }

  handleLocationTitle (e) {
    this.props.dispatch(actionsChangeLocationTitle(e.target.value))
  }

  render () {
    let { province } = this.props

    province = (!province ? '' : province)

    return (
      <div className="wrapper">
        <h3>Maps & Location</h3>
        <div className="row">
          <div className="col-xs-12">
            <SelectField
              name="province"
              floatingLabelText="Province"
              value={province}
              fullWidth={true}
              onChange={this.handleProvince}
            >
              {this.props.provinces.map((province, i) => {
                return <MenuItem key={i} value={`${province._id}`} primaryText={`${province.title.th} (${province.title.en})`} />
              })}
            </SelectField>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            <TextField
              name="title"
              type="text"
              floatingLabelText="Enter Title"
              hintText="Enter title of location, ex. Soi Samyan 12"
              fullWidth={true}
              value={this.props.locationInfo.title}
              onChange={this.handleLocationTitle}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6">
            <TextField
              name="latitude"
              type="number"
              step="0.01"
              floatingLabelText="Enter Latitude"
              fullWidth={true}
              value={this.props.locationInfo.latitude}
              onChange={this.handleLocationLatLng}
            />
          </div>
          <div className="col-xs-6">
            <TextField
              name="longitude"
              type="number"
              step="0.01"
              floatingLabelText="Enter Longitude"
              fullWidth={true}
              value={this.props.locationInfo.longtitude}
              onChange={this.handleLocationLatLng}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(MapLocation)
