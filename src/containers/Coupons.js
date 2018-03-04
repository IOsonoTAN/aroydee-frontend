import React from 'react'
import { connect } from 'react-redux'

class Coupons extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div>
        Coupons
      </div>
    )
  }
}

export default connect(state => state)(Coupons)
