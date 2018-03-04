import React from 'react'
import { actionsChangeDescription } from '../../actions/restaurantActions'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'

class Description extends React.Component {
  constructor (props) {
    super(props)

    this.handleDescription = this.handleDescription.bind(this)
  }

  handleDescription (lang, value) {
    this.props.dispatch(actionsChangeDescription(lang, value))
  }

  render() {
    let { description } = this.props
    if (!description) {
      description = {
        th: '',
        en: ''
      }
    }

    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6">
          <TextField
            name="description"
            type="text"
            hintText="Input description in thai"
            floatingLabelText="Description in Thai"
            fullWidth={true}
            multiLine={true}
            rows={4}
            rowsMax={8}
            defaultValue={description.th}
            onChange={e => this.handleDescription('th', e.target.value)}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-6">
          <TextField
            name="description"
            type="text"
            hintText="Input description in english"
            floatingLabelText="Description in English"
            fullWidth={true}
            multiLine={true}
            rows={4}
            rowsMax={8}
            defaultValue={description.en}
            onChange={e => this.handleDescription('en', e.target.value)}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Description)
