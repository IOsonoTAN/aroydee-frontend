import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Image } from 'cloudinary-react'
import { cloudinary } from '../../services'
import { actionsSetLoading, actionsChangePictures } from '../../actions/restaurantActions'

class PictureUploader extends React.Component {
  constructor(props) {
    super(props)

    this.handleUpload = this.handleUpload.bind(this)
  }

  async handleUpload ([file], moduleName) {
    this.props.dispatch(actionsSetLoading(true))

    let pictures = this.props.restaurantReducers.restaurant.pictures
    const picture = pictures[moduleName]

    const uploaded = await cloudinary.upload(file, 'restaurant')

    if (uploaded.public_id) {
      if (picture && picture.publicId) {
        cloudinary.destroy(picture.publicId)
      }

      picture.publicId = uploaded.public_id
      picture.alt = `${uploaded.original_filename}.${uploaded.format}`
      picture.url = uploaded.secure_url

      pictures = {
        ...pictures,
        [`${moduleName}`]: picture
      }

      this.props.dispatch(actionsChangePictures(pictures))

      this.props.dispatch(actionsSetLoading(false))

      this.props.requestSubmit(this.props.restaurantReducers.restaurant)
    }
  }

  render () {
    let { picture, moduleName, moduleDesc } = this.props

    moduleDesc = (!moduleDesc ? 'description of this picture' : moduleDesc)

    return (
      <div className="wrapper">
        <h4 style={{
          textTransform: 'capitalize'
        }}>{moduleName}</h4>
        <p><small>{moduleDesc}</small></p>
        <Dropzone
          onDrop={(accepted) => this.handleUpload(accepted, moduleName)}
          accept="image/*"
          className={`dropzone-uploader restaurant-${moduleName} margin-bottom-10`}
        >
          <p>drop or click to upload new logo</p>
        </Dropzone>
        {picture &&
          <Image
            cloudName={cloudinary.config.cloudName}
            publicId={picture.publicId}
            alt={picture.alt}
            crop="thumb"
            className={`img-responsive restaurant-${moduleName} img-center`}
          />
        }
      </div>
    )
  }
}

export default connect(state => state)(PictureUploader)
