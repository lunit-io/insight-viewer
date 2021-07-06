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
