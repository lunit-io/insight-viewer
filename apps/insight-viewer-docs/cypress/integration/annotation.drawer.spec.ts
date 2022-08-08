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
        const beforeMovePolygonPoints =
          '195.49999999999997,238.26562499999997 191.49999999999997,238.26562499999997 189.49999999999997,238.26562499999997 186.49999999999997,240.26562499999997 183.49999999999997,241.26562499999997 181.49999999999997,242.26562499999994 178.49999999999997,244.26562499999997 175.49999999999997,246.26562499999994 170.49999999999997,249.26562499999994 167.49999999999997,253.26562499999997 164.49999999999997,256.26562499999994 160.49999999999997,259.26562499999994 158.49999999999997,262.26562499999994 154.49999999999997,265.26562499999994 154.49999999999997,266.26562499999994 150.49999999999997,270.26562499999994 148.49999999999997,272.26562499999994 148.49999999999997,274.26562499999994 146.49999999999997,276.26562499999994 146.49999999999997,277.265625 146.49999999999997,280.265625 148.49999999999997,283.26562499999994 148.49999999999997,285.26562499999994 150.49999999999997,287.26562499999994 151.49999999999997,289.26562499999994 154.49999999999997,291.26562499999994 156.49999999999997,293.265625 160.49999999999997,297.26562499999994 163.49999999999997,298.26562499999994 169.49999999999997,301.26562499999994 173.49999999999997,302.26562499999994 179.49999999999997,304.26562499999994 184.49999999999997,305.26562499999994 187.49999999999994,306.26562499999994 192.49999999999997,306.26562499999994 195.49999999999997,307.26562499999994 201.49999999999997,308.26562499999994 205.49999999999997,308.26562499999994 209.5,308.26562499999994 211.49999999999997,308.26562499999994 212.49999999999997,308.26562499999994 213.49999999999994,308.26562499999994 214.49999999999997,307.26562499999994 215.49999999999997,307.26562499999994 217.49999999999997,306.26562499999994 219.49999999999994,306.26562499999994 221.49999999999997,304.26562499999994 222.49999999999994,303.26562499999994 222.49999999999994,303.26562499999994 223.49999999999997,301.26562499999994 225.49999999999997,297.26562499999994 225.49999999999997,295.26562499999994 226.49999999999994,293.265625 227.49999999999997,290.26562499999994 228.49999999999997,285.26562499999994 230.49999999999997,281.26562499999994 230.49999999999997,279.26562499999994 231.49999999999997,277.265625 231.49999999999997,274.26562499999994 231.49999999999997,272.26562499999994 231.49999999999997,270.26562499999994 229.49999999999994,266.26562499999994 227.49999999999997,264.265625 225.49999999999997,261.265625 223.49999999999997,257.26562499999994 222.49999999999994,254.26562499999997 220.49999999999997,252.26562499999994 219.49999999999994,249.26562499999994 219.49999999999994,249.26562499999994 217.49999999999997,247.26562499999997 214.49999999999997,246.26562499999994 211.49999999999997,244.26562499999997 208.49999999999997,242.26562499999994 208.49999999999997,241.26562499999997 206.49999999999994,240.26562499999997 206.49999999999994,239.26562499999994 205.49999999999997,239.26562499999994 204.49999999999997,238.26562499999997 203.49999999999994,237.26562499999997 203.49999999999994,237.26562499999997 203.49999999999994,236.26562499999994 202.49999999999997,236.26562499999994 202.49999999999997,236.26562499999994 202.49999999999997,236.26562499999994'
        const movedPolygonPoints =
          '265.5,308.26562499999994 261.5,308.26562499999994 259.5,308.26562499999994 256.5,310.26562499999994 253.5,311.26562499999994 251.49999999999997,312.26562499999994 248.5,314.26562499999994 245.5,316.26562499999994 240.5,319.26562499999994 237.49999999999997,323.26562499999994 234.5,326.26562499999994 230.5,329.26562499999994 228.50000000000003,332.26562499999994 224.49999999999997,335.26562499999994 224.49999999999997,336.26562499999994 220.5,340.26562499999994 218.49999999999997,342.26562499999994 218.49999999999997,344.26562499999994 216.5,346.26562499999994 216.5,347.26562499999994 216.5,350.26562499999994 218.49999999999997,353.265625 218.49999999999997,355.26562499999994 220.5,357.26562499999994 221.5,359.265625 224.49999999999997,361.26562499999994 226.5,363.26562499999994 230.5,367.26562499999994 233.5,368.26562499999994 239.5,371.265625 243.5,372.265625 249.5,374.26562499999994 254.49999999999997,375.26562499999994 257.5,376.26562499999994 262.5,376.26562499999994 265.5,377.26562499999994 271.5,378.265625 275.5,378.265625 279.5,378.265625 281.5,378.265625 282.5,378.265625 283.5,378.265625 284.5,377.26562499999994 285.5,377.26562499999994 287.5,376.26562499999994 289.5,376.26562499999994 291.5,374.26562499999994 292.49999999999994,373.26562499999994 292.49999999999994,373.26562499999994 293.5,371.265625 295.5,367.26562499999994 295.5,365.265625 296.5,363.26562499999994 297.5,360.26562499999994 298.5,355.26562499999994 300.5,351.26562499999994 300.5,349.26562499999994 301.5,347.26562499999994 301.5,344.26562499999994 301.5,342.26562499999994 301.5,340.26562499999994 299.5,336.26562499999994 297.5,334.26562499999994 295.5,331.26562499999994 293.5,327.26562499999994 292.49999999999994,324.26562499999994 290.5,322.26562499999994 289.5,319.26562499999994 289.5,319.26562499999994 287.5,317.26562499999994 284.5,316.26562499999994 281.5,314.26562499999994 278.5,312.26562499999994 278.5,311.26562499999994 276.5,310.26562499999994 276.5,309.26562499999994 275.5,309.26562499999994 274.5,308.26562499999994 273.5,307.26562499999994 273.5,307.26562499999994 273.5,306.26562499999994 272.5,306.26562499999994 272.5,306.26562499999994 272.5,306.26562499999994'

        cy.get('[data-cy-edit="false"]').click()

        cy.get(`${targetDataAttr} > polygon`).invoke('attr', 'points').should('equal', beforeMovePolygonPoints)

        moveAnnotation(targetAnnotation, MOVING_DISTANCE)

        // count Line Annotation
        cy.get('[data-cy-id]').should('have.length', mockPolygonAnnotationLength - 1)

        // check moved Points of Line Annotation
        cy.get(`${targetDataAttr} > polygon`).invoke('attr', 'points').should('equal', movedPolygonPoints)
      })
    })

    describe('Line Annotation', () => {
      const mockLineAnnotationLength = LINE_ANNOTATIONS.length

      it('click reset', () => {
        cy.get('[data-cy-name="remove-button"]').click()
        cy.get('[data-cy-edit="true"]').click()
      })

      it('click line radio', () => {
        cy.get('[data-id-line]').click()
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
        const movedPolylinePoints = '251.49999999999994,363.26562499999994 360.49999999999994,393.26562499999994'

        cy.get('[data-cy-edit="false"]').click()

        moveAnnotation(targetAnnotation, MOVING_DISTANCE)

        // count Line Annotation
        cy.get('[data-cy-id]').should('have.length', mockLineAnnotationLength - 1)

        // check moved Points of Line Annotation
        cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', movedPolylinePoints)
      })

      it('edit start point position', () => {
        const targetAnnotation = LINE_ANNOTATIONS[3]
        const startPoint = targetAnnotation.points[0]
        const targetDataAttr = `[data-cy-id="${targetAnnotation.id}"]`
        const beforeEditpolylinePoints = '350.49999999999994,257.26562499999994 284.49999999999994,353.26562499999994'
        const editedPolylinePoints = '450.49999999999994,357.26562499999994 284.49999999999994,353.26562499999994'

        // check point coordinates before editing
        cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', beforeEditpolylinePoints)

        cy.get(targetDataAttr).click({ force: true })

        editAnnotation(startPoint, 100)

        // check point coordinates after editing
        cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', editedPolylinePoints)
      })

      it('edit end point position', () => {
        const targetAnnotation = LINE_ANNOTATIONS[3]
        const endPoint = targetAnnotation.points[1]
        const targetDataAttr = `[data-cy-id="${targetAnnotation.id}"]`
        const beforeEditpolylinePoints = '450.49999999999994,357.26562499999994 284.49999999999994,353.26562499999994'
        const editedPolylinePoints = '450.49999999999994,357.26562499999994 384.4999999999999,453.26562499999994'

        // check point coordinates before editing
        cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', beforeEditpolylinePoints)

        cy.get(targetDataAttr).click({ force: true })

        editAnnotation(endPoint, 100)

        // check point coordinates after editing
        cy.get(`${targetDataAttr} > polyline`).invoke('attr', 'points').should('equal', editedPolylinePoints)
      })
    })
  }
)
