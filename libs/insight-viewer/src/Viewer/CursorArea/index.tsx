import React from 'react'

const CursorArea = ({ cursorStatus }: { cursorStatus: string }) => {
  return (
    <div
      className={cursorStatus}
      style={{
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        top: '0px',
      }}
    />
  )
}

export default CursorArea
