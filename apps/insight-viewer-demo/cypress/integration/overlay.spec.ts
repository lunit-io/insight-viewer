import '@percy/cypress'
import { setup } from '../support/utils'

describe('Overlay', () => {
  before(() => {
    setup()
    cy.visit('/overlay')
  })

  it('shows overlay', () => {
    cy.percySnapshot()
  })
})
