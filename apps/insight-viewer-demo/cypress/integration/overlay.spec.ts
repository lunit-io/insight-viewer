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
      cy.percySnapshot()
    })
  }
)
