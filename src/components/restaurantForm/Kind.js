import React from 'react'
import { connect } from 'react-redux'
import { actionsChangeKind } from '../../actions/restaurantActions'
import { TextField } from 'material-ui'

class Kind extends React.Component {
  constructor(props) {
    super(props)

    this.handleKind = this.handleKind.bind(this)
  }

  handleKind (kind) {
    this.props.dispatch(actionsChangeKind(kind))
  }

  render() {
    const { kind } = this.props

    return (
      <TextField
        name="kind"
        hintText="Enter kind of restaurant"
        floatingLabelText="Kind"
        fullWidth={true}
        defaultValue={kind}
        onChange={e => this.handleKind(e.target.value)}
      />
    )
  }
}

export default connect(state => state)(Kind)
