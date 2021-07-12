// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  interface Chainable {
    dragCanvas({ x, y, button }: { x: number; y: number; button: number }): void
  }
}

Cypress.Commands.add(
  'dragCanvas',
  { prevSubject: 'element' },
  (element, { x, y, button }) => {
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
  }
)
