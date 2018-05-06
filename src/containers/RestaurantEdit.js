import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Snackbar } from 'material-ui'
import {
  actionsSetInitState,
  actionsSetLoading,
  actionsSetCanEdit,
  actionsIsNewObject
} from '../actions/restaurantActions'
import {
  BusinessHours,
  Category,
  Description,
  GalleryUploader,
  Kind,
  MapLocation,
  PictureUploader,
  RatingSlider,
  TextboxTelephone,
  Title,
  Type
} from '../components/restaurantForm'
import Loading from '../components/Loading'
import ButtonControllers from '../components/ButtonControllers'
import { apiUrl, appName } from '../config'
import defaultRestaurant from '../reducers/defaults/restaurant'

class RestaurantEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dialog: {
        status: false,
        title: null,
        message: null,
        redirect: null
      },
      provinces: [],
      categories: [],
      title: ''
    }

    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.requestSubmit = this.requestSubmit.bind(this)
  }

  async componentDidMount () {
    try {
      this.props.dispatch(actionsSetLoading(true))
      this.props.dispatch(actionsSetCanEdit(false))

      const { restaurantId } = this.props.match.params
      const getQueries = [axios.get(`${apiUrl}/cms/provinces`), axios.get(`${apiUrl}/cms/restaurants/categories`)]
      if (restaurantId) {
        getQueries.push(axios.get(`${apiUrl}/cms/restaurants/${restaurantId}`))
      }
      const [provinces, categories, restaurant] = await Promise.all(getQueries)
      const isNewObject = !restaurant
      const title = (isNewObject ? 'Add new restaurant' : `Edit restaurant ${restaurant.data.data.title.th}`)

      this.setState({
        provinces: provinces.data.data,
        categories: categories.data.data.docs,
        title
      })

      if (restaurant && restaurant.data && restaurant.data.data) {
        this.props.dispatch(actionsSetInitState(restaurant.data.data))
      } else if (isNewObject) {
        this.props.dispatch(actionsIsNewObject(true))
        this.props.dispatch(actionsSetInitState(defaultRestaurant))
      }

      setTimeout(() => {
        this.props.dispatch(actionsSetLoading(false))
        this.props.dispatch(actionsSetCanEdit(true))
      }, 1500)

      document.title = `${title} - ${appName}`
    } catch (e) {
      console.error('e ->', e.stack)
      this.setState({
        ...this.state,
        dialog: {
          status: true,
          title: 'Get restaurant got error',
          message: e.stack,
          redirect: '/restaurants'
        }
      })
    }
  }

  async requestSubmit (formBody, openCloseDay = null) {
    try {
      delete formBody.businessHoursOpen
      delete formBody.businessHoursClose

      this.props.dispatch(actionsSetLoading(true))

      if (openCloseDay) {
        formBody.openCloseDay = openCloseDay
      }

      if (this.props.restaurantReducers.isNewObject) {
        const created = await axios.post(`${apiUrl}/cms/restaurants`, formBody)
        const restaurant = created.data.data

        this.props.dispatch(actionsSetInitState(restaurant))

        this.props.dispatch(actionsIsNewObject(false))
      } else {
        await axios.put(`${apiUrl}/cms/restaurants/${formBody._id}`, formBody)
      }
      this.props.dispatch(actionsSetLoading(false))

      this.setState({
        ...this.state,
        dialog: {
          status: true,
          title: 'Information',
          message: 'Data has been saved'
        }
      })

      setTimeout(() => {
        this.setState({
          ...this.state,
          dialog: {
            status: false
          }
        })
      }, 2000)
    } catch (err) {
      this.props.dispatch(actionsSetLoading(false))

      this.setState({
        ...this.state,
        dialog: {
          status: true,
          title: 'Save error',
          message: err.stack
        }
      })
    }
  }

  async handleSubmit (e) {
    e.preventDefault()
    const {
      restaurant,
      openCloseDay
    } = this.props.restaurantReducers
    this.requestSubmit(restaurant, openCloseDay)
  }

  handleDialogClose () {
    this.setState({
      ...this.state,
      dialog: {
        status: false
      }
    })
    if (this.state.dialog.redirect) {
      window.location.href = this.state.dialog.redirect
    }
  }

  render () {
    const title = this.props.restaurantReducers.restaurant.title
    const pictures = this.props.restaurantReducers.restaurant.pictures

    return (
      <div className="container">
        {this.props.restaurantReducers.canEdit &&
          <div className="card-box">
            <h1>{this.state.title}</h1>
            <form onSubmit={this.handleSubmit}>
              <ButtonControllers
                loading={this.props.restaurantReducers.loading}
                backUrl='/restaurants'
              /><hr />
              <h3>Information</h3>
              <Title title={title} />
              <Description description={this.props.restaurantReducers.restaurant.description} />
              <div className="row">
                <div className="col-sm-3">
                  <Category categories={this.state.categories} category={this.props.restaurantReducers.restaurant.category} />
                </div>
                <div className="col-sm-3">
                  <Kind kind={this.props.restaurantReducers.restaurant.kind} />
                </div>
                <div className="col-sm-3">
                  <Type type={this.props.restaurantReducers.restaurant.type} />
                </div>
                <div className="col-sm-3">
                  <RatingSlider rating={this.props.restaurantReducers.restaurant.rating} />
                </div>
              </div>
              <div className="row">
                <div className="col-sm-7">
                  <MapLocation
                    provinces={this.state.provinces}
                    province={this.props.restaurantReducers.restaurant.province}
                    locationInfo={this.props.restaurantReducers.restaurant.locationInfo}
                  />
                </div>
                <div className="col-sm-5">
                  <TextboxTelephone telephoneNumbers={this.props.restaurantReducers.restaurant.telephone} />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xs-12">
                  <BusinessHours
                    restaurant={this.props.restaurantReducers.restaurant}
                    businessHours={this.props.restaurantReducers.restaurant.businessHours}
                    openCloseDay={this.props.restaurantReducers.openCloseDay}
                  />
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-xs-12"><h3>Pictures</h3></div>
                <div className="col-xs-12 col-sm-3">
                  <PictureUploader
                    moduleName='logo'
                    picture={pictures.logo}
                    requestSubmit={this.requestSubmit}
                  />
                </div>
                <div className="col-xs-12 col-sm-3">
                  <PictureUploader
                    moduleName='feature'
                    picture={pictures.feature}
                    requestSubmit={this.requestSubmit}
                  />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <GalleryUploader
                    moduleName='gallery'
                    gallery={this.props.restaurantReducers.restaurant.gallery}
                    requestSubmit={this.requestSubmit}
                  />
                </div>
              </div>
              <hr />
              <ButtonControllers
                loading={this.props.restaurantReducers.loading}
                backUrl='/restaurants'
              />
            </form>
          </div>
        }
        <Loading
          open={this.props.restaurantReducers.loading}
        />
        {this.state.dialog.status > 0 &&
          <Snackbar
            open={this.state.dialog.status}
            message={this.state.dialog.message}
            autoHideDuration={4000}
          />
        }
      </div>
    )
  }
}

export default connect(state => state)(RestaurantEdit)
