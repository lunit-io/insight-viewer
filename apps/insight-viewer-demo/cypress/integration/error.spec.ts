import '@percy/cypress'
import { setup } from '../support/utils'

describe('Custom error', () => {
  before(() => {
    setup()
    cy.visit('/error')
  })

  it('shows custom error', () => {
    cy.get('.custom-error').click()
    cy.percySnapshot()
  })
})
