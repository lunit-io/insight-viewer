import { deepmerge } from '@mui/utils'
import { createTheme } from '@mui/material/styles'
import base from '../base'
import { scope } from '../colors'

const theme = createTheme(
  deepmerge(base, {
    palette: {
      primary: {
        main: scope[0],
      },
    },
  })
)

export default theme
