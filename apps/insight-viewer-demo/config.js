const config = {
  HOST: process.env.HOST || 'production',
  IS_DEV: process.env.NODE_ENV === 'development',
}

export default config
