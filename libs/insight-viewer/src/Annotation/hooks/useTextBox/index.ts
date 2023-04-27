import { useCallback, useState } from 'react'

const useTextBox = () => {
  const [textBox, setTextBox] = useState<{ height: number; width: number } | null>(null)

  const textBoxRef = useCallback((ref: SVGTextElement) => {
    if (ref !== null) {
      const { width, height } = ref.getBBox()
      setTextBox({ width, height })
    }
  }, [])

  return [textBox, textBoxRef] as const
}

export default useTextBox
