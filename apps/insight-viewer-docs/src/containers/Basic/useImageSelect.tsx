import { useState } from 'react'
import { Stack, Button, Text } from '@chakra-ui/react'
import { IMAGES } from '../../const'
import { noop } from '../../utils'

const images = {
  image1: IMAGES[0],
  image2: IMAGES[5],
  image3: IMAGES[10],
}

type Image = keyof typeof images
export interface OnSelect {
  (v: Image): void
}
interface Prop {
  onSelect?: (v: Image) => void
}

export default function useImageSelect(): {
  ImageSelect: (prop: Prop) => JSX.Element
  selected: string
} {
  const [selected, setSelected] = useState<Image>('image1')

  function ImageSelect({ onSelect = noop }: Prop): JSX.Element {
    const handleClick = (v: Image) => () => {
      setSelected(v)
      onSelect(v)
    }

    return (
      <Stack spacing={4} direction="row">
        <Button
          colorScheme="blue"
          onClick={handleClick('image1')}
          isActive={selected === 'image1'}
          className="button1"
        >
          image 1
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleClick('image2')}
          isActive={selected === 'image2'}
          className="button2"
        >
          image 2
        </Button>
        <Button
          colorScheme="blue"
          onClick={handleClick('image3')}
          isActive={selected === 'image3'}
          className="button3"
        >
          image 3
        </Button>
        <Text pt={2}>
          selected: <span>{selected}</span>
        </Text>
      </Stack>
    )
  }

  return { ImageSelect, selected: images[selected] }
}
