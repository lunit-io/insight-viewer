import { setup, drawMeasurements, deleteAndCheckAnnotationOrMeasurement } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import { RULER_MEASUREMENTS, MEASURED_ANNOTATIONS } from '@insight-viewer-library/fixtures'

describe(
  'Measurement Drawer',
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

    it('shows initial measurement drawer', () => {
      cy.get($LOADED).should('be.exist')
    })

    describe('Ruler Measurement', () => {
      // Gets the number of ruler mock data used by Measurement Viewer docs
      const mockRulerMeasurementLength = RULER_MEASUREMENTS.length

      it('count polygon annotation before drawing', () => {
        cy.get('[data-cy-id]').should('have.length', MEASURED_ANNOTATIONS.length)
      })

      it('drawing ruler measurement', () => {
        drawMeasurements(RULER_MEASUREMENTS)

        cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength + MEASURED_ANNOTATIONS.length)
      })

      it('delete ruler measurement and count measurement', () => {
        const targetMeasurement = MEASURED_ANNOTATIONS[0]

        deleteAndCheckAnnotationOrMeasurement(targetMeasurement, 'not.exist')

        cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength + MEASURED_ANNOTATIONS.length - 1)
      })
    })
  }
)
