const nodeEnv = process.env.NODE_ENV || 'development'
const port = process.env.REACT_APP_PORT || 3000
const host = process.env.REACT_APP_HOST || 'http://localhost'

const envHelpers = {
  isProduction: (nodeEnv === 'production'),
  isDevelopment: (nodeEnv === 'development')
}

const baseUrl = (envHelpers.isProduction ? host : `${host}:${port}`)

module.exports = {
  appName: 'Aroydee Channel',
  nodeEnv,
  host,
  port,
  baseUrl,
  apiUrl: process.env.API_URL || 'http://localhost:5004',
  cloudinary: {
    cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
    apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET
  },
  ...envHelpers,
  defaultValues: {
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    businessHours: {
      open: new Date('1989/11/02 08:00:00'),
      close: new Date('1989/11/02 18:00:00')
    }
  }
}
