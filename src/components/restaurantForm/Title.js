import React from 'react'
import { actionsChangeTitle } from '../../actions/restaurantActions'
import { connect } from 'react-redux'
import { TextField } from 'material-ui'

class Title extends React.Component {
  constructor (props) {
    super(props)

    this.handleTitle = this.handleTitle.bind(this)
  }

  handleTitle (name, title) {
    this.props.dispatch(actionsChangeTitle(name, title))
  }

  render() {
    const { title } = this.props

    return (
      <div className="row">
        <div className="col-sm-12">
          <TextField
            name="nameTH"
            type="text"
            hintText="Input title in thai"
            floatingLabelText="Title in Thai"
            fullWidth={true}
            defaultValue={title.th}
            onChange={e => this.handleTitle('th', e.target.value)}
          />
        </div>
        <div className="col-sm-6 hidden">
          <TextField
            name="nameEN"
            hintText="Input title in english"
            floatingLabelText="Title in English"
            fullWidth={true}
            defaultValue={title.en}
            onChange={e => this.handleTitle('en', e.target.value)}
          />
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Title)
