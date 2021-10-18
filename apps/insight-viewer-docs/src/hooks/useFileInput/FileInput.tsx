import { ChangeEvent, useRef, memo } from 'react'
import { Button } from '@chakra-ui/react'

export const FileInput = memo(
  ({ onChange }: { onChange: (file: File) => void }): JSX.Element => {
    const inputRef = useRef<HTMLInputElement>(null)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      const {
        target: { files },
      } = e
      if (!files) return
      onChange(files[0])
    }

    const handleClick = () => {
      inputRef.current?.click()
    }

    return (
      <>
        <input
          type="file"
          accept="application/dicom"
          hidden
          onChange={handleChange}
          ref={inputRef}
        />
        <Button colorScheme="blue" onClick={handleClick}>
          file upload
        </Button>
      </>
    )
  }
)

FileInput.displayName = 'FileInput'
