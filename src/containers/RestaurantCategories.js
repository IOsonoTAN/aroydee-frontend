import React from 'react'
import axios from 'axios'
import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import { TextField, RaisedButton, Checkbox, Snackbar, Dialog, FlatButton } from 'material-ui'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { Link } from 'react-router-dom'
import { Image } from 'cloudinary-react'
import { apiUrl } from '../config'
import { cloudinary } from '../services'
import Loading from '../components/Loading'

import ContentSave from 'material-ui/svg-icons/content/save'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'

class RestaurantCategories extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      alert: {
        open: false,
        message: '...'
      },
      dialog: {
        open: false
      },
      categories: [],
      paginate: {
        page: 1,
        pages: 1,
        total: 1,
        limit: 1
      },
      deleteCategoryId: null,
      addNew: {
        data: {
          title: {
            th: 'ไม่ได้กำหนดชื่อ',
            en: 'Undefined name'
          },
          isActive: true,
          picture: {
            alt: 'category_picture',
            url: 'https://res.cloudinary.com/aroydee-channel/image/upload/v1521305237/category/category_picture.jpg',
            publicId: 'category/category_picture'
          }
        },
        dialog: {
          open: false
        }
      }
    }

    this.handleTitle = this.handleTitle.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleActive = this.handleActive.bind(this)
    this.handleNewTitle = this.handleNewTitle.bind(this)
    this.handleNewActive = this.handleNewActive.bind(this)
    this.openAddNewDialog = this.openAddNewDialog.bind(this)
    this.closeAddNewDialog = this.closeAddNewDialog.bind(this)
    this.confirmAddNewDialog = this.confirmAddNewDialog.bind(this)
    this.openConfirmRemoveDialog = this.openConfirmRemoveDialog.bind(this)
    this.closeConfirmRemoveDialog = this.closeConfirmRemoveDialog.bind(this)
    this.confirmDelete = this.confirmDelete.bind(this)

    this.setInit = this.setInit.bind(this)
    this.setLoading = this.setLoading.bind(this)
    this.doAlert = this.doAlert.bind(this)
  }

  async componentDidMount () {
    const { data: { data: categories } } = await axios.get(`${apiUrl}/cms/restaurants/categories`)

    this.setInit(categories)
  }

  setInit (categories) {
    const { page: currentPage, pages, limit, total } = categories

    this.setState({
      ...this.state,
      categories: categories.docs,
      paginate: {
        page: parseInt(currentPage, 10),
        pages,
        total,
        limit
      }
    })
  }

  setLoading (loading = false) {
    this.setState({
      ...this.state,
      loading
    })
  }

  doAlert (open = false, message = '...') {
    this.setState({
      ...this.state,
      alert: {
        open,
        message
      }
    })
    setTimeout(() => {
      this.doAlert(false)
    }, 4000)
  }

  openAddNewDialog () {
    this.setState({
      ...this.state,
      addNew: {
        data: this.state.addNew.data,
        dialog: {
          open: true
        }
      }
    })
  }

  closeAddNewDialog () {
    this.setState({
      ...this.state,
      addNew: {
        data: this.state.addNew.data,
        dialog: {
          open: false
        }
      }
    })
  }

  async confirmAddNewDialog () {
    this.setLoading(true)
    const { addNew: { data } } = this.state
    const { data: { data: response } } = await axios.post(`${apiUrl}/cms/restaurants/categories`, { data })

    this.setInit(response.categories)
    this.doAlert(true, response.message)
    this.setLoading(false)
    this.closeAddNewDialog()
  }

  openConfirmRemoveDialog (categoryId) {
    this.setState({
      ...this.state,
      dialog: {
        open: true
      },
      deleteCategoryId: categoryId
    })
  }

  closeConfirmRemoveDialog () {
    this.setState({
      ...this.state,
      dialog: {
        open: false
      },
      deleteCategoryId: null
    })
  }

  async confirmDelete () {
    this.setLoading(true)
    const { deleteCategoryId: categoryId } = this.state
    await this.handleDelete(categoryId)
    this.setState({
      ...this.state,
      dialog: {
        open: false
      }
    })
    this.setLoading(false)
  }

  async handleDelete (categoryId) {
    // @TODO remove all picture of menu on Cloudinary
    const { data: { data: { categories } } } = await axios.delete(`${apiUrl}/cms/restaurants/categories`, {
      data: {
        categoryId
      }
    })
    this.setInit(categories)
  }

  handleTitle (categoryId, lang, title) {
    const { categories } = this.state

    categories.map(category => {
      if (category._id === categoryId) {
        category.title[lang] = title
      }
      return category
    })

    this.setState({
      ...this.state,
      categories
    })
  }

  handleNewTitle (lang, title) {
    const { addNew } = this.state

    addNew.data.title[lang] = title

    this.setState({
      ...this.state,
      addNew
    })
  }

  handleNewActive (setActive) {
    const { addNew } = this.state

    addNew.data.isActive = (addNew.data.isActive === setActive)

    this.setState({
      ...this.state,
      addNew
    })
  }

  async handleSave (categoryId) {
    this.setLoading(true)
    const { categories } = this.state
    const data = categories.filter(category => category._id === categoryId)[0]
    const { data: { data: response } } = await axios.put(`${apiUrl}/cms/restaurants/categories`, {
      categoryId,
      data
    })
    this.doAlert(true, response.message)
    this.setLoading(false)
  }

  async handleUpload (categoryId, [file]) {
    this.setLoading(true)
    let oldPicture
    const uploaded = await cloudinary.upload(file, 'restaurant')
    const categories = this.state.categories.filter(category => {
      if (category._id === categoryId) {
        oldPicture = category.picture
        category.picture = {
          alt: uploaded.original_filename,
          publicId: uploaded.public_id,
          url: uploaded.secure_url
        }
      }
      return category
    })
    this.setState({
      ...this.state,
      categories
    })
    cloudinary.destroy(oldPicture.publicId)
    this.setLoading(false)
    this.handleSave(categoryId)
  }

  handleActive (categoryId, setActive) {
    const { categories } = this.state
    categories.filter(category => {
      if (category._id === categoryId) {
        category.isActive = (category.isActive !== setActive)
        return category
      }
      return category
    })
    this.setState({
      ...this.state,
      categories
    })
  }

  render () {
    const { categories } = this.state

    const buttonAddNewActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeAddNewDialog}
        key='btnCancel'
      />,
      <FlatButton
        label="Create"
        primary={true}
        onClick={this.confirmAddNewDialog}
        key='btnCreate'
      />
    ]

    const buttonRemoveActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeConfirmRemoveDialog}
        key='btnCancel'
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={this.confirmDelete}
        key='btnConfirm'
      />
    ]

    return (
      <div className="container">
        <h1>Restaurant categories</h1>
        <div className="button-controls text-right">
          <RaisedButton primary={true} label="Add a new category" containerElement={<Link to="#" />} onClick={this.openAddNewDialog} />
          <Dialog
            title="Add new category"
            actions={buttonAddNewActions}
            modal={true}
            open={this.state.addNew.dialog.open}
          >
            <form>
              <div className="row">
                <div className="col-sm-6">
                  <TextField
                    name="titleThai"
                    hintText="Input title in Thai"
                    floatingLabelText="Title in Thai"
                    fullWidth={true}
                    onChange={e => this.handleNewTitle('th', e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <TextField
                    name="titleEnglish"
                    hintText="Input title in English"
                    floatingLabelText="Title in English"
                    fullWidth={true}
                    onChange={e => this.handleNewTitle('en', e.target.value)}
                  />
                </div>
              </div>
              <div className="row margin-bottom-20">
                <div className="col-xs-12">
                  <Checkbox
                    label="Set as active category"
                    onCheck={e => this.handleNewActive(true)}
                  />
                </div>
              </div>
            </form>
          </Dialog>
        </div>
        <hr />
        {categories.map((category) => {
          const { picture, title, _id: categoryId, isActive } = category
          const activeStatus = isActive ? 'active' : 'inactive'

          return (
            <div key={categoryId} className="restaurant-categories">
              <Card>
                <CardHeader
                  title={`${title.th} (${title.en})`}
                  subtitle={`This category is ${activeStatus}`}
                  avatar={cloudinary.url(picture.publicId)}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  <form id={`category-${categoryId}`}>
                    <div className="row">
                      <div className="col-sm-6">
                        <TextField
                          name="titleThai"
                          hintText="Input title in Thai"
                          floatingLabelText="Title in Thai"
                          fullWidth={true}
                          defaultValue={title.th}
                          onChange={e => this.handleTitle(categoryId, 'th', e.target.value)}
                        />
                      </div>
                      <div className="col-sm-6">
                        <TextField
                          name="titleEnglish"
                          hintText="Input title in English"
                          floatingLabelText="Title in English"
                          fullWidth={true}
                          defaultValue={title.en}
                          onChange={e => this.handleTitle(categoryId, 'en', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row margin-bottom-20">
                      <div className="col-xs-12">
                        <Checkbox
                          label="Set as active category"
                          checked={isActive}
                          onCheck={e => this.handleActive(categoryId, true)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-2">
                        <Image
                          cloudName={cloudinary.config.cloudName}
                          publicId={picture.publicId}
                          alt={picture.alt}
                          crop="thumb"
                          className={`img-responsive img-center margin-bottom-10`}
                        />
                      </div>
                      <div className="col-xs-12 col-sm-10">
                        <Dropzone
                          onDrop={(files) => this.handleUpload(categoryId, files)}
                          accept="image/*"
                          className="dropzone-uploader"
                        >
                          <p><strong>Drop or click</strong><br />to upload picture to category</p>
                        </Dropzone>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-xs-12 text-right">
                        <RaisedButton
                          primary={true}
                          label="Update & save"
                          labelPosition="after"
                          icon={<ContentSave />}
                          onClick={e => this.handleSave(categoryId)}
                          containerElement={<Link to="#" />}
                          className="margin-right-20"
                        />
                        <Dialog
                          title="Confirmation to delete a category"
                          actions={buttonRemoveActions}
                          modal={false}
                          open={this.state.dialog.open}
                          onRequestClose={this.closeConfirmRemoveDialog}
                        >
                          Do you want to delete {category.title.th}?
                          </Dialog>
                        <RaisedButton
                          label="Delete"
                          labelPosition="after"
                          icon={<ContentRemoveCircle />}
                          onClick={e => this.openConfirmRemoveDialog(categoryId)}
                          containerElement={<Link to="#" />}
                        />
                      </div>
                    </div>
                  </form>
                </CardText>
              </Card>
            </div>
          )
        })}
        <Loading
          open={this.state.loading}
        />
        <Snackbar
          open={this.state.alert.open}
          message={this.state.alert.message}
          autoHideDuration={4000}
        />
      </div>
    )
  }
}

export default connect(state => state)(RestaurantCategories)
