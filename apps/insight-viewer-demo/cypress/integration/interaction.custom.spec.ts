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
      cy.get('.custom-tab').click()
    })

    beforeEach(() => {
      cy.get('.reset').click()
    })

    it('shows initial viewport', () => {
      cy.get(LOADED).should('be.exist')
      cy.percySnapshot()
    })

    describe('Custom Interaction', () => {
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
          cy.get('.click-x').should('be.visible')
          cy.get('.click-y').should('be.visible')
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
          cy.get('.click-x').should('be.visible')
          cy.get('.click-y').should('be.visible')
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
          cy.get('.click-x').should('be.visible')
          cy.get('.click-y').should('be.visible')
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
          cy.get('.click-x').should('be.visible')
          cy.get('.click-y').should('be.visible')
          cy.percySnapshot()
        })
      })
    })
  }
)
