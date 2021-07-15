import '@percy/cypress'
import { setup } from '../support/utils'

describe('Multiframe', { scrollBehavior: false }, () => {
  before(() => {
    setup()
    cy.visit('/multi-frame')
  })

  beforeEach(() => {
    cy.wait(1000)
  })

  it('shows initial viewer', () => {
    cy.get('.is-mount').then(() => {
      cy.percySnapshot()
    })
  })

  it('change frame to 5', () => {
    cy.get('input[type="range"]').controlledInputChange(5)
    cy.percySnapshot()
  })

  it('change frame to 10', () => {
    cy.get('input[type="range"]').controlledInputChange(10)
    cy.percySnapshot()
  })
})
