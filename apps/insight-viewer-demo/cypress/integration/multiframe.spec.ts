import '@percy/cypress'
import { setup } from '../support/utils'

describe('Multiframe', () => {
  before(() => {
    setup()
    cy.visit('/multi-frame')
  })

  it('shows initial viewer', () => {
    cy.percySnapshot()
  })

  it('change frame to 5', () => {
    cy.get('.is-mount').then(() => {
      cy.get('.frame').invoke('val', 5).trigger('change')
      cy.percySnapshot()
    })
  })

  it('change frame to 10', () => {
    cy.get('.is-mount').then(() => {
      cy.get('.frame').invoke('val', 10).trigger('change')
      cy.percySnapshot()
    })
  })
})
