const config = {
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_CYPRESS: typeof window !== 'undefined' && typeof window.Cypress !== 'undefined',
}

export default config
