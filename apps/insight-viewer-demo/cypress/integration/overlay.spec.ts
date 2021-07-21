import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, LOADING } from '../support/const'

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

    it('shows loading progress', () => {
      cy.get(LOADING).should('be.exist')
    })

    it('shows overlay', () => {
      cy.get(LOADING).should('not.exist')
      cy.percySnapshot()
    })
  }
)
