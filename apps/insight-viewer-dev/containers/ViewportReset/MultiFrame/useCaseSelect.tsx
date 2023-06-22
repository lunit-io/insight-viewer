import { useState, memo, MemoExoticComponent } from 'react'
import { Stack, Button, Text } from '@chakra-ui/react'
import { IMAGES } from '@insight-viewer-library/fixtures'
import { noop } from '../../../utils'

const images = {
  case1: IMAGES.slice(0, 11),
  case2: [...IMAGES].slice(0, 11).reverse(),
}

type Case = keyof typeof images
export interface OnSelect {
  (v: Case): void
}
interface Prop {
  onSelect?: (v: Case) => void
  frame: number
}

export default function useCaseSelect(): {
  CaseSelect: MemoExoticComponent<({ onSelect, frame }: Prop) => JSX.Element>
  selected: string[]
} {
  const [selected, setSelected] = useState<Case>('case1')

  function CaseSelect({ onSelect = noop, frame }: Prop): JSX.Element {
    const handleClick = (v: Case) => () => {
      setSelected(v)
      onSelect(v)
    }

    const imagePaths = images[selected][frame].split('/')
    return (
      <Stack spacing={4} direction="row">
        <Button colorScheme="blue" onClick={handleClick('case1')} isActive={selected === 'case1'} className="button1">
          case 1
        </Button>
        <Button colorScheme="blue" onClick={handleClick('case2')} isActive={selected === 'case2'} className="button2">
          case 2
        </Button>
        <Text pt={2}>
          selected:{' '}
          <span>
            {selected} ({imagePaths[imagePaths.length - 1]})
          </span>
        </Text>
      </Stack>
    )
  }

  const Memoized = memo(CaseSelect)

  return { CaseSelect: Memoized, selected: images[selected] }
}
