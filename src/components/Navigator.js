import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Drawer, MenuItem, Divider } from 'material-ui'
import config from '../config'

const { appName } = config

class Navigator extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sidebarMenuOpen: false
    }
  }

  render () {
    const styles = {
      title: {
        textAlign: 'left'
      },
      menus: {
        textAlign: 'left'
      }
    }

    const handleSidebarMenu = response => {
      this.setState({
        sidebarMenuOpen: !this.state.sidebarMenuOpen
      })
    }

    const sidebarMenu = (
      <Drawer
        className="sidebarMenu"
        docked={false}
        open={this.state.sidebarMenuOpen}
        onRequestChange={sidebarMenuOpen => this.setState({ sidebarMenuOpen })}
      >
        <div style={styles.menus}>
          <MenuItem primaryText="Dashboard" containerElement={<Link to="/" />} />
          <MenuItem primaryText="Restaurants" containerElement={<Link to="/restaurants" />} />
          <MenuItem primaryText="Coupons" containerElement={<Link to="/coupons" />} />
          <Divider />
          <MenuItem primaryText="Sign out" containerElement={<Link to="/logout" />} />
        </div>
      </Drawer>
    )

    return (
      <div>
        <AppBar
          title={appName}
          titleStyle={styles.title}
          iconClassNameRight="muidocs-iconstyles.title-navigation-expand-more"
          onLeftIconButtonClick={handleSidebarMenu}
        />
        {sidebarMenu}
      </div>
    )
  }
}

export default Navigator
