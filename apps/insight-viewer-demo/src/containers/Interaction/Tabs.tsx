import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Base from './Base'
import Custom from './Custom'
import Wheel from './Wheel'

export default function App(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Base Interaction</Tab>
        <Tab>Custom Interaction</Tab>
        <Tab>Mousewheel Interaction</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>{active === 0 && <Base />}</TabPanel>
        <TabPanel>{active === 1 && <Custom />}</TabPanel>
        <TabPanel>{active === 2 && <Wheel />}</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
