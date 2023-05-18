import { useState } from 'react'

import type { EditMode } from '../../types'

const useEditMode = () => {
  const [editMode, setEditMode] = useState<EditMode | null>(null)

  const updateEditMode = (mode: EditMode) => {
    setEditMode(mode)
  }

  const clearEditMode = () => {
    setEditMode(null)
  }

  return {
    editMode,
    updateEditMode,
    clearEditMode,
  }
}

export default useEditMode
