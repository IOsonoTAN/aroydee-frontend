import React from 'react'
import { connect } from 'react-redux'
import { actionsChangeType } from '../../actions/restaurantActions'
import { SelectField, MenuItem } from 'material-ui'

class Type extends React.Component {
  constructor(props) {
    super(props)

    this.handleType = this.handleType.bind(this)
  }

  handleType (e, key, type) {
    this.props.dispatch(actionsChangeType(type))
  }

  render () {
    let { type } = this.props

    return (
      <SelectField
        name="type"
        floatingLabelText="Type"
        value={type}
        fullWidth={true}
        onChange={this.handleType}
      >
        <MenuItem value="normal" primaryText="Normal" />
        <MenuItem value="recommended" primaryText="Recommended" />
      </SelectField>
    )
  }
}

export default connect(state => state)(Type)

