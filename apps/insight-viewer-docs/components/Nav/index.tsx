import { Box, List, ListItem } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextChakraLink } from '../NextChakraLink'
import { LINKS } from './const'

function Nav(): JSX.Element {
  const router = useRouter()

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
      <List>
        {LINKS.map(({ name, href }) => (
          <ListItem key={`link=${name}`}>
            <NextChakraLink href={`/${href}`} color={router.pathname.slice(1) === href ? 'cyan.600' : ''}>
              - {name}
            </NextChakraLink>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Nav
