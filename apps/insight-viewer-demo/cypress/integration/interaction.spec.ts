import '@percy/cypress'
import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, LOADED } from '../support/const'

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
      cy.get(LOADED).should('be.exist')
      cy.percySnapshot()
    })

    describe('Base Interaction', () => {
      describe('Primary Drag', () => {
        it('pan', () => {
          const value = {
            x: 200,
            y: -50,
          }
          const origX = Cypress.$('.x').text()
          const origY = Cypress.$('.y').text()

          cy.get('.primary-drag-pan').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })
          cy.get('.x').should('not.have.text', origX)
          cy.get('.y').should('not.have.text', origY)
          cy.percySnapshot()
        })

        it('adjust', () => {
          const value = {
            x: 10,
            y: 250,
          }
          const origWW = Cypress.$('.windowWidth').text()
          const origWC = Cypress.$('.windowCenter').text()

          cy.get('.primary-drag-adjust').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })

          cy.get('.windowWidth').should('not.have.text', origWW)
          cy.get('.windowCenter').should('not.have.text', origWC)
          cy.percySnapshot()
        })

        it('none', () => {
          const value = {
            x: 250,
            y: 350,
          }
          const origX = Cypress.$('.x').text()
          const origY = Cypress.$('.y').text()
          const origWW = Cypress.$('.windowWidth').text()
          const origWC = Cypress.$('.windowCenter').text()

          cy.get('.primary-drag-none').click()
          cy.get('.cornerstone-canvas-wrapper').dragCanvas({
            x: value.x,
            y: value.y,
            button: 0,
          })
          cy.get('.x').should('have.text', origX)
          cy.get('.y').should('have.text', origY)
          cy.get('.windowWidth').should('have.text', origWW)
          cy.get('.windowCenter').should('have.text', origWC)
          cy.percySnapshot()
        })

        describe('Secondary Drag', () => {
          it('pan', () => {
            const value = {
              x: 50,
              y: 180,
            }
            const origX = Cypress.$('.x').text()
            const origY = Cypress.$('.y').text()

            cy.get('.secondary-drag-pan').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: value.x,
              y: value.y,
              button: 2,
            })
            cy.get('.x').should('not.have.text', origX)
            cy.get('.y').should('not.have.text', origY)
            cy.percySnapshot()
          })

          it('adjust', () => {
            const value = {
              x: 250,
              y: 400,
            }
            const origWW = Cypress.$('.windowWidth').text()
            const origWC = Cypress.$('.windowCenter').text()

            cy.get('.secondary-drag-adjust').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: value.x,
              y: value.y,
              button: 2,
            })

            cy.get('.windowWidth').should('not.have.text', origWW)
            cy.get('.windowCenter').should('not.have.text', origWC)
            cy.percySnapshot()
          })

          it('none', () => {
            const value = {
              x: -50,
              y: -30,
            }
            const origX = Cypress.$('.x').text()
            const origY = Cypress.$('.y').text()
            const origWW = Cypress.$('.windowWidth').text()
            const origWC = Cypress.$('.windowCenter').text()

            cy.get('.secondary-drag-none').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: value.x,
              y: value.y,
              button: 0,
            })
            cy.get('.x').should('have.text', origX)
            cy.get('.y').should('have.text', origY)
            cy.get('.windowWidth').should('have.text', origWW)
            cy.get('.windowCenter').should('have.text', origWC)
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
              const origScale = Cypress.$('.scale').text()

              cy.get('.mousewheel-scale').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(1, frameNumber)
              cy.get('.scale').should('not.have.text', origScale)
              cy.percySnapshot()
            })

            it('scale down', () => {
              const frameNumber = 2
              const origScale = Cypress.$('.scale').text()

              cy.get('.mousewheel-scale').click()
              cy.get('.cornerstone-canvas-wrapper')
                .trigger('mouseover')
                .mousewheel(-1, frameNumber)
              cy.get('.scale').should('not.have.text', origScale)
              cy.percySnapshot()
            })
          })
        })
      })
    })
  }
)
