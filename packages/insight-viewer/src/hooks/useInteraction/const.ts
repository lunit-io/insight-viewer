export const DRAG = {
  pan: 'pan',
  adjust: 'adjust',
} as const

export const MOUSE_WHEEL = {
  zoom: 'zoom',
} as const

export const MOUSE_BUTTON = {
  primary: 0,
  secondary: 2,
}

export const PRIMARY_DRAG = 'primaryDrag'
export const SECONDARY_DRAG = 'secondaryDrag'
export const PRIMARY_CLICK = 'primaryClick'
export const SECONDARY_CLICK = 'secondaryClick'
export const MOUSEWHEEL = 'mouseWheel'

export const EVENT = {
  [PRIMARY_DRAG]: PRIMARY_DRAG,
  [SECONDARY_DRAG]: SECONDARY_DRAG,
  [PRIMARY_CLICK]: PRIMARY_CLICK,
  [SECONDARY_CLICK]: SECONDARY_CLICK,
  [MOUSEWHEEL]: MOUSEWHEEL,
} as const
