import '@percy/cypress'
import { setup } from '../support/utils'
import { DEFAULT_SCALE } from '../../src/containers/Interaction/const'

describe('Interaction', () => {
  before(() => {
    setup()
    cy.visit('/interaction')
    cy.get('.custom-tab').click()
  })

  beforeEach(() => {
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
          })

        cy.percySnapshot()
        cy.wait(1000)
      })

      it('adjust', () => {
        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
            cy.get('.primary-drag-adjust').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: -100,
              y: 250,
              button: 0,
            })
          })

        cy.percySnapshot()
        cy.wait(1000)
      })

      it('none', () => {
        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
            cy.get('.primary-drag-none').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: 250,
              y: 350,
              button: 0,
            })
          })

        cy.percySnapshot()
        cy.wait(1000)
      })
    })

    describe('Secondary Drag', () => {
      it('pan', () => {
        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
            cy.get('.secondary-drag-pan').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: 50,
              y: 180,
              button: 2,
            })
          })

        cy.percySnapshot()
        cy.wait(1000)
      })

      it('adjust', () => {
        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
            cy.get('.secondary-drag-adjust').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: 250,
              y: 400,
              button: 2,
            })
          })

        cy.percySnapshot()
        cy.wait(1000)
      })

      it('none', () => {
        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
            cy.get('.secondary-drag-none').click()
            cy.get('.cornerstone-canvas-wrapper').dragCanvas({
              x: -50,
              y: -30,
              button: 0,
            })
          })

        cy.percySnapshot()
        cy.wait(1000)
      })
    })

    describe('Primary Click', () => {
      const CLIENT_X = 400
      const CLIENT_Y = 610

      it('normal click', { scrollBehavior: false }, () => {
        cy.get('.primary-click').click()

        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
            cy.get('.cornerstone-canvas-wrapper').mouseclick({
              x: CLIENT_X,
              y: CLIENT_Y,
              button: 0,
            })
            cy.percySnapshot()
            cy.wait(1000)
          })
      })

      it('click after panning', { scrollBehavior: false }, () => {
        cy.get('.primary-drag-pan').click() // for dragging
        cy.get('.primary-click').click()

        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
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
            cy.wait(1000)
          })
      })
    })

    describe('Secondary Click', () => {
      const CLIENT_X = 849
      const CLIENT_Y = 838

      it('normal click', { scrollBehavior: false }, () => {
        cy.get('.primary-click').click()

        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
            cy.get('.cornerstone-canvas-wrapper').mouseclick({
              x: CLIENT_X,
              y: CLIENT_Y,
              button: 0,
            })
            cy.percySnapshot()
            cy.wait(1000)
          })
      })

      it('click after panning', { scrollBehavior: false }, () => {
        cy.get('.primary-drag-pan').click() // for dragging
        cy.get('.primary-click').click()

        cy.get('.scale')
          .contains(DEFAULT_SCALE)
          .then(() => {
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
            cy.wait(1000)
          })
      })
    })
  })
})
