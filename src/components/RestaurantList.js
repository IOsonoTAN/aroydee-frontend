import React from 'react'
import { Link } from 'react-router-dom'
import { FlatButton, Divider } from 'material-ui'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'

export default class RestaurantList extends React.Component {
  render () {
    const { restaurants } = this.props

    return (
      <div className="restaurant-list">
        { restaurants.map(restaurant => {
            const { _id: objectId, description } = restaurant

            return (
              <div key={objectId} className="restaurant" id={objectId}>
                <Card>
                  <CardHeader
                    title={restaurant.title.th}
                    subtitle={restaurant.title.en}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardActions>
                    <FlatButton label="Edit" containerElement={<Link to={`/restaurants/${objectId}/edit`} />} />
                    <FlatButton label="Remove" containerElement={<Link to={`/restaurants/${objectId}/remove`} />} />
                  </CardActions>
                  <CardText expandable={true}>
                    {description.th}
                    {description.en}
                  </CardText>
                </Card>
                <Divider />
              </div>
            )
          })
        }
      </div>
    )
  }
}
