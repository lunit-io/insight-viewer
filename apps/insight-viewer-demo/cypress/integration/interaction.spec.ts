import '@percy/cypress'
import { setup } from '../support/utils'
import { DEFAULT_SCALE } from '../../src/containers/Interaction/const'

describe('Interaction', () => {
  before(() => {
    setup()
  })

  beforeEach(() => {
    cy.visit('/interaction')
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
  })
})
