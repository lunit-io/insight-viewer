import { useState } from 'react'
import { Stack, Button } from '@chakra-ui/react'

const IMAGES = {
  image1:
    'wadouri:https://raw.githubusercontent.com/cornerstonejs/cornerstoneWADOImageLoader/master/testImages/CT2_J2KR',
  image2:
    'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000010.dcm',
  image3:
    'wadouri:https://static.lunit.io/fixtures/dcm-files/series/CT000000.dcm',
}

type Image = keyof typeof IMAGES

export default function useImageSelect(): {
  ImageSelect: () => JSX.Element
  selected: string
} {
  const [selected, setSelected] = useState<Image>('image1')

  const handleClick = (v: Image) => {
    setSelected(v)
  }

  function ImageSelect(): JSX.Element {
    return (
      <Stack spacing={4} direction="row">
        <Button
          colorScheme="blue"
          onClick={() => handleClick('image1')}
          isActive={selected === 'image1'}
        >
          image 1
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => handleClick('image2')}
          isActive={selected === 'image2'}
        >
          image 2
        </Button>
        <Button
          colorScheme="blue"
          onClick={() => handleClick('image3')}
          isActive={selected === 'image3'}
        >
          image 3
        </Button>
      </Stack>
    )
  }

  return { ImageSelect, selected: IMAGES[selected] }
}
