import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Heatmap from './Heatmap'
import Contour from './Contour'
import LineContainer from './Line'
import LineDrawerContainer from './LineDrawer'
import PolygonContainer from './PolygonViewer'
import PolygonDrawerContainer from './PolygonDrawer'

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
        <Tab data-cy-tab="viewer">Polygon</Tab>
        <Tab data-cy-tab="drawer">PolygonDrawer</Tab>
        <Tab data-cy-tab="Line">Line</Tab>
        <Tab data-cy-tab="LineDrawer">LineDrawer</Tab>
      </TabList>

      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <Heatmap />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <Contour />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 2 && <PolygonContainer />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 3 && <PolygonDrawerContainer />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 4 && <LineContainer />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 5 && <LineDrawerContainer />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
