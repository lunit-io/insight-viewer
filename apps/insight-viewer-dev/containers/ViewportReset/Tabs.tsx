import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SingleFrame from './SingleFrame'
import MultiFrame from './MultiFrame'

export default function ErrorTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Single Frame Image</Tab>
        <Tab className="custom-error">MultiFrame Image</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <SingleFrame />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <MultiFrame />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
