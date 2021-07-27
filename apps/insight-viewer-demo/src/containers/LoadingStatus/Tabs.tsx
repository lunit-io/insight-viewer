import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Base from './Base'
import Multiframe from './Multiframe'

export default function App(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Base</Tab>
        <Tab className="custom-tab">Multiframe</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <Base />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <Multiframe />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
