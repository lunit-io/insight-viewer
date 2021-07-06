import { setup } from '../support/utils'

describe('Basic Viewer', () => {
  before(() => {
    setup()
  })

  it('is working', () => {
    cy.visit('/')
  })
})
