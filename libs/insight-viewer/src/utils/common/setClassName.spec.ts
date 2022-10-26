import { setClassName } from './setClassName'
import type { EnabledElement } from 'cornerstone-core'

describe('setClassName :', () => {
  it('should do nothing when enabledElement is null', () => {
    const enabledElement = null
    const cursorStatus = 'drawing'

    setClassName(enabledElement, cursorStatus)

    expect(enabledElement).toBeNull()
  })

  it('should remove all classes when cursorStatus is null', () => {
    const enabledElement = {
      element: {
        classList: {
          add: jest.fn(),
          remove: jest.fn(),
        },
      },
    } as unknown as EnabledElement

    setClassName(enabledElement, null)

    expect(enabledElement.element.classList.add).toHaveBeenCalledTimes(0)
    expect(enabledElement.element.classList.remove).toHaveBeenCalledTimes(3)
  })

  it('should remove drawing, moving, editing className', () => {
    const element = document.createElement('div')
    element.classList.add('MOCK_CLASS_NAME')

    const enabledElement = {
      element,
    } as unknown as EnabledElement

    setClassName(enabledElement, 'drawing')

    expect(enabledElement.element.classList.contains('drawing')).toBeTruthy()
    expect(enabledElement.element.classList.contains('moving')).toBeFalsy()
    expect(enabledElement.element.classList.contains('editing')).toBeFalsy()

    setClassName(enabledElement, 'moving')

    expect(enabledElement.element.classList.contains('drawing')).toBeFalsy()
    expect(enabledElement.element.classList.contains('moving')).toBeTruthy()
    expect(enabledElement.element.classList.contains('editing')).toBeFalsy()

    setClassName(enabledElement, 'editing')

    expect(enabledElement.element.classList.contains('drawing')).toBeFalsy()
    expect(enabledElement.element.classList.contains('moving')).toBeFalsy()
    expect(enabledElement.element.classList.contains('editing')).toBeTruthy()
  })
})
