import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Heatmap from './Heatmap'
import Contour from './Contour'

export default function ProgressTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab data-cy-tab="heatmap">Heatmap</Tab>
        <Tab data-cy-tab="contour">Contour</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <Heatmap />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <Contour />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
