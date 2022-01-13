import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import {
  MOCK_CONTOURS,
  ID1_POLYGON_HOVER_POSITION,
} from '../support/mockContours'

const drawMockPolygon = () => {
  const wrapper = cy.get('.cornerstone-canvas-wrapper')

  MOCK_CONTOURS.forEach(contour => {
    contour.forEach(([x, y], i) => {
      if (i === 0) {
        wrapper.trigger('mousedown', {
          pageX: x,
          pageY: y,
        })
      } else if (i === contour.length - 1) {
        wrapper.trigger('mouseup')
      } else {
        wrapper.trigger('mousemove', {
          pageX: x,
          pageY: y,
        })
      }
    })
  })
}

describe(
  'Svg Contour Drawer',
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

    it('after drawing show polygon 1ea', () => {
      cy.get('[data-cy-tab="drawer"]')
        .click()
        .get($LOADED)
        .should('be.exist')
        .then(drawMockPolygon)
        .get('polygon')
        .its('length')
        .should('eq', 2)
    })

    it('when hovering over a polygon, the polyline color is rgb(255, 194, 17)', () => {
      cy.get('.cornerstone-canvas-wrapper')
        .trigger('mousemove', {
          pageX: ID1_POLYGON_HOVER_POSITION[0],
          pageY: ID1_POLYGON_HOVER_POSITION[1],
        })
        .get('[data-cy-id="1"]')
        .should('have.css', 'stroke', 'rgb(255, 194, 17)')
        .get('[data-cy-id="2"]')
        .should('have.css', 'stroke', 'rgb(255, 255, 255)')
    })

    it('when drew polygon click the polygon removed', () => {
      cy.get('[data-cy-id="1"]')
        .click({ force: true })
        .should('not.exist')
        .get('[data-cy-id="2"]')
        .should('exist')
    })

    it('when remove all button click the polygon removed', () => {
      cy.get('[data-cy-name="remove-button"]')
        .click()
        .get('polygon')
        .should('not.exist')
    })
  }
)
