import { deepmerge } from '@mui/utils'
import { createTheme } from '@mui/material/styles'
import base from '../base'
import { mmg } from '../colors'

const theme = createTheme(
  deepmerge(base, {
    palette: {
      primary: {
        main: mmg[0],
      },
    },
  })
)

export default theme
