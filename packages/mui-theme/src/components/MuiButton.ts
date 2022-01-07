import type { ComponentsOverrides, ComponentsProps } from '@mui/material/styles'

const styleOverrides: ComponentsOverrides['MuiButton'] = {
  root: {
    textTransform: 'capitalize',
  },
}
const defaultProps: ComponentsProps['MuiButton'] = {
  variant: 'contained',
  disableElevation: true,
}
export default {
  styleOverrides,
  defaultProps,
}
