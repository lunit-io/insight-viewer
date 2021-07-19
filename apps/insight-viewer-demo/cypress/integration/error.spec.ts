import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, INITIALIZED } from '../support/const'

describe(
  'Custom error',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    before(() => {
      setup()
      cy.visit('/error')
    })

    it('shows custom error', () => {
      cy.get('.custom-error').click()
      cy.get(INITIALIZED).should('not.exist')
      cy.percySnapshot()
    })
  }
)
