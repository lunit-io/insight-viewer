import type { Annotation, Measurement } from '@lunit/insight-viewer'

export function setup(): void {
  // ResizeObserver loop limit exceeded
  // https://github.com/cypress-io/cypress/issues/8418
  const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
  Cypress.on('uncaught:exception', err => {
    /* returning false here prevents Cypress from failing the test */
    if (resizeObserverLoopErrRe.test(err.message)) {
      return false
    }
    return false
  })
}

type DomClickTestState = 'not.exist' | 'exist'

export function deleteAndCheckAnnotationOrMeasurement(
  element: Annotation | Measurement,
  state: DomClickTestState = 'exist'
): void {
  const targetDataAttr = `[data-cy-id="${element.id - 1}"]`

  cy.get(targetDataAttr).click({ force: true })
  cy.get(targetDataAttr).should(state)
}

export function deleteAndCheckMultiAnnotationOrMeasurement(
  elements: Annotation[] | Measurement[],
  state: DomClickTestState = 'exist'
): void {
  elements.forEach(element => deleteAndCheckAnnotationOrMeasurement(element, state))
}
