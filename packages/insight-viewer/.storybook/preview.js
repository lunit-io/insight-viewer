import { addParameters } from '@storybook/react'
import { addDecorator } from '@storybook/react'
import { initializeWorker, mswDecorator } from 'msw-storybook-addon'
import { worker } from '../mocks'

initializeWorker()
addParameters({ docs: { page: null } })
addDecorator(mswDecorator)
worker.start()
