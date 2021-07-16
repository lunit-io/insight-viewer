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

export function getCurrentWindowWidth(x: number, windowWidth?: number): number {
  const ww =
    typeof windowWidth !== 'undefined'
      ? windowWidth
      : Number(Cypress.$('.windowWidth').text())
  return ww + x / Number(Cypress.$('.scale').text())
}

export function getCurrentWindowCenter(
  y: number,
  windowCenter?: number
): number {
  const wc =
    typeof windowCenter !== 'undefined'
      ? windowCenter
      : Number(Cypress.$('.windowCenter').text())
  return wc + y / Number(Cypress.$('.scale').text())
}

export function getCurrentX(x: number): number {
  return Number(Cypress.$('.x').text()) + x / Number(Cypress.$('.scale').text())
}

export function getCurrentY(y: number): number {
  return Number(Cypress.$('.y').text()) + y / Number(Cypress.$('.scale').text())
}
