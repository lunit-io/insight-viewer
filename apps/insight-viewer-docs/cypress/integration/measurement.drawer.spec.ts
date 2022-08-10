import {
  setup,
  editPoint,
  moveMeasurement,
  drawMeasurement,
  drawMeasurements,
  deleteAndCheckAnnotationOrMeasurement,
} from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import { RULER_MEASUREMENTS, SMALLER_THAN_MINIMUM_LENGTH_RULER_MEASUREMENT } from '../../mocks/ruler'

describe(
  'Measurement Drawer',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    const MOVING_DISTANCE = 100

    before(() => {
      setup()
      cy.visit('/measurement')
    })

    it('shows initial measurement drawer', () => {
      cy.get($LOADED).should('be.exist')
      cy.get('[data-cy-tab="drawer"]').click()
    })

    describe('Ruler Measurement', () => {
      // Gets the number of ruler mock data used by Measurement Viewer docs
      const mockRulerMeasurementLength = RULER_MEASUREMENTS.length

      it('count polygon annotation before drawing', () => {
        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('cancel drawing if smaller than the minimum length', () => {
        drawMeasurement(SMALLER_THAN_MINIMUM_LENGTH_RULER_MEASUREMENT)

        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('drawing ruler measurement', () => {
        drawMeasurements(RULER_MEASUREMENTS)

        cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength)
      })

      it('delete ruler measurement and count measurement', () => {
        const targetMeasurement = RULER_MEASUREMENTS[1]

        deleteAndCheckAnnotationOrMeasurement(targetMeasurement, 'not.exist')

        cy.get('[data-cy-id]').should('have.length', mockRulerMeasurementLength - 1)
      })

      it('move ruler measurement', () => {
        const targetMeasurement = RULER_MEASUREMENTS[2]
        const targetDataAttr = `[data-cy-id="${targetMeasurement.id}"]`

        const beforeMovePoints = '348.99999999999994,222.26562499999997 267,240.26562499999997'
        const movedPoints = '344.89142857142843,292.265625 262.8914285714285,310.265625'

        cy.get('[data-cy-edit="false"]').click()

        cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', beforeMovePoints)

        moveMeasurement(targetMeasurement, MOVING_DISTANCE)

        // TODO: 현재 measurement id 값 계산하는 로직 수정이 필요 이에 대한 반영 시 하기 테스트 코드도 수정
        const lastMeasurement = RULER_MEASUREMENTS[RULER_MEASUREMENTS.length - 1]
        const lastTargetDataAttr = `[data-cy-id="${lastMeasurement.id + 1}"]`

        cy.get(`${lastTargetDataAttr} > polyline`).invoke('attr', 'points').should('equal', movedPoints)
      })

      it('edit start point of ruler measurement', () => {
        const targetMeasurement = RULER_MEASUREMENTS[3]
        const [startPoint] = targetMeasurement.points
        const targetDataAttr = `[data-cy-id="${targetMeasurement.id}"]`

        const beforeMovePoints = '300.99999999999994,349.26562499999994 224.99999999999997,367.26562499999994'
        const movedPoints = '400.9999999999999,449.2656249999999 224.99999999999997,367.26562499999994'

        cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', beforeMovePoints)
        cy.get(targetDataAttr).click({ force: true })

        editPoint(startPoint, MOVING_DISTANCE)

        // TODO: 현재 measurement id 값 계산하는 로직 수정이 필요 이에 대한 반영 시 하기 테스트 코드도 수정
        const lastMeasurement = RULER_MEASUREMENTS[RULER_MEASUREMENTS.length - 1]
        const lastTargetDataAttr = `[data-cy-id="${lastMeasurement.id + 2}"]`

        cy.get(`${lastTargetDataAttr} > polyline`).invoke('attr', 'points').should('equal', movedPoints)
      })
    })
  }
)
