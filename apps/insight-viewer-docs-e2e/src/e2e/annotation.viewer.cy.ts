import {
  setup,
  deleteAndCheckAnnotationOrMeasurement,
  deleteAndCheckMultiAnnotationOrMeasurement,
} from '../support/utils'
import { VIEWPORT_WIDTH, VIEWPORT_HEIGHT, $LOADED } from '../support/const'
import {
  POLYGON_ANNOTATIONS,
  LINE_ANNOTATIONS,
  FREELINE_ANNOTATIONS,
  TEXT_ANNOTATIONS,
} from '@insight-viewer-library/fixtures'

describe(
  'annotation viewer',
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
    })

    describe('Label', () => {
      it('check value when label switch is on', () => {
        cy.get('[data-cy-show-label="false"]').click()

        POLYGON_ANNOTATIONS.forEach((annotation) => {
          const targetId = annotation.id - 1
          const targetDataAttr = `[data-cy-id="${targetId}"]`

          cy.get(targetDataAttr)
            .invoke('text')
            .then((text) => {
              expect(text).equal(targetId.toString())
            })
        })
      })

      it('check value when label switch is off', () => {
        cy.get('[data-cy-show-label="true"]').click()

        POLYGON_ANNOTATIONS.forEach((annotation) => {
          const targetId = annotation.id - 1
          const targetDataAttr = `[data-cy-id="${targetId}"]`

          cy.get(targetDataAttr)
            .invoke('text')
            .then((text) => {
              expect(text).equal('')
            })
        })
      })
    })

    describe('Polygon Annotation', () => {
      const mockPolygonAnnotationLength = POLYGON_ANNOTATIONS.length

      it('count polygon annotation', () => {
        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength)
      })

      it('Annotation cannot be deleted when remove mode is not activated', () => {
        // Constant DOM Element
        const targetAnnotation = POLYGON_ANNOTATIONS[0]

        // Check Remove mode handling switch disabled
        cy.get('[data-cy-remove-mode="false"]').should('exist')

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation)

        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength)
      })

      it('delete polygon annotation and count annotation', () => {
        cy.get('[data-cy-remove-mode="false"]').click()

        deleteAndCheckMultiAnnotationOrMeasurement(POLYGON_ANNOTATIONS, 'not.exist')

        cy.get('[data-cy-id]').should('have.length', 0)
      })
    })

    describe('Line Annotation', () => {
      const mockLineAnnotationLength = LINE_ANNOTATIONS.length

      it('click line radio', () => {
        // cy.get('input').invoke('attr', 'value').should('eq', 'line').click()
        cy.get('[value="line"]').click({ force: true })
      })

      it('reset remove mode', () => {
        cy.get('[data-cy-remove-mode="true"]').click()
      })

      it('count line annotation', () => {
        cy.get('[data-cy-id]').should('have.length', mockLineAnnotationLength)
      })

      it('Annotation cannot be deleted when remove mode is not activated', () => {
        // Constant DOM Element
        const targetAnnotation = LINE_ANNOTATIONS[0]

        // Check Remove mode handling switch disabled
        cy.get('[data-cy-remove-mode="false"]').should('exist')

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation)

        cy.get('[data-cy-id]').should('have.length', mockLineAnnotationLength)
      })

      it('delete line annotation and count annotation', () => {
        cy.get('[data-cy-remove-mode="false"]').click()

        deleteAndCheckMultiAnnotationOrMeasurement(LINE_ANNOTATIONS, 'not.exist')

        cy.get('[data-cy-id]').should('have.length', 0)
      })
    })

    describe('Free Line Annotation', () => {
      const mockFreeLineAnnotationLength = FREELINE_ANNOTATIONS.length

      it('click freeline radio', () => {
        cy.get('[value="freeLine"]').click({ force: true })
      })

      it('reset remove mode', () => {
        cy.get('[data-cy-remove-mode="true"]').click()
      })

      it('count freeline annotation', () => {
        cy.get('[data-cy-id]').should('have.length', mockFreeLineAnnotationLength)
      })

      it('Annotation cannot be deleted when remove mode is not activated', () => {
        // Constant DOM Element
        const targetAnnotation = FREELINE_ANNOTATIONS[0]

        // Check Remove mode handling switch disabled
        cy.get('[data-cy-remove-mode="false"]').should('exist')

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation)

        cy.get('[data-cy-id]').should('have.length', mockFreeLineAnnotationLength)
      })

      it('delete freeline annotation and count annotation', () => {
        cy.get('[data-cy-remove-mode="false"]').click()

        deleteAndCheckMultiAnnotationOrMeasurement(FREELINE_ANNOTATIONS, 'not.exist')

        cy.get('[data-cy-id]').should('have.length', 0)
      })
    })

    describe('Text Annotation', () => {
      const mockTextAnnotationLength = TEXT_ANNOTATIONS.length

      it('click text radio', () => {
        cy.get('[value="text"]').click({ force: true })
      })

      it('reset remove mode', () => {
        cy.get('[data-cy-remove-mode="true"]').click()
      })

      it('count text annotation', () => {
        cy.get('[data-cy-id]').should('have.length', mockTextAnnotationLength)
      })

      it('Annotation cannot be deleted when remove mode is not activated', () => {
        // Constant DOM Element
        const targetAnnotation = TEXT_ANNOTATIONS[0]

        // Check Remove mode handling switch disabled
        cy.get('[data-cy-remove-mode="false"]').should('exist')

        deleteAndCheckAnnotationOrMeasurement(targetAnnotation)

        cy.get('[data-cy-id]').should('have.length', mockTextAnnotationLength)
      })

      it('delete text annotation and count annotation', () => {
        cy.get('[data-cy-remove-mode="false"]').click()

        deleteAndCheckMultiAnnotationOrMeasurement(TEXT_ANNOTATIONS, 'not.exist')

        cy.get('[data-cy-id]').should('have.length', 0)
      })
    })
  }
)
