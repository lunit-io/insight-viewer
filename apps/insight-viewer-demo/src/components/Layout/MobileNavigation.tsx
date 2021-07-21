import { useState } from 'react'
import { HamburgerButton } from '../Button'
import Nav from '../Nav'

export default function MobileNavigation(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  function handleShowNav() {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <HamburgerButton onClick={handleShowNav} />
      {isOpen && <Nav />}
    </>
  )
}
