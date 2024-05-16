import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'

describe(
  'Interaction',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    before(() => {
      setup()
      cy.visit('/interaction')
      cy.get('.custom-tab').click()
    })

    beforeEach(() => {
      cy.get('.reset').click()
    })

    it('shows initial viewport', () => {
      cy.get($LOADED).should('be.exist')
      cy.percySnapshot()
    })

    describe('Custom Interaction', () => {
      describe('Primary Drag', () => {
        it('pan', () => {
          const value = {
            x: 200,
            y: -50,
          }
          cy.get('.primary-drag-pan').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })
          cy.get('[data-cy-x]').contains(value.x)
          cy.get('[data-cy-y]').contains(value.y)
          cy.percySnapshot()
        })

        it('adjust', () => {
          const value = {
            x: 10,
            y: 250,
          }
          cy.get('.primary-drag-adjust').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })
          cy.get('[data-cy-window-width]').contains(100.0)
          cy.get('[data-cy-window-center]').contains(282.0)
          cy.percySnapshot()
        })

        it('none', () => {
          const value = {
            x: 250,
            y: 350,
          }
          const origX = Cypress.$('[data-cy-x]').text()
          const origY = Cypress.$('[data-cy-y]').text()
          const origWW = Cypress.$('[data-cy-window-width]').text()
          const origWC = Cypress.$('[data-cy-window-center]').text()

          cy.get('.primary-drag-none').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })
          cy.get('[data-cy-x]').contains(origX)
          cy.get('[data-cy-y]').contains(origY)
          cy.get('[data-cy-window-width]').contains(origWW)
          cy.get('[data-cy-window-center]').contains(origWC)
          cy.percySnapshot()
        })
      })

      describe('Secondary Drag', () => {
        it('pan', () => {
          const value = {
            x: 50,
            y: 180,
          }
          cy.get('.secondary-drag-pan').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 2,
          })
          cy.get('[data-cy-x]').contains(value.x)
          cy.get('[data-cy-y]').contains(value.y)
          cy.percySnapshot()
        })

        it('adjust', () => {
          const value = {
            x: 250,
            y: 400,
          }
          cy.get('.secondary-drag-adjust').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 2,
          })
          cy.get('[data-cy-window-width]').contains(340.0)
          cy.get('[data-cy-window-center]').contains(432.0)
          cy.percySnapshot()
        })

        it('none', () => {
          const value = {
            x: -50,
            y: -30,
          }
          const origX = Cypress.$('[data-cy-x]').text()
          const origY = Cypress.$('[data-cy-y]').text()
          const origWW = Cypress.$('[data-cy-window-width]').text()
          const origWC = Cypress.$('[data-cy-window-center]').text()

          cy.get('.secondary-drag-none').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })
          cy.get('[data-cy-x]').contains(origX)
          cy.get('[data-cy-y]').contains(origY)
          cy.get('[data-cy-window-width]').contains(origWW)
          cy.get('[data-cy-window-center]').contains(origWC)
          cy.percySnapshot()
        })
      })

      describe('Primary Click', () => {
        const CLIENT_X = 400
        const CLIENT_Y = 610

        it('normal click', { scrollBehavior: false }, () => {
          cy.get('.primary-click').click()

          cy.get('.cornerstone-canvas-wrapper').mouseclick({
            x: CLIENT_X,
            y: CLIENT_Y,
            button: 0,
          })
          cy.get('[data-cy-click-x]').contains(-150.0)
          cy.get('[data-cy-click-y]').contains(261.0)
          cy.percySnapshot()
        })

        it('click after panning', { scrollBehavior: false }, () => {
          cy.get('.primary-drag-pan').click() // for dragging

          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: 140,
            y: 30,
            button: 0,
          })
          cy.get('.primary-click').click()

          cy.get('.cornerstone-canvas-wrapper').mouseclick({
            x: CLIENT_X,
            y: CLIENT_Y,
            button: 0,
          })
          cy.get('[data-cy-click-x]').contains(-290.0)
          cy.get('[data-cy-click-y]').contains(231.0)
          cy.percySnapshot()
        })
      })

      describe('Secondary Click', () => {
        const CLIENT_X = 849
        const CLIENT_Y = 838

        it('normal click', { scrollBehavior: false }, () => {
          cy.get('.primary-click').click()

          cy.get('.cornerstone-canvas-wrapper').mouseclick({
            x: CLIENT_X,
            y: CLIENT_Y,
            button: 0,
          })
          cy.get('[data-cy-click-x]').contains(299.0)
          cy.get('[data-cy-click-y]').contains(489.0)
          cy.percySnapshot()
        })

        it('click after panning', { scrollBehavior: false }, () => {
          cy.get('.primary-drag-pan').click() // for dragging

          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: -140,
            y: -60,
            button: 0,
          })
          cy.get('.primary-click').click()

          cy.get('.cornerstone-canvas-wrapper').mouseclick({
            x: CLIENT_X,
            y: CLIENT_Y,
            button: 0,
          })
          cy.get('[data-cy-click-x]').contains(439.0)
          cy.get('[data-cy-click-y]').contains(549.0)
          cy.percySnapshot()
        })
      })
    })
  }
)
