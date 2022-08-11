import {
  setup,
  editPoint,
  moveMeasurement,
  drawMeasurements,
  deleteAndCheckAnnotationOrMeasurement,
} from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import { RULER_MEASUREMENTS } from '../../mocks/ruler'

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
        const beforeDomRectPostion = { x: 364.84375, y: 478 }
        const movedDomRectPostion = { x: 368.73516845703125, y: 548 }

        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(beforeDomRectPostion.x)
          expect(element.y).equal(beforeDomRectPostion.y)
        })

        cy.get('[data-cy-edit="false"]').click()

        moveMeasurement(targetMeasurement, MOVING_DISTANCE)

        // TODO: 현재 measurement id 값 계산하는 로직 수정이 필요 이에 대한 반영 시 하기 테스트 코드도 수정
        const lastMeasurement = RULER_MEASUREMENTS[RULER_MEASUREMENTS.length - 1]
        const lastTargetDataAttr = `[data-cy-id="${lastMeasurement.id + 1}"]`

        cy.get(lastTargetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(movedDomRectPostion.x)
          expect(element.y).equal(movedDomRectPostion.y)
        })
      })

      it('edit start point of ruler measurement', () => {
        const targetMeasurement = RULER_MEASUREMENTS[3]
        const [startPoint] = targetMeasurement.points
        const targetDataAttr = `[data-cy-id="${targetMeasurement.id}"]`
        const beforeDomRectPostion = { x: 324.94140625, y: 605 }
        const movedDomRectPostion = { x: 323.71875, y: 623 }

        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(beforeDomRectPostion.x)
          expect(element.y).equal(beforeDomRectPostion.y)
        })

        cy.get(targetDataAttr).click({ force: true })

        editPoint(startPoint, MOVING_DISTANCE)

        // TODO: 현재 measurement id 값 계산하는 로직 수정이 필요 이에 대한 반영 시 하기 테스트 코드도 수정
        const lastMeasurement = RULER_MEASUREMENTS[RULER_MEASUREMENTS.length - 1]
        const lastTargetDataAttr = `[data-cy-id="${lastMeasurement.id + 2}"]`

        cy.get(lastTargetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(movedDomRectPostion.x)
          expect(element.y).equal(movedDomRectPostion.y)
        })
      })
    })
  }
)
