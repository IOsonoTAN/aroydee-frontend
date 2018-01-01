const nodeEnv = process.env.NODE_ENV
const port = process.env.REACT_APP_PORT || 3000
const host = process.env.REACT_APP_HOST || 'http://localhost'

const config = {
  nodeEnv,
  host,
  port,
  baseUrl: `${host}:${port}`,
  account: {
    google: {
      clientId: '265158100143-uckobfgj4fdi7unubkihdvhu47dsbrrs.apps.googleusercontent.com'
    },
    facebook: {
      appId: '148570992008274',
      fields: 'name,email,picture',
      autoLoad: false
    }
  },
  isProduction: (nodeEnv === 'production')
}

export default config
