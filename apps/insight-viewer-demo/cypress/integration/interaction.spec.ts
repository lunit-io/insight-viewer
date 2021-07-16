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
    })

    beforeEach(() => {
      cy.wait(1000)
      cy.get('.reset').click()
    })

    describe('Base Interaction', () => {
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

        describe('Mousewheel', () => {
          describe('frame', () => {
            it('next frame', () => {
              cy.get('.mousewheel-frame').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(1, 5)
              cy.percySnapshot()
            })

            it('prev frame', () => {
              cy.get('.mousewheel-frame').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(-1, 2)
              cy.percySnapshot()
            })
          })

          describe('scale', () => {
            it('scale up', () => {
              cy.get('.mousewheel-scale').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(1, 5)
              cy.percySnapshot()
            })

            it('scale down', () => {
              cy.get('.mousewheel-scale').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(-1, 2)
              cy.percySnapshot()
            })
          })
        })
      })
    })
  }
)
