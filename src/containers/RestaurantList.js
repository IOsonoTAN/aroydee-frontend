import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { RestaurantList } from '../components'
import { apiUrl, appName } from '../config'
import { Link } from 'react-router-dom'
import { RaisedButton } from 'material-ui'
import Pagination from 'material-ui-pagination'

class Restaurants extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      restaurants: [],
      paginate: {
        page: 1,
        pages: 1,
        total: 1,
        limit: 1
      }
    }

    this.getRestaurants = this.getRestaurants.bind(this)
    this.handlePaginate = this.handlePaginate.bind(this)
  }

  async componentDidMount() {
    await this.getRestaurants()

    document.title = `Restaurant list - ${appName}`
  }

  async getRestaurants (page = 1) {
    const response = await axios.get(`${apiUrl}/cms/restaurants?page=${page}&sortBy=createdAt&orderBy=desc`)
    const { docs, page: currentPage, pages, limit, total } = response.data

    this.setState({
      ...this.state,
      restaurants: docs,
      paginate: {
        page: currentPage,
        pages,
        total,
        limit
      }
    })

    return docs
  }

  async handlePaginate (page) {
    this.getRestaurants(page)
  }

  render() {
    const pagination = this.state.paginate.pages > 1 &&
      <div className="col-xs-12">
        <Pagination
          total={this.state.paginate.pages}
          current={this.state.paginate.page}
          display={5}
          onChange={this.handlePaginate}
        />
      </div>

    return (
      <div className="container">
        <h1>Restaurant list</h1>
        <div className="button-controls">
          <RaisedButton label="Add new restaurant" containerElement={<Link to="restaurants/add" />} />
        </div>
        <hr />
        <div className="row pagination-top">
          {pagination}
        </div>
        <div className="row margin-bottom-10 margin-top-10">
          <div className="col-xs-12">
            <RestaurantList restaurants={this.state.restaurants} />
          </div>
        </div>
        <div className="row pagination-bottom">
          {pagination}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(Restaurants)
