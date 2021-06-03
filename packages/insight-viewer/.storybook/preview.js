import { addParameters } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { initializeWorker, mswDecorator } from 'msw-storybook-addon'
import { worker } from '../mocks'

const HOST = process.env.NODE_ENV === 'development' ? undefined : {
  serviceWorker: {
    url: '/src/insight-viewer/mockServiceWorker.js',
  },
}

initializeWorker()
addParameters({ docs: { page: null } })
addDecorator(mswDecorator)
worker.start(HOST)
