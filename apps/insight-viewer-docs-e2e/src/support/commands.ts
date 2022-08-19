// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    dragCanvas({ x, y, button }: { x: number; y: number; button: number }): void
    mousewheel(delta: number, times: number): void
    mouseclick({ x, y, button }: { x: number; y: number; button: number }): void
    controlledInputChange(value: number): void
  }
}

Cypress.Commands.add('dragCanvas', { prevSubject: 'element' }, (element, { x, y, button }) => {
  const canvas = element.get(0)
  const initial = {
    x: 0,
    y: 0,
  }
  const moved = {
    x,
    y,
  }

  canvas.dispatchEvent(
    new MouseEvent('mousedown', {
      clientX: initial.x,
      clientY: initial.y,
      button,
    })
  )
  canvas.dispatchEvent(
    new MouseEvent('mousemove', {
      clientX: initial.x + moved.x,
      clientY: initial.y + moved.y,
      bubbles: true,
      button,
    })
  )
  requestAnimationFrame(() => {
    canvas.dispatchEvent(
      new MouseEvent('mouseup', {
        clientX: initial.x + moved.x,
        clientY: initial.y + moved.y,
        bubbles: true,
      })
    )
  })
})

Cypress.Commands.add('mousewheel', { prevSubject: 'element' }, (element, delta, times: number) => {
  const canvas = element.get(0)

  const arr = [...Array<number>(times).keys()]
  arr.forEach(() => {
    canvas.dispatchEvent(
      new WheelEvent('wheel', {
        deltaY: delta,
      })
    )
  })

  requestAnimationFrame(() => {
    canvas.dispatchEvent(new MouseEvent('mouseleave'))
  })
})

Cypress.Commands.add('mouseclick', { prevSubject: 'element' }, (element, { x, y, button }) => {
  const canvas = element.get(0)

  canvas.dispatchEvent(
    new MouseEvent('mousedown', {
      clientX: x,
      clientY: y,
      button,
    })
  )

  requestAnimationFrame(() => {
    canvas.dispatchEvent(
      new MouseEvent('mouseup', {
        clientX: x,
        clientY: y,
        bubbles: true,
      })
    )
  })
})

Cypress.Commands.add('controlledInputChange', { prevSubject: 'element' }, (element, value) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set

  const changeInputValue = ($range: JQuery) => (newValue: number) => {
    nativeInputValueSetter?.call($range[0], newValue)
    $range[0].dispatchEvent(new Event('change', { bubbles: true }))
  }

  return cy.get(element).then(($input) => changeInputValue($input)(value))
})
