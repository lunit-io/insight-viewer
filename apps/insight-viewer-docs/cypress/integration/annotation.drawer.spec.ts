import {
  setup,
  moveAnnotation,
  editAnnotation,
  drawAnnotation,
  drawAnnotations,
  deleteAndCheckAnnotationOrMeasurement,
} from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import {
  POLYGON_ANNOTATIONS,
  INTERSECTING_POLYGON_ANNOTATION,
  SMALLER_THAN_MINIMUM_AREA_POLYGON_ANNOTATION,
} from '../../mocks/polygons'
import { LINE_ANNOTATIONS, SMALLER_THAN_MINIMUM_LENGTH_LINE_ANNOTATION } from '../../mocks/lines'
import { FREELINE_ANNOTATIONS, SMALLER_THAN_MINIMUM_LENGTH_FREE_LINE_ANNOTATION } from '../../mocks/freeLines'

describe(
  'annotation drawer',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    const MOVING_DISTANCE = 100

    before(() => {
      setup()
      cy.visit('/annotation')
    })

    it('shows initial annotation', () => {
      cy.get($LOADED).should('be.exist')
      cy.get('[data-cy-tab="drawer"]').click()
    })

    describe('Polygon Annotation', () => {
      const mockPolygonAnnotationLength = POLYGON_ANNOTATIONS.length

      it('count polygon annotation before drawing', () => {
        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('cancel drawing when drawing intersecting polygons', () => {
        drawAnnotation(INTERSECTING_POLYGON_ANNOTATION)

        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('cancel drawing if smaller than the minimum area', () => {
        drawAnnotation(SMALLER_THAN_MINIMUM_AREA_POLYGON_ANNOTATION)

        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('Annotation polygon drawing', () => {
        drawAnnotations(POLYGON_ANNOTATIONS)

        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength)
      })

      it('delete polygon annotation and count annotation', () => {
        const targetAnnotation = POLYGON_ANNOTATIONS[1]

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation, 'not.exist')
        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength - 1)
      })

      it('move polygon annotation', () => {
        const targetAnnotation = POLYGON_ANNOTATIONS[2]
        const targetDataAttr = `[data-cy-id="${targetAnnotation.id}"]`
        const beforeDomRectPostion = { x: 259, y: 516 }
        const movedDomRectPostion = { x: 329, y: 586 }

        cy.get('[data-cy-edit="false"]').click()
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(beforeDomRectPostion.x)
          expect(element.y).equal(beforeDomRectPostion.y)
        })

        moveAnnotation(targetAnnotation, MOVING_DISTANCE)

        // count Line Annotation
        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength - 1)
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(movedDomRectPostion.x)
          expect(element.y).equal(movedDomRectPostion.y)
        })
      })
    })

    describe('Line Annotation', () => {
      const mockLineAnnotationLength = LINE_ANNOTATIONS.length

      it('click reset', () => {
        cy.get('[data-cy-name="remove-button"]').click()
        cy.get('[data-cy-edit="true"]').click()
      })

      it('click line radio', () => {
        cy.get('[value="line"]').click({ force: true })
      })

      it('count line annotation before drawing', () => {
        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('cancel drawing if smaller than the minimum length', () => {
        drawAnnotation(SMALLER_THAN_MINIMUM_LENGTH_LINE_ANNOTATION)

        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('Annotation line drawing', () => {
        drawAnnotations(LINE_ANNOTATIONS)

        cy.get('[data-cy-id]').should('have.length', mockLineAnnotationLength)
      })

      it('delete line annotation and count annotation', () => {
        const targetAnnotation = LINE_ANNOTATIONS[1]

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation, 'not.exist')
        cy.get('[data-cy-id]').should('have.length', mockLineAnnotationLength - 1)
      })

      it('move line annotation', () => {
        const targetAnnotation = LINE_ANNOTATIONS[2]
        const targetDataAttr = `[data-cy-id="${targetAnnotation.id}"]`
        const beforeDomRectPostion = { x: 261.765625, y: 527.6640625 }
        const movedDomRectPostion = { x: 356.765625, y: 622.6640625 }

        cy.get('[data-cy-edit="false"]').click()

        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(beforeDomRectPostion.x)
          expect(element.y).equal(beforeDomRectPostion.y)
        })

        moveAnnotation(targetAnnotation, MOVING_DISTANCE)

        // count Line Annotation
        cy.get('[data-cy-id]').should('have.length', mockLineAnnotationLength - 1)

        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(movedDomRectPostion.x)
          expect(element.y).equal(movedDomRectPostion.y)
        })
      })

      it('edit start point position', () => {
        const targetAnnotation = LINE_ANNOTATIONS[3]
        const startPoint = targetAnnotation.points[0]
        const targetDataAttr = `[data-cy-id="${targetAnnotation.id}"]`
        const beforeDomRectPostion = { x: 397, y: 516.6640625 }
        const movedDomRectPostion = { x: 397, y: 616.6640625 }

        // check point coordinates before editing
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(beforeDomRectPostion.x)
          expect(element.y).equal(beforeDomRectPostion.y)
        })

        cy.get(targetDataAttr).click({ force: true })

        editAnnotation(startPoint, 100)

        // check point coordinates after editing
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(movedDomRectPostion.x)
          expect(element.y).equal(movedDomRectPostion.y)
        })
      })

      it('edit end point position', () => {
        const targetAnnotation = LINE_ANNOTATIONS[3]
        const endPoint = targetAnnotation.points[1]
        const targetDataAttr = `[data-cy-id="${targetAnnotation.id}"]`
        const beforeDomRectPostion = { x: 397, y: 616.6640625 }
        const movedDomRectPostion = { x: 497, y: 616.6640625 }

        // check point coordinates before editing
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(beforeDomRectPostion.x)
          expect(element.y).equal(beforeDomRectPostion.y)
        })

        cy.get(targetDataAttr).click({ force: true })

        editAnnotation(endPoint, 100)

        // check point coordinates after editing
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(movedDomRectPostion.x)
          expect(element.y).equal(movedDomRectPostion.y)
        })
      })
    })

    describe('Free Line Annotation', () => {
      const mockFreelineAnnotationLength = FREELINE_ANNOTATIONS.length

      it('click reset', () => {
        cy.get('[data-cy-name="remove-button"]').click()
        cy.get('[data-cy-edit="true"]').click()
      })

      it('click line radio', () => {
        cy.get('[value="freeLine"]').click({ force: true })
      })

      it('count freeline annotation before drawing', () => {
        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('cancel drawing if smaller than the minimum area', () => {
        drawAnnotation(SMALLER_THAN_MINIMUM_LENGTH_FREE_LINE_ANNOTATION)

        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('Annotation freeline drawing', () => {
        drawAnnotations(FREELINE_ANNOTATIONS)

        cy.get('[data-cy-id]').should('have.length', mockFreelineAnnotationLength)
      })

      it('delete freeline annotation and count annotation', () => {
        const targetAnnotation = FREELINE_ANNOTATIONS[1]

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation, 'not.exist')
        cy.get('[data-cy-id]').should('have.length', mockFreelineAnnotationLength - 1)
      })

      it('move freeline annotation', () => {
        const targetAnnotation = FREELINE_ANNOTATIONS[2]
        const targetDataAttr = `[data-cy-id="${targetAnnotation.id}"]`
        const beforeDomRectPostion = { x: 390, y: 556 }
        const movedDomRectPostion = { x: 460, y: 626 }

        cy.get('[data-cy-edit="false"]').click()

        // cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', beforeMovePolygonPoints)
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(beforeDomRectPostion.x)
          expect(element.y).equal(beforeDomRectPostion.y)
        })

        moveAnnotation(targetAnnotation, MOVING_DISTANCE)

        // count Line Annotation
        cy.get('[data-cy-id]').should('have.length', mockFreelineAnnotationLength - 1)

        // check moved Points of Line Annotation
        cy.get(targetDataAttr).then($element => {
          const element = $element[0].getBoundingClientRect()

          expect(element.x).equal(movedDomRectPostion.x)
          expect(element.y).equal(movedDomRectPostion.y)
        })
      })
    })
  }
)
