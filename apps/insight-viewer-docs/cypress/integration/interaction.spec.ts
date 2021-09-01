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
      cy.get('.reset').click()
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

        describe('Mousewheel', () => {
          describe('frame', () => {
            it('next frame', () => {
              const frameNumber = 5
              const origFrame = Cypress.$('.frame').text()
              cy.get('.mousewheel-frame').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(1, frameNumber)
              cy.get('.frame').should(
                'have.text',
                Number(origFrame) + frameNumber
              )
              cy.percySnapshot()
            })

            it('prev frame', () => {
              const frameNumber = 2
              const origFrame = Cypress.$('.frame').text()
              cy.get('.mousewheel-frame').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(-1, frameNumber)
              cy.get('.frame').should(
                'have.text',
                Number(origFrame) - frameNumber
              )
              cy.percySnapshot()
            })
          })

          describe('scale', () => {
            it('scale up', () => {
              const frameNumber = 5

              cy.get('.mousewheel-scale').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(1, frameNumber)
              cy.get('[data-cy-scale]').contains(2.25)
              cy.percySnapshot()
            })

            it('scale down', () => {
              const frameNumber = 2

              cy.get('.mousewheel-scale').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(-1, frameNumber)
              cy.get('[data-cy-scale]').contains(0.5)
              cy.percySnapshot()
            })
          })
        })
      })
    })
  }
)
