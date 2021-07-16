import '@percy/cypress'
import {
  setup,
  getCurrentX,
  getCurrentY,
  getCurrentWindowWidth,
  getCurrentWindowCenter,
} from '../support/utils'
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
      cy.get('.reset').click()
    })

    it('shows initial viewport', () => {
      cy.get('.scale').contains(DEFAULT_SCALE)
    })

    describe('Base Interaction', () => {
      describe('Primary Drag', () => {
        it('pan', () => {
          const value = {
            x: 200,
            y: -50,
          }

          cy.get('.scale')
            .contains(DEFAULT_SCALE)
            .then(() => {
              cy.get('.primary-drag-pan').click()
              cy.get('.cornerstone-canvas-wrapper').dragCanvas({
                x: value.x,
                y: value.y,
                button: 0,
              })
              cy.get('.x').should('have.text', getCurrentX(value.x).toFixed(2))
              cy.get('.y').should('have.text', getCurrentY(value.y).toFixed(2))
              cy.percySnapshot()
            })
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

          cy.get('.windowWidth').should(
            'have.text',
            getCurrentWindowWidth(value.x).toFixed(2)
          )
          cy.get('.windowCenter').should(
            'have.text',
            getCurrentWindowCenter(value.y).toFixed(2)
          )
          cy.percySnapshot()
        })

        it('none', () => {
          const value = {
            x: 250,
            y: 350,
          }
          const origX = Cypress.$('.windowWidth').text()
          const origY = Cypress.$('.windowCenter').text()

          cy.get('.primary-drag-none').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })
          cy.get('.windowWidth').should(
            'have.text',
            getCurrentWindowWidth(0, Number(origX)).toFixed(2)
          )
          cy.get('.windowCenter').should(
            'have.text',
            getCurrentWindowCenter(0, Number(origY)).toFixed(2)
          )
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
            cy.get('.x').should('have.text', getCurrentY(value.x).toFixed(2))
            cy.get('.y').should('have.text', getCurrentY(value.y).toFixed(2))
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

            cy.get('.windowWidth').should(
              'have.text',
              getCurrentWindowWidth(value.x).toFixed(2)
            )
            cy.get('.windowCenter').should(
              'have.text',
              getCurrentWindowCenter(value.y).toFixed(2)
            )
            cy.percySnapshot()
          })

          it('none', () => {
            const value = {
              x: -50,
              y: -30,
            }
            const origX = Cypress.$('.windowWidth').text()
            const origY = Cypress.$('.windowCenter').text()

            cy.get('.secondary-drag-none').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: value.x,
              y: value.y,
              button: 0,
            })
            cy.get('.windowWidth').should(
              'have.text',
              getCurrentWindowWidth(0, Number(origX)).toFixed(2)
            )
            cy.get('.windowCenter').should(
              'have.text',
              getCurrentWindowCenter(0, Number(origY)).toFixed(2)
            )
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
