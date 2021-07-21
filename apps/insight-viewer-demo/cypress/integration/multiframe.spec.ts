import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, LOADING } from '../support/const'

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
    })

    it('shows loading progress', () => {
      cy.get(LOADING).should('be.exist')
      cy.percySnapshot()
    })

    it('shows initial viewer', () => {
      cy.get(LOADING).should('not.exist')
      cy.get('.frame-number').should('have.text', '0')
      cy.percySnapshot()
    })

    it('change frame to 5', () => {
      cy.get('.frame-control').controlledInputChange(5)
      cy.get('.frame-number').should('have.text', '5')
      cy.percySnapshot()
    })

    it('change frame to 10', () => {
      cy.get('.frame-control').controlledInputChange(10)
      cy.get('.frame-number').should('have.text', '10')
      cy.percySnapshot()
    })
  }
)
