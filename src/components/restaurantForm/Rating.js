import React from 'react'
import { Slider } from 'material-ui'

const Rating = ({ rating, handleRatingSlider }) => {
  const styles = {
    marginBottom: 0,
    marginTop: '17px'
  }

  return (
    <div className="rating-slider">
      <div className="field-title">Rating ({rating})</div>
      <Slider
        name="rating"
        className="rating"
        onChange={handleRatingSlider}
        max={5}
        min={0}
        step={1}
        defaultValue={rating}
        sliderStyle={styles}
      />
    </div>
  )
}

export default Rating
