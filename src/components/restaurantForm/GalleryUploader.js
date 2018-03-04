import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Image } from 'cloudinary-react'
import { cloudinary } from '../../services'
import { actionsSetLoading, actionsChangeGallery } from '../../actions/restaurantActions'

class GalleryUploader extends React.Component {
  constructor(props) {
    super(props)

    this.handleUpload = this.handleUpload.bind(this)
    this.handleRemovePicture = this.handleRemovePicture.bind(this)
  }

  async handleUpload (files, moduleName) {
    this.props.dispatch(actionsSetLoading(true))
    for (const file of files) {
      const gallery = this.props.restaurantReducers.restaurant.gallery
      const uploaded = await cloudinary.upload(file, 'restaurant')
      if (uploaded.public_id) {
        gallery.push({
          publicId: uploaded.public_id,
          alt: `${uploaded.original_filename}.${uploaded.format}`,
          url: uploaded.secure_url
        })
        this.props.dispatch(actionsChangeGallery(gallery))
      }
    }
    this.props.dispatch(actionsSetLoading(false))
    this.props.requestSubmit(this.props.restaurantReducers.restaurant)
  }

  async handleRemovePicture (publidId) {
    if (window.confirm('Do you want to remove this picture?')) {
      this.props.dispatch(actionsSetLoading(true))
      let gallery = this.props.restaurantReducers.restaurant.gallery
      await cloudinary.destroy(publidId)
      gallery = gallery.filter(picture => picture.publicId !== publidId)
      this.props.dispatch(actionsChangeGallery(gallery))
      this.props.dispatch(actionsSetLoading(false))
      this.props.requestSubmit(this.props.restaurantReducers.restaurant)
    }
  }

  render () {
    let { gallery, moduleName, moduleDesc } = this.props

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
          <p>drop or click to upload new picture into gallery</p>
        </Dropzone>
        <div className="row">
          {gallery.map((picture, i) => {
            return (
              <div className="col-xs-6" key={i}>
                <Image
                  cloudName={cloudinary.config.cloudName}
                  publicId={picture.publicId}
                  alt={picture.alt}
                  crop="thumb"
                  className={`img-responsive restaurant-${moduleName} img-center margin-bottom-10`}
                  onClick={e => this.handleRemovePicture(picture.publicId)}
                />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(GalleryUploader)
