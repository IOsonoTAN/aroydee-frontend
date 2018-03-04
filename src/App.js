import React, { Component } from 'react'
import Navigator from './components/Navigator'
import { HomePage, Restaurants, RestaurantEdit, Coupons } from './containers'
import { Route } from 'react-router-dom'
import './styles/App.css'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navigator />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/restaurants" component={Restaurants} />
        <Route exact path="/restaurants/add" component={RestaurantEdit} />
        <Route exact path="/restaurants/:restaurantId/edit" component={RestaurantEdit} />
        <Route exact path="/coupons" component={Coupons} />
      </div>
    )
  }
}

export default App
