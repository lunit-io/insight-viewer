import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'

describe(
  'Overlay',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    before(() => {
      setup()
      cy.visit('/overlay')
    })

    it('shows overlay', () => {
      cy.get($LOADED).should('be.exist')
      cy.get('[data-cy-scale]').contains(0.98)
      cy.get('[data-cy-hflip]').contains('false')
      cy.get('[data-cy-vflip]').contains('false')
      cy.get('[data-cy-x]').contains(0.0)
      cy.get('[data-cy-y]').contains(0.0)
      cy.get('[data-cy-invert]').contains('false')
      cy.get('[data-cy-window-width]').contains(90.0)
      cy.get('[data-cy-window-center]').contains(32.0)
      cy.percySnapshot()
    })
  }
)
