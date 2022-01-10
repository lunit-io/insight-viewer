import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Heatmap from './Heatmap'
import Contour from './Contour'
import SvgContourContainer from './SvgContourViewer'

export default function ProgressTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Heatmap</Tab>
        <Tab>Contour</Tab>
        <Tab>SvgContourViewer</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <Heatmap />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <Contour />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 2 && <SvgContourContainer />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
