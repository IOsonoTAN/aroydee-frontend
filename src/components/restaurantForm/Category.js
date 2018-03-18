import React from 'react'
import { connect } from 'react-redux'
import { actionsChangeCategory } from '../../actions/restaurantActions'
import { SelectField, MenuItem } from 'material-ui'

class Category extends React.Component {
  constructor (props) {
    super(props)

    this.handleCategory = this.handleCategory.bind(this)
  }

  handleCategory (e, key, categoryId) {
    this.props.dispatch(actionsChangeCategory(categoryId))
  }

  render () {
    const { categories, category } = this.props

    return (
      <SelectField
        name="category"
        floatingLabelText="Category"
        value={category}
        fullWidth={true}
        onChange={this.handleCategory}
      >
        <MenuItem value={undefined} primaryText="No category" />
        {categories.map((category, key) => {
          return <MenuItem key={key} value={category._id} primaryText={`${category.title.th} (${category.title.en})`} />
        })}
      </SelectField>
    )
  }
}

export default connect(state => state)(Category)
