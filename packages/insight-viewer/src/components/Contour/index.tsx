import React from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: '#fff',
  fontSize: '2rem',
  textShadow: '0 0 3px #000',
} as const

export default function Contour(): JSX.Element {
  return <div style={style}>CONTOUR</div>
}
