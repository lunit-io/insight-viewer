import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import MeasurementViewer from './Viewer'
import MeasurementDrawer from './Drawer'

export default function ProgressTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab data-cy-tab="viewer">Measurement Viewer</Tab>
        <Tab data-cy-tab="drawer">Measurement Drawer</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <MeasurementViewer />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <MeasurementDrawer />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
