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
    })

    beforeEach(() => {
      cy.get('.reset').click({ multiple: true })
    })

    it('shows initial viewport', () => {
      cy.get($LOADED).should('be.exist')
      cy.percySnapshot()
    })

    describe('Base Interaction', () => {
      describe('Primary Drag', () => {
        it('pan', () => {
          const value = {
            x: 200,
            y: -50,
          }
          cy.get('.primary-drag-pan').click({ multiple: true })
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
          cy.get('.primary-drag-adjust').click({ multiple: true })
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
          const origX = Cypress.$('[data-cy-x]').eq(0).text()
          const origY = Cypress.$('[data-cy-y]').eq(0).text()
          const origWW = Cypress.$('[data-cy-window-width]').eq(0).text()
          const origWC = Cypress.$('[data-cy-window-center]').eq(0).text()

          cy.get('.primary-drag-none').click({ multiple: true })
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

        describe('Secondary Drag', () => {
          it('pan', () => {
            const value = {
              x: 50,
              y: 180,
            }
            cy.get('.secondary-drag-pan').click({ multiple: true })
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
            cy.get('.secondary-drag-adjust').click({ multiple: true })
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
            const origX = Cypress.$('[data-cy-x]').eq(0).text()
            const origY = Cypress.$('[data-cy-y]').eq(0).text()
            const origWW = Cypress.$('[data-cy-window-width]').eq(0).text()
            const origWC = Cypress.$('[data-cy-window-center]').eq(0).text()

            cy.get('.secondary-drag-none').click({ multiple: true })
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

        describe('Mousewheel', () => {
          describe('frame', () => {
            it('next frame', () => {
              const frameNumber = 5
              const origFrame = Cypress.$('.frame').eq(0).text()
              cy.get('.mousewheel-frame').click({ multiple: true })
              cy.get('.cornerstone-canvas-wrapper').eq(0).trigger('mouseover').mousewheel(1, frameNumber)
              cy.get('.frame')
                .eq(0)
                .should('have.text', Number(origFrame) + frameNumber)
              cy.percySnapshot()
            })

            it('prev frame', () => {
              const frameNumber = 2
              const origFrame = Cypress.$('.frame').eq(0).text()
              cy.get('.mousewheel-frame').click({ multiple: true })
              cy.get('.cornerstone-canvas-wrapper').eq(0).trigger('mouseover').mousewheel(-1, frameNumber)
              cy.get('.frame')
                .eq(0)
                .should('have.text', Number(origFrame) - frameNumber)
              cy.percySnapshot()
            })
          })

          /**
           * Commented out the E2E test because there was an issue
           * with scaling via wheel during the viewport function.
           *
           * fix this issue in a version after v6.0.0
           */
          // describe('scale', () => {
          //   it('scale up', () => {
          //     const frameNumber = 5

          //     cy.get('.mousewheel-scale').click({ multiple: true })
          //     cy.get('.cornerstone-canvas-wrapper').eq(0).trigger('mouseover').mousewheel(1, frameNumber)
          //     cy.get('[data-cy-scale]').contains(2.25)
          //     cy.percySnapshot()
          //   })

          //   it('scale down', () => {
          //     const frameNumber = 2

          //     cy.get('.mousewheel-scale').click({ multiple: true })
          //     cy.get('.cornerstone-canvas-wrapper').eq(0).trigger('mouseover').mousewheel(-1, frameNumber)
          //     cy.get('[data-cy-scale]').contains(0.5)
          //     cy.percySnapshot()
          //   })
          // })
        })
      })
    })
  }
)
