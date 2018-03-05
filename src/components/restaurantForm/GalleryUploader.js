import React from 'react'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import { Image } from 'cloudinary-react'
import { cloudinary } from '../../services'
import { actionsSetLoading, actionsChangeGallery } from '../../actions/restaurantActions'
import ActionDelete from 'material-ui/svg-icons/action/delete'

class GalleryUploader extends React.Component {
  constructor(props) {
    super(props)

    this.handleUpload = this.handleUpload.bind(this)
    this.handleRemovePicture = this.handleRemovePicture.bind(this)
  }

  async handleUpload (files, moduleName) {
    this.props.dispatch(actionsSetLoading(true))
    for (const file of files) {
      const gallery = this.props.restaurantReducers.restaurant.gallery || []
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

  async handleRemovePicture (e, publidId) {
    e.preventDefault()

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
    let { gallery, moduleDesc } = this.props

    moduleDesc = (!moduleDesc ? 'description of this picture' : moduleDesc)

    let pictures = null
    if (gallery && gallery.length > 0) {
      pictures = gallery.map((picture, i) => {
        return (
          <div className="col-xs-3 gallery-picture" key={i}>
            <Image
              cloudName={cloudinary.config.cloudName}
              publicId={picture.publicId}
              alt={picture.alt}
              crop="thumb"
              className={`img-responsive restaurant-gallery img-center margin-bottom-10`}
            />
            <a className="button-remove" onClick={e => this.handleRemovePicture(e, picture.publicId)}>
              <ActionDelete />
            </a>
          </div>
        )
      })
    }

    return (
      <div className="wrapper">
        <h4 style={{
          textTransform: 'capitalize'
        }}>Gallery</h4>
        <p><small>{moduleDesc}</small></p>
        <Dropzone
          onDrop={(accepted) => this.handleUpload(accepted)}
          accept="image/*"
          className={`dropzone-uploader restaurant-gallery margin-bottom-10`}
        >
          <p>drop or click to upload new picture into gallery</p>
        </Dropzone>
        <div className="row">
          {pictures}
        </div>
      </div>
    )
  }
}

export default connect(state => state)(GalleryUploader)
