import { setup } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import { RULER_MEASUREMENTS, CIRCLE_MEASUREMENTS } from '@insight-viewer-library/fixtures'

describe(
  'Measurement Viewer',
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

    it('shows initial measurement viewer', () => {
      cy.get($LOADED).should('be.exist')
    })

    describe('Ruler Measurement', () => {
      // Gets the number of ruler mock data used by Measurement Viewer docs
      const mockRulerMeasurementLength = RULER_MEASUREMENTS.length

      it('count ruler measurement', () => {
        cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength)
      })
    })

    describe('Circle Measurement', () => {
      // Gets the number of circle mock data used by Measurement Viewer docs
      const mockCircleMeasurementLength = CIRCLE_MEASUREMENTS.length

      it('initial setting of circle measurement testing', () => {
        cy.get('[value="circle"]').click({ force: true })
      })

      it('count circle measurement', () => {
        cy.get('[data-cy-id]').should('have.length', mockCircleMeasurementLength)
      })
    })
  }
)
