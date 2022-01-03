import { deepmerge } from '@mui/utils'
import base from '../base'
import { scope } from '../colors'

const scopeOptions = deepmerge(base, {
  palette: {
    primary: {
      main: scope[0],
    },
  },
})

export default scopeOptions
