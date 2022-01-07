import type { ThemeOptions } from '@mui/material/styles'
import typography from './system/typography'
import MuiButton from './components/MuiButton'

const baseOptions: ThemeOptions = {
  typography,
  components: {
    MuiButton,
  },
}

export default baseOptions
