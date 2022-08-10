import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../support/const'
import { IMAGES } from '../../src/const'

describe(
  'Multiframe',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    before(() => {
      setup()
      cy.visit('/multi-frame')
      cy.wait(5000)
    })

    it('shows initial viewer', () => {
      cy.get('[data-cy-all-loaded=success]').should('be.exist')
      cy.get('.frame-number').should('have.text', '0')
      cy.get('[data-cy-image]').contains(IMAGES[0])
      cy.percySnapshot()
    })

    it('change frame to 5', () => {
      cy.get('.frame-control').controlledInputChange(5)
      cy.get('.frame-number').should('have.text', '5')
      cy.get('[data-cy-image]').contains(IMAGES[5])
      cy.percySnapshot()
    })

    it('change frame to 10', () => {
      cy.get('.frame-control').controlledInputChange(10)
      cy.get('.frame-number').should('have.text', '10')
      cy.get('[data-cy-image]').contains(IMAGES[10])
      cy.percySnapshot()
    })
  }
)
