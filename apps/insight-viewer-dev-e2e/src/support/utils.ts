import type { Point } from '@lunit/insight-viewer'
import type { Annotation } from '@lunit/insight-viewer/annotation'

export function setup(): void {
  // ResizeObserver loop limit exceeded
  // https://github.com/cypress-io/cypress/issues/8418
  const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
  Cypress.on('uncaught:exception', (err) => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
      return false
    }
    return false
  })
}

type DomElementExistState = 'not.exist' | 'exist'

export function deleteAndCheckAnnotation(
  annotation: Annotation,
  domElementState: DomElementExistState = 'exist'
): void {
  const targetDataAttr = `[data-cy-id="${annotation.id}"]`

  cy.get(targetDataAttr).click({ force: true })
  cy.get(targetDataAttr).should(domElementState)
}

export function deleteAndCheckMultiAnnotationOrMeasurement(
  annotations: Annotation[],
  domElementState: DomElementExistState = 'exist'
): void {
  annotations.forEach((annotation) => deleteAndCheckAnnotation(annotation, domElementState))
}

export function drawAnnotation(annotation: Annotation): void {
  const { type } = annotation
  cy.get('.cornerstone-canvas-wrapper').as('canvas')

  if (type === 'freeLine' || type === 'polygon') {
    annotation.points.forEach(([x, y], i) => {
      if (i === 0) {
        cy.get('@canvas').trigger('mousedown', {
          x,
          y,
          button: 0,
        })
      } else if (i === annotation.points.length - 1) {
        cy.get('@canvas').trigger('mouseup', { button: 0 })
      } else {
        cy.get('@canvas').trigger('mousemove', {
          x,
          y,
          button: 0,
        })
      }
    })
    return
  }

  if (type === 'arrowLine' || type === 'line') {
    const [startPoint, endPoint] = annotation.points

    cy.get('@canvas')
      .trigger('mousedown', { x: startPoint[0], y: startPoint[1], button: 0 })
      .trigger('mousemove', { x: endPoint[0], y: endPoint[1], button: 0 })
      .trigger('mouseup', { button: 0 })

    return
  }

  if (type === 'ruler') {
    const [startPoint, endPoint] = annotation.startAndEndPoint

    cy.get('@canvas')
      .trigger('mousedown', { x: startPoint[0], y: startPoint[1], button: 0 })
      .trigger('mousemove', { x: endPoint[0], y: endPoint[1], button: 0 })
      .trigger('mouseup', { button: 0 })
  }

  if (type === 'area') {
    const { centerPoint, radius } = annotation
    const startPoint: Point = [centerPoint[0] - radius, centerPoint[1]]
    const endPoint: Point = [annotation.centerPoint[0] + radius, centerPoint[1]]
    cy.get('@canvas')
      .trigger('mousedown', { x: startPoint[0], y: startPoint[1], button: 0 })
      .trigger('mousemove', { x: endPoint[0], y: endPoint[1], button: 0 })
      .trigger('mouseup', { button: 0 })
  }
}

export function drawAnnotations(annotations: Annotation[]): void {
  annotations.forEach(drawAnnotation)
}
