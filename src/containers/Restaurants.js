import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { RestaurantList } from '../components'
import { apiUrl, appName } from '../config'
import { Link } from 'react-router-dom'
import { RaisedButton } from 'material-ui'

class Restaurants extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: []
    }
  }

  async componentDidMount() {
    const response = await axios.get(`${apiUrl}/cms/restaurants`)

    this.setState({
      restaurants: response.data.docs
    })

    document.title = `Restaurant list - ${appName}`
  }

  render() {
    return (
      <div className="container">
        <h1>Restaurant list</h1>
        <div className="button-controls">
          <RaisedButton label="Add new restaurant" containerElement={<Link to="restaurants/add" />} />
        </div>
        <hr />
        <div className="row">
          <div className="col-xs-12">
            <RestaurantList restaurants={this.state.restaurants} />
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Restaurants)
