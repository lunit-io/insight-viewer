import '@percy/cypress'
import { setup } from '../support/utils'

describe('Viewport Viewer', () => {
  before(() => {
    setup()
    cy.visit('/viewport')
  })

  it('shows initial viewport', () => {
    cy.percySnapshot()
  })

  it('shows inverted viewport', () => {
    cy.get('.invert').click()
    cy.percySnapshot()
  })

  it('shows hflipped viewport', () => {
    cy.get('.hflip').click()
    cy.percySnapshot()
  })

  it('shows vflipped viewport', () => {
    cy.get('.vflip').click()
    cy.percySnapshot()
  })

  it('shows x-transitioned viewport', () => {
    cy.get('.x-transition').invoke('val', 20).trigger('change')
    cy.percySnapshot()
  })

  it('shows y-transitioned viewport', () => {
    cy.get('.y-transition').invoke('val', 50).trigger('change')
    cy.percySnapshot()
  })

  it('shows zoomed viewport', () => {
    cy.get('.zoom').invoke('val', 2).trigger('change')
    cy.percySnapshot()
  })

  it('shows window-width viewport', () => {
    cy.get('.window-width').invoke('val', 111).trigger('change')
    cy.percySnapshot()
  })

  it('shows window-center viewport', () => {
    cy.get('.window-center').invoke('val', 78).trigger('change')
    cy.percySnapshot()
  })

  it('changes multiple viewport properties', () => {
    cy.get('.invert').click()
    cy.get('.vflip').click()
    cy.get('.x-transition').invoke('val', 60).trigger('change')
    cy.get('.zoom').invoke('val', 0.7).trigger('change')
    cy.get('.window-width').invoke('val', 160).trigger('change')
    cy.get('.window-center').invoke('val', 51).trigger('change')
    cy.percySnapshot()
  })

  it('changes viewport with keyboard', () => {
    cy.get('.is-mount').then(() => {
      cy.get('body').type('wwddd')
      cy.percySnapshot()
    })
  })

  it('changes multiple viewer viewport', () => {
    cy.get('.x-transition').invoke('val', 30).trigger('change')
    cy.get('.y-transition').invoke('val', 90).trigger('change')
    cy.get('.x-transition2').invoke('val', 15).trigger('change')
    cy.get('.y-transition2').invoke('val', 57).trigger('change')
    cy.percySnapshot()
  })
})
