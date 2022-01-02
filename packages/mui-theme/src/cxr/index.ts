import { deepmerge } from '@mui/utils'
import { createTheme } from '@mui/material/styles'
import base from '../base'
import { cxr } from '../colors'

const theme = createTheme(
  deepmerge(base, {
    palette: {
      primary: {
        main: cxr[0],
      },
    },
  })
)

export default theme
