import cloudinary from 'cloudinary'
import axios from 'axios'
import config from '../config'

const { cloudName, apiKey, apiSecret } = config.cloudinary

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret
})

const upload = async (file, preset = '', resource = 'image') => {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('upload_preset', preset)
  formData.append('api_key', apiKey)
  formData.append('timestamp', Date.now() / 1000)
  
  const apiEndpoint = `https://api.cloudinary.com/v1_1/${cloudName}/${resource}/upload`
  const { data } = await axios.post(apiEndpoint, formData, {
    headers: { "X-Requested-With": "XMLHttpRequest" },
  })

  return data
}

export default {
  config: config.cloudinary,
  upload,
  destroy: cloudinary.uploader.destroy,
  url: cloudinary.url
}
