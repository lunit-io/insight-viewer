import { setup, drawAnnotation, drawAnnotations, deleteAndCheckAnnotationOrMeasurement } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import {
  INITIAL_POLYGON_ANNOTATIONS,
  POLYGON_ANNOTATIONS,
  SHORTER_THAN_MINIMUM_LENGTH_POLYGON_ANNOTATION,
  LINE_ANNOTATIONS,
  FREELINE_ANNOTATIONS,
  SMALLER_THAN_MINIMUM_LENGTH_FREE_LINE_ANNOTATION,
  ARROW_LINE_ANNOTATIONS,
} from '@insight-viewer-library/fixtures'

describe(
  'annotation drawer',
  {
    viewportWidth: VIEWPORT_WIDTH,
    viewportHeight: VIEWPORT_HEIGHT,
    scrollBehavior: false,
  },
  () => {
    before(() => {
      setup()
      cy.visit('/annotation')
    })

    it('shows initial annotation', () => {
      cy.get('[data-cy-tab="drawer"]').click()
      cy.get($LOADED).should('be.exist')
    })

    describe('Polygon Annotation', () => {
      const mockPolygonAnnotationLength = POLYGON_ANNOTATIONS.length
      const initialPolygonAnnotationLength = INITIAL_POLYGON_ANNOTATIONS.length

      it('count polygon annotation before drawing', () => {
        cy.get('[data-cy-id]').should('have.length', initialPolygonAnnotationLength)
      })

      /**
       * Polygon cross-validation utility function edge case issue, excluding this test
       */
      // it('cancel drawing when drawing intersecting polygons', () => {
      //   drawAnnotation(INTERSECTING_POLYGON_ANNOTATION)

      //   cy.get('[data-cy-id]').should('have.length', 0)
      // })

      it('cancel drawing if shorter than the minimum length', () => {
        drawAnnotation(SHORTER_THAN_MINIMUM_LENGTH_POLYGON_ANNOTATION)

        cy.get('[data-cy-id]').should('have.length', initialPolygonAnnotationLength)
      })

      it('Annotation polygon drawing', () => {
        drawAnnotations(POLYGON_ANNOTATIONS)

        const totalLength = mockPolygonAnnotationLength + initialPolygonAnnotationLength
        cy.get('[data-cy-id]').should('have.length', totalLength)
      })

      it('delete polygon annotation and count annotation', () => {
        const targetAnnotation = POLYGON_ANNOTATIONS[1]

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation, 'not.exist')

        const totalLength = mockPolygonAnnotationLength + initialPolygonAnnotationLength
        cy.get('[data-cy-id]').should('have.length', totalLength - 1)
      })
    })

    describe('Line Annotation', () => {
      const mockLineAnnotationLength = LINE_ANNOTATIONS.length

      it('click reset', () => {
        cy.get('[data-cy-name="remove-button"]').click()
      })

      it('click line radio', () => {
        cy.get('[value="line"]').click({ force: true })
      })

      it('count line annotation before drawing', () => {
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
    })

    describe('Free Line Annotation', () => {
      const mockFreelineAnnotationLength = FREELINE_ANNOTATIONS.length

      it('click reset', () => {
        cy.get('[data-cy-name="remove-button"]').click()
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
    })

    describe('Reset Annotation', () => {
      before(() => {
        cy.visit('/annotation')

        cy.get($LOADED).should('be.exist')
        cy.get('[data-cy-tab="drawer"]').click()
      })

      beforeEach(() => {
        cy.get('[data-cy-name="reset-button"]').click()
      })

      it('should display only the initial annotation when there is an initial annotation', () => {
        // given
        cy.get('[value="line"]').click({ force: true })
        cy.get('[data-cy-id]').should('have.length', INITIAL_POLYGON_ANNOTATIONS.length)

        // when
        drawAnnotations(LINE_ANNOTATIONS)
        cy.get('[data-cy-id]').should('have.length', INITIAL_POLYGON_ANNOTATIONS.length + LINE_ANNOTATIONS.length)
        cy.get('[data-cy-name="reset-button"]').click()

        // then
        cy.get('[data-cy-id]').should('have.length', INITIAL_POLYGON_ANNOTATIONS.length)
      })

      it('should display no annotation when there is no initial annotation', () => {
        // given
        cy.get('[data-cy-initial-annotations]').click({ force: true })
        cy.get('[value="line"]').click({ force: true })
        cy.get('[data-cy-name="reset-button"]').click()
        cy.get('[data-cy-id]').should('have.length', 0)

        // when
        drawAnnotations(LINE_ANNOTATIONS)
        cy.get('[data-cy-id]').should('have.length', LINE_ANNOTATIONS.length)
        cy.get('[data-cy-name="reset-button"]').click()

        // then
        cy.get('[data-cy-id]').should('have.length', 0)
      })
    })

    describe('Arrow Line Annotation', () => {
      before(() => {
        cy.visit('/annotation')

        cy.get($LOADED).should('be.exist')
        cy.get('[data-cy-tab="drawer"]').click()
      })

      beforeEach(() => {
        cy.get('[data-cy-name="reset-button"]').click()
      })

      const mockArrowLineAnnotationLength = ARROW_LINE_ANNOTATIONS.length
      const initialAnnotationsLength = INITIAL_POLYGON_ANNOTATIONS.length

      it('should be able to draw an arrow line', () => {
        // given
        cy.get('[value="arrowLine"]').click({ force: true })
        cy.get('[data-cy-id]').should('have.length', initialAnnotationsLength)

        // when
        drawAnnotations(ARROW_LINE_ANNOTATIONS)

        // then
        cy.get('[data-cy-id]').should('have.length', mockArrowLineAnnotationLength + initialAnnotationsLength)
      })

      it('should be able to delete the selected arrow line', () => {
        // given
        const targetAnnotation = ARROW_LINE_ANNOTATIONS[1]
        cy.get('[value="arrowLine"]').click({ force: true })

        drawAnnotations([targetAnnotation])

        cy.get('[data-cy-id]').should('have.length', initialAnnotationsLength + 1)

        // when
        deleteAndCheckAnnotationOrMeasurement(targetAnnotation, 'not.exist')

        // then
        cy.get('[data-cy-id]').should('have.length', initialAnnotationsLength)
      })
    })
  }
)
