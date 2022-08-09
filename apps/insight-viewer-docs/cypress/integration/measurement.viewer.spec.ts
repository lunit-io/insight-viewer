import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import { RULER_MEASUREMENTS } from '../../mocks/ruler'

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
      cy.visit('/measurement')
    })

    it('shows initial viewport', () => {
      cy.get($LOADED).should('be.exist')
    })

    describe('Ruler Measurement', () => {
      // Gets the number of ruler mock data used by Measurement Viewer docs
      const mockRulerMeasurementLength = RULER_MEASUREMENTS.length

      it('count ruler measurement', () => {
        cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength)
      })

      it('Measurement cannot be deleted when remove mode is not activated', () => {
        // Constant DOM Element and data-attr
        const targetRulerMeasurement = RULER_MEASUREMENTS[0]
        const targetDataAttr = `[data-cy-id="${targetRulerMeasurement.id}"]`

        // Check Remove mode handling switch disabled
        cy.get('[data-cy-remove-mode="false"]').should('exist')

        // Click target DOM Element
        cy.get(targetDataAttr).click()

        // Check mock measurement list and target Element
        cy.get(targetDataAttr).should('exist')
        cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength)
      })

      it('delete ruler measurement and count measurement', () => {
        cy.get('[data-cy-remove-mode="false"]').click()

        RULER_MEASUREMENTS.forEach((measurement, i) => {
          const targetDataAttr = `[data-cy-id="${measurement.id - 1}"]`

          // Click target DOM Element
          cy.get(targetDataAttr).click({ force: true })

          // Check mock measurement list and target Element
          cy.get(targetDataAttr).should('not.exist')
          cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength - (i + 1))
        })

        cy.get('[data-cy-id]').should('have.length', 0)
      })
    })
  }
)
