import { setup } from '../support/utils'
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
          const targetId = annotation.id
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
          const targetId = annotation.id
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
    })

    describe('Line Annotation', () => {
      const mockLineAnnotationLength = LINE_ANNOTATIONS.length

      it('click line radio', () => {
        cy.get('[value="line"]').click({ force: true })
      })

      it('count line annotation', () => {
        cy.get('[data-cy-id]').should('have.length', mockLineAnnotationLength)
      })
    })

    describe('Free Line Annotation', () => {
      const mockFreeLineAnnotationLength = FREELINE_ANNOTATIONS.length

      it('click freeline radio', () => {
        cy.get('[value="freeLine"]').click({ force: true })
      })

      it('count freeline annotation', () => {
        cy.get('[data-cy-id]').should('have.length', mockFreeLineAnnotationLength)
      })
    })

    describe('Text Annotation', () => {
      const mockTextAnnotationLength = TEXT_ANNOTATIONS.length

      it('click text radio', () => {
        cy.get('[value="text"]').click({ force: true })
      })

      it('count text annotation', () => {
        cy.get('[data-cy-id]').should('have.length', mockTextAnnotationLength)
      })
    })
  }
)
