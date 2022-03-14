import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../support/const'
import { CONTOURS } from '../../mocks/contours'

describe(
  'Svg Contour Viewer',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    before(() => {
      setup()
      cy.visit('/use-overlay-context')
    })

    it('show initial sample polygons 4ea', () => {
      cy.get('[data-cy-tab="viewer"]')
        .click()
        .get('polygon')
        .its('length')
        .should('eq', CONTOURS.length)
    })
  }
)
