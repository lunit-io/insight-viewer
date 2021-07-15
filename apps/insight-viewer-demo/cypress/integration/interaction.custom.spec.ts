import '@percy/cypress'
import { setup } from '../support/utils'
import { DEFAULT_SCALE } from '../../src/containers/Interaction/const'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT } from '../support/const'

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
      cy.wait(1000)
      cy.get('.reset').click()
    })

    describe('Custom Interaction', () => {
      describe('Primary Drag', () => {
        it('pan', () => {
          cy.get('.scale')
            .contains(DEFAULT_SCALE)
            .then(() => {
              cy.get('.primary-drag-pan').click()
              cy.get('.cornerstone-canvas-wrapper').dragCanvas({
                x: 200,
                y: -50,
                button: 0,
              })
              cy.percySnapshot()
            })
        })

        it('adjust', () => {
          cy.get('.primary-drag-adjust').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: -100,
            y: 250,
            button: 0,
          })
          cy.percySnapshot()
        })

        it('none', () => {
          cy.get('.primary-drag-none').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: 250,
            y: 350,
            button: 0,
          })
          cy.percySnapshot()
        })
      })

      describe('Secondary Drag', () => {
        it('pan', () => {
          cy.get('.secondary-drag-pan').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: 50,
            y: 180,
            button: 2,
          })
          cy.percySnapshot()
        })

        it('adjust', () => {
          cy.get('.secondary-drag-adjust').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: 250,
            y: 400,
            button: 2,
          })
          cy.percySnapshot()
        })

        it('none', () => {
          cy.get('.secondary-drag-none').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: -50,
            y: -30,
            button: 0,
          })
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
          cy.percySnapshot()
        })

        it('click after panning', { scrollBehavior: false }, () => {
          cy.get('.primary-drag-pan').click() // for dragging
          cy.get('.primary-click').click()

          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: 140,
            y: 30,
            button: 0,
          })
          cy.get('.cornerstone-canvas-wrapper').mouseclick({
            x: CLIENT_X,
            y: CLIENT_Y,
            button: 0,
          })
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
          cy.percySnapshot()
        })

        it('click after panning', { scrollBehavior: false }, () => {
          cy.get('.primary-drag-pan').click() // for dragging
          cy.get('.primary-click').click()

          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: -140,
            y: -60,
            button: 0,
          })
          cy.get('.cornerstone-canvas-wrapper').mouseclick({
            x: CLIENT_X,
            y: CLIENT_Y,
            button: 0,
          })
          cy.percySnapshot()
        })
      })
    })
  }
)
