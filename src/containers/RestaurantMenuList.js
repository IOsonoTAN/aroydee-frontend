import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Pagination from 'material-ui-pagination'
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle'
import ContentSave from 'material-ui/svg-icons/content/save'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import { Link } from 'react-router-dom'
import { Checkbox, TextField, RaisedButton, FlatButton, Divider, Dialog, Snackbar } from 'material-ui'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import { Image } from 'cloudinary-react'
import { apiUrl, appName } from '../config'
import { cloudinary } from '../services'
import { string } from '../helpers'
import Loading from '../components/Loading'

class RestaurantMenuList extends React.Component {
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
      restaurant: {
        title: {
          en: '...',
          th: '...'
        }
      },
      menus: [],
      paginate: {
        page: 1,
        pages: 1,
        total: 1,
        limit: 1
      },
      deleteMenuId: null,
      addNew: {
        data: {
          title: '',
          price: 0,
          recommended: false
        },
        dialog: {
          open: false
        }
      }
    }

    this.setInit = this.setInit.bind(this)
    this.getMenus = this.getMenus.bind(this)
    this.handlePaginate = this.handlePaginate.bind(this)
    this.handleTitle = this.handleTitle.bind(this)
    this.handlePrice = this.handlePrice.bind(this)
    this.handleRecommended = this.handleRecommended.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleRemovePicture = this.handleRemovePicture.bind(this)
    this.handleOpenDialog = this.handleOpenDialog.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleDialogConfirmDeleteDialog = this.handleDialogConfirmDeleteDialog.bind(this)
    this.handleCloseAddNewDialog = this.handleCloseAddNewDialog.bind(this)
    this.handleDialogConfirmAddNewDialog = this.handleDialogConfirmAddNewDialog.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.openAddNewDialog = this.openAddNewDialog.bind(this)

    this.handleAddNewTitle = this.handleAddNewTitle.bind(this)
    this.handleAddNewPrice = this.handleAddNewPrice.bind(this)
    this.handleAddNewRecommended = this.handleAddNewRecommended.bind(this)

    this.setLoading = this.setLoading.bind(this)
    this.doAlert = this.doAlert.bind(this)
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

  async componentDidMount () {
    try {
      await this.getMenus()
      document.title = `${this.state.restaurant.title.th} - ${appName}`
    } catch (e) {
      console.error('e ->', e.message, e.stack)
    }
  }

  setInit (menus) {
    const { page: currentPage, pages, limit, total } = menus
    this.setState({
      ...this.state,
      menus: menus.docs,
      paginate: {
        page: parseInt(currentPage, 10),
        pages,
        total,
        limit
      }
    })
  }

  async getMenus (page = 1) {
    this.setLoading(true)
    const { restaurantId } = this.props.match.params
    const [{ data: { data: menus } }, { data: { data: restaurant } }] = await Promise.all([
      axios.get(`${apiUrl}/cms/restaurants/${restaurantId}/menus?page=${page}`),
      axios.get(`${apiUrl}/cms/restaurants/${restaurantId}`)
    ])
    this.setState({
      ...this.state,
      restaurant
    })
    this.setInit(menus)
    this.setLoading(false)
  }

  async handlePaginate (page) {
    this.getMenus(page)
  }

  handleTitle (menuId, title) {
    const { menus } = this.state
    menus.map(menu => {
      if (menu._id === menuId) {
        menu.title = title
        return menu
      }
      return menu
    })
    this.setState({
      ...this.state,
      menus
    })
  }

  handlePrice (menuId, price) {
    const { menus } = this.state
    menus.map(menu => {
      if (menu._id === menuId) {
        menu.price = price
        return menu
      }
      return menu
    })
    this.setState({
      ...this.state,
      menus
    })
  }

  handleRecommended (menuId, recommended) {
    const { menus } = this.state
    menus.map(menu => {
      if (menu._id === menuId) {
        menu.recommended = !recommended
        return menu
      }
      return menu
    })
    this.setState({
      ...this.state,
      menus
    })
  }

  async handleSave (menuId) {
    this.setLoading(true)
    const menu = this.state.menus.filter(menu => menu._id === menuId)[0]
    const { data: { data: response } } = await axios.put(`${apiUrl}/cms/restaurants/menus`, {
      menuId,
      data: {
        title: menu.title,
        price: menu.price,
        recommended: menu.recommended,
        gallery: menu.gallery
      }
    })
    this.doAlert(true, response.message)
    this.setLoading(false)
  }

  async handleDelete (menuId) {
    // @TODO remove all picture of menu on Cloudinary
    const { restaurantId } = this.props.match.params
    const { data: { data: { menus } } } = await axios.delete(`${apiUrl}/cms/restaurants/menus`, {
      data: {
        restaurantId,
        menuId
      }
    })
    this.setInit(menus)
  }

  async handleRemovePicture (menuId, publicId) {
    this.setLoading(true)
    const menus = this.state.menus.map(menu => {
      if (menu._id === menuId) {
        cloudinary.destroy(publicId)
        menu.gallery = menu.gallery.filter(picture => picture.publicId !== publicId)
      }
      return menu
    })
    this.setState({
      ...this.state,
      menus
    })
    this.setLoading(false)
    this.handleSave(menuId)
  }

  handleOpenDialog (menuId) {
    this.setState({
      ...this.state,
      dialog: {
        open: true
      },
      deleteMenuId: menuId
    })
  }

  handleCloseDialog () {
    this.setState({
      ...this.state,
      dialog: {
        open: false
      }
    })
  }

  async handleDialogConfirmDeleteDialog () {
    const { deleteMenuId: menuId } = this.state
    await this.handleDelete(menuId)
    this.setState({
      ...this.state,
      dialog: {
        open: false
      }
    })
  }

  async handleCloseAddNewDialog () {
    this.setState({
      ...this.state,
      addNew: {
        dialog: {
          open: false
        }
      }
    })
  }

  async handleDialogConfirmAddNewDialog () {
    const { restaurantId } = this.props.match.params
    await axios.post(`${apiUrl}/cms/restaurants/menus`, {
      ...this.state.addNew.data,
      restaurantId
    })
    await this.getMenus()
    this.setState({
      ...this.state,
      addNew: {
        dialog: {
          open: false
        }
      }
    })
  }

  openAddNewDialog () {
    this.setState({
      ...this.state,
      addNew: {
        dialog: {
          open: true
        }
      }
    })
  }

  handleAddNewTitle (title) {
    this.setState({
      ...this.state,
      addNew: {
        ...this.state.addNew,
        data: {
          ...this.state.addNew.data,
          title
        }
      }
    })
  }

  handleAddNewPrice (price) {
    this.setState({
      ...this.state,
      addNew: {
        ...this.state.addNew,
        data: {
          ...this.state.addNew.data,
          price
        }
      }
    })
  }

  handleAddNewRecommended (recommended) {
    this.setState({
      ...this.state,
      addNew: {
        ...this.state.addNew,
        data: {
          ...this.state.addNew.data,
          recommended: recommended ? true : false
        }
      }
    })
  }

  async handleUpload (menuId, [file]) {
    this.setLoading(true)
    const uploaded = await cloudinary.upload(file, 'restaurant')
    const menus = this.state.menus.filter(menu => {
      if (menu._id === menuId) {
        menu.gallery.push({
          alt: uploaded.original_filename,
          publicId: uploaded.public_id,
          url: uploaded.secure_url
        })
      }
      return menu
    })
    this.setState({
      ...this.state,
      menus
    })
    this.setLoading(false)
    this.handleSave(menuId)
  }

  render () {
    const pagination = this.state.paginate.pages > 1 &&
      <div className="col-xs-12">
        <Pagination
          total={this.state.paginate.pages}
          current={this.state.paginate.page}
          display={5}
          onChange={this.handlePaginate}
        />
      </div>

    const buttonActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseDialog}
        key='btnCancel'
      />,
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={this.handleDialogConfirmDeleteDialog}
        key='btnConfirm'
      />
    ]

    const buttonAddNewActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleCloseAddNewDialog}
        key='btnCancel'
      />,
      <FlatButton
        label="Create"
        primary={true}
        onClick={this.handleDialogConfirmAddNewDialog}
        key='btnCreate'
      />
    ]

    return (
      <div className="container">
        <h1>Editing menu of {this.state.restaurant.title.th}</h1>
        <div className="button-controls">
          <RaisedButton label="Back to restaurant list" containerElement={<Link to="/restaurants" />} />
          <RaisedButton primary={true} className="pull-right" label="Add a new menu" containerElement={<Link to="#" />} onClick={this.openAddNewDialog} />
        </div>
        <Dialog
          title="Add new menu"
          actions={buttonAddNewActions}
          modal={true}
          open={this.state.addNew.dialog.open}
        >
          <form>
            <div className="row">
              <div className="col-xs-6">
                <TextField
                  name="title"
                  hintText="Input title"
                  floatingLabelText="Title"
                  fullWidth={true}
                  onKeyDown={e => this.handleAddNewTitle(e.target.value)}
                />
              </div>
              <div className="col-xs-6">
                <TextField
                  name="price"
                  hintText="Input Price"
                  floatingLabelText="Price (THB)"
                  fullWidth={true}
                  onChange={e => this.handleAddNewPrice(e.target.value)}
                />
              </div>
              <div className="col-xs-12">
                <Checkbox
                  label="Recommended"
                  onCheck={e => this.handleAddNewRecommended(true)}
                />
              </div>
            </div>
          </form>
        </Dialog>
        <hr />
        <div className="row pagination-top">
          {pagination}
        </div>
        <div className="row">
          <div className="col-xs-12">
            {this.state.menus.length === 0 &&
              <div>
                <p>Sorry, there is no menu on this restaurant.</p>
                <p>Try to <a href="#" onClick={this.openAddNewDialog}>add a new menu</a></p>
              </div>
            }
            {this.state.menus.map(menu => {
              const recommended = menu.recommended ? 'Recommended' : ''
              const checked = recommended ? true : false
              const rawPrice = string.numberWithCommas(menu.price)
              const price = recommended ? `, ${rawPrice} ${menu.currency}` : `${rawPrice} ${menu.currency}`
              const subtitle = `${recommended}${price}`

              return (
                <div key={menu._id} className="restaurant" id={menu._id}>
                  <Card>
                    <CardHeader
                      title={menu.title}
                      subtitle={subtitle}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      <form id={menu._id} className="row">
                        <div className="col-xs-6">
                          <TextField
                            name="title"
                            hintText="Input title"
                            floatingLabelText="Title"
                            fullWidth={true}
                            defaultValue={menu.title}
                            onChange={e => this.handleTitle(menu._id, e.target.value)}
                          />
                        </div>
                        <div className="col-xs-6">
                          <TextField
                            name="price"
                            hintText="Input Price"
                            floatingLabelText={`Price (${menu.currency})`}
                            fullWidth={true}
                            defaultValue={menu.price}
                            onChange={e => this.handlePrice(menu._id, e.target.value)}
                          />
                        </div>
                        <div className="col-xs-12">
                          <Checkbox
                            label="Recommended"
                            checked={checked}
                            onCheck={e => this.handleRecommended(menu._id, checked)}
                          />
                        </div>
                      </form>
                      <hr />
                      <div className="menu-galleries row">
                        <div className="menu-gallery col-xs-6 col-sm-4 col-md-3 gallery-picture">
                          <Dropzone
                            onDrop={(files) => this.handleUpload(menu._id, files)}
                            accept="image/*"
                            className="dropzone-uploader" 
                          >
                            <p><strong>Drop or click</strong><br/>to upload picture to gallery</p>
                          </Dropzone>
                        </div>
                        {menu.gallery.map(({ alt, publicId, url }) => {
                          return (
                            <div key={publicId} className="menu-gallery col-xs-6 col-sm-4 col-md-3 gallery-picture">
                              <Image
                                cloudName={cloudinary.config.cloudName}
                                publicId={publicId}
                                alt={alt}
                                crop="thumb"
                                className={`img-responsive img-center margin-bottom-10`}
                              />
                              <a className="button-remove" onClick={e => this.handleRemovePicture(menu._id, publicId)}>
                                <ActionDelete />
                              </a>
                            </div>
                          )
                        })}
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-xs-12 text-right">
                          <RaisedButton
                            primary={true}
                            label="Update & save"
                            labelPosition="after"
                            icon={<ContentSave />}
                            onClick={e => this.handleSave(menu._id)}
                            containerElement={<Link to="#" />}
                            className="margin-right-20"
                          />
                          <Dialog
                            title="Confirmation to delete a menu"
                            actions={buttonActions}
                            modal={false}
                            open={this.state.dialog.open}
                            onRequestClose={this.handleCloseDialog}
                          >
                            Do you want to delete {menu.title}?
                          </Dialog>
                          <RaisedButton
                            label="Delete"
                            labelPosition="after"
                            icon={<ContentRemoveCircle />}
                            onClick={e => this.handleOpenDialog(menu._id)}
                            containerElement={<Link to="#" />}
                          />
                        </div>
                      </div>
                    </CardText>
                  </Card>
                  <Divider />
                </div>
              )
            })}
          </div>
        </div>
        <div className="row pagination-bottom">
          {pagination}
        </div>
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

export default connect(state => state)(RestaurantMenuList)
