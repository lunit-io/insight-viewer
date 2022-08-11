import { setup, drawAnnotation, drawAnnotations, deleteAndCheckAnnotationOrMeasurement } from '../support/utils'
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
    })
  }
)
