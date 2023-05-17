import type { Point } from '../../types'

export interface TypingProps {
  points: Point[]
  onFinish?: (text: string) => void
}
