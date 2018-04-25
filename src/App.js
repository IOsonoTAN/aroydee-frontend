import React, { Component } from 'react'
import Navigator from './components/Navigator'
import { HomePage, RestaurantList, RestaurantEdit, RestaurantCategories, RestaurantMenuList, Coupons } from './containers'
import { Route } from 'react-router-dom'
import './styles/App.css'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Navigator />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/restaurants" component={RestaurantList} />
        <Route exact path="/restaurants/add" component={RestaurantEdit} />
        <Route exact path="/restaurants/categories" component={RestaurantCategories} />
        <Route exact path="/restaurants/:restaurantId/edit" component={RestaurantEdit} />
        <Route exact path="/restaurants/:restaurantId/menus" component={RestaurantMenuList} />
        <Route exact path="/coupons" component={Coupons} />
      </div>
    )
  }
}

export default App
