import React from 'react'
import axios from 'axios'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentCreate from 'material-ui/svg-icons/content/create'
import ContentPaste from 'material-ui/svg-icons/content/content-paste'
import { Link } from 'react-router-dom'
import { FlatButton, Divider } from 'material-ui'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card'
import { apiUrl } from '../config'

export default class RestaurantList extends React.Component {
  constructor(props) {
    super(props)

    this.handleDelete.bind(this)
  }

  async handleDelete (objectId) {
    await axios.delete(`${apiUrl}/cms/restaurants`, {
      data: {
        objectId
      }
    })
  }

  render () {
    const { restaurants } = this.props

    return (
      <div className="restaurant-list">
        { restaurants.map(restaurant => {
            const { _id: objectId, description } = restaurant

            const title = restaurant.title.th
            const subtitle = ''
            const detail = (description && description.th ? description.th : '')

            return (
              <div key={objectId} className="restaurant" id={objectId}>
                <Card>
                  <CardHeader
                    title={title}
                    subtitle={subtitle}
                    actAsExpander={true}
                    showExpandableButton={true}
                  />
                  <CardActions>
                    <FlatButton
                      label="Edit"
                      labelPosition="after"
                      icon={<ContentCreate />}
                      containerElement={<Link to={`/restaurants/${objectId}/edit`} />}
                    />
                    <FlatButton
                      label="Menus"
                      labelPosition="after"
                      icon={<ContentPaste />}
                      containerElement={<Link to={`/restaurants/${objectId}/menus`} />}
                    />
                    <FlatButton
                      label="Delete"
                      labelPosition="after"
                      icon={<ContentRemoveCircle />}
                      onClick={e => this.handleDelete(objectId)}
                      containerElement={<Link to="#" />}
                      className="hidden"
                    />
                  </CardActions>
                  <CardText expandable={true}>
                    <p>{detail}</p>
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
