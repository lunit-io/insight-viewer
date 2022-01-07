import { deepmerge } from '@mui/utils'
import base from './base'
import { mmg } from './colors'

const mmgOptions = deepmerge(base, {
  palette: {
    primary: {
      main: mmg[0],
    },
  },
})

export default mmgOptions
