import { CircularProgress } from '@chakra-ui/react'

export default function CustomProgress({ progress }: { progress: number }): JSX.Element {
  return <CircularProgress value={progress} margin="50px" />
}
