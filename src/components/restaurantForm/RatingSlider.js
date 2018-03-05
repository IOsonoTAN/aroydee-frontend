import React from 'react'
import { connect } from 'react-redux'
import { actionsChangeRating } from '../../actions/restaurantActions'
import { Slider } from 'material-ui'

class RatingSlider extends React.Component {
  constructor(props) {
    super(props)

    this.handleRatingSlider = this.handleRatingSlider.bind(this)
  }

  handleRatingSlider (e, rating) {
    this.props.dispatch(actionsChangeRating(rating))
  }

  render () {
    let { rating } = this.props

    rating = (!rating ? 0 : rating)

    return (
      <div className="rating-slider">
        <div className="field-title">Rating ({rating})</div>
        <Slider
          name="rating"
          className="rating"
          onChange={this.handleRatingSlider}
          max={5}
          min={0}
          step={0.1}
          defaultValue={rating}
          sliderStyle={{
            marginBottom: 0,
            marginTop: '17px'
          }}
        />
      </div>
    )
  }
}

export default connect(state => state)(RatingSlider)
