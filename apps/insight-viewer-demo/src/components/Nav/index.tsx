import { Box, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextChakraLink } from '../NextChakraLink'
import { LINKS } from './const'
import useIsOneColumn from '../../hooks/useIsOneColumn'
import { WithChildren } from '../../types'

function ResponsiveBox({
  isOneColumn,
  children,
}: WithChildren<{
  isOneColumn: boolean
}>): JSX.Element {
  if (isOneColumn)
    return (
      <Box
        as="nav"
        aria-label="Main Navigation"
        pos="fixed"
        sx={{
          overscrollBehavior: 'contain',
        }}
        top="0"
        right="0"
        bottom="0"
        left="0"
        w="100%"
        height="100%"
        overflowY="auto"
        className="sidebar-content"
        flexShrink={0}
        bg="white"
        zIndex={10}
      >
        {children}
      </Box>
    )
  return (
    <Box
      as="nav"
      aria-label="Main Navigation"
      pos="sticky"
      sx={{
        overscrollBehavior: 'contain',
      }}
      top="0"
      w="240px"
      overflowY="auto"
      className="sidebar-content"
      flexShrink={0}
      bg="white"
    >
      {children}
    </Box>
  )
}

function Nav(): JSX.Element {
  const router = useRouter()
  const isOneColumn = useIsOneColumn()

  return (
    <ResponsiveBox isOneColumn={isOneColumn}>
      <List>
        {LINKS.map(({ name, href }) => (
          <ListItem key={`link=${name}`}>
            <NextChakraLink
              href={`/${href}`}
              color={router.pathname.slice(1) === href ? 'cyan.600' : ''}
            >
              - {name}
            </NextChakraLink>
          </ListItem>
        ))}
      </List>
    </ResponsiveBox>
  )
}

export default Nav
