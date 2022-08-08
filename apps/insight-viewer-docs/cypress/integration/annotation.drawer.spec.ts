import { setup, drawAnnotation, moveAnnotation, deleteAndCheckAnnotationOrMeasurement } from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import { POLYGON_ANNOTATIONS } from '../../mocks/polygons'

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

      it('count polygon annotation', () => {
        cy.get('[data-cy-id]').should('have.length', 0)
      })

      it('Annotation polygon drawing', () => {
        drawAnnotation(POLYGON_ANNOTATIONS)

        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength)
      })

      it('delete polygon annotation and count annotation', () => {
        const targetAnnotation = POLYGON_ANNOTATIONS[1]

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation, 'not.exist')
        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength - 1)
      })

      it('move polygon annotation', () => {
        cy.get('[data-cy-edit="false"]').click()

        moveAnnotation(POLYGON_ANNOTATIONS[2], 300)
      })
    })
  }
)
