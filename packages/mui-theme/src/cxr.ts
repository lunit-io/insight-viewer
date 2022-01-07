import { deepmerge } from '@mui/utils'
import base from './base'
import { cxr, grey } from './colors'

const cxrOptions = deepmerge(base, {
  palette: {
    primary: {
      main: cxr[0],
      contrastText: grey[0],
    },
  },
})

export default cxrOptions
