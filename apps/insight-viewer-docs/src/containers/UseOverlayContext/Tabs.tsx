/* eslint-disable react/jsx-no-bind */
import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Heatmap from './Heatmap'
import Contour from './Contour'
import FreeLineContainer from './FreeLine'
import FreeLineDrawerContainer from './FreeLineDrawer'
import PolygonContainer from './PolygonViewer'
import PolygonDrawerContainer from './PolygonDrawer'
import LineContainer from './Line'
import LineDrawerContainer from './LineDrawer'
import ArrowLineDrawerContainer from './ArrowLineDrawer'

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
        <Tab data-cy-tab="FreeLine">FreeLine</Tab>
        <Tab data-cy-tab="FreeLineDrawer">FreeLineDrawer</Tab>
        <Tab data-cy-tab="Line">Line</Tab>
        <Tab data-cy-tab="LineDrawer">LineDrawer</Tab>
        <Tab data-cy-tab="ArrowLineDrawer">ArrowLineDrawer</Tab>
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
          {active === 4 && <FreeLineContainer />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 5 && <FreeLineDrawerContainer />}
        </TabPanel>
        <TabPanel p={0} pt={7}>
          {active === 6 && <LineContainer />}
        </TabPanel>
        <TabPanel p={0} pt={8}>
          {active === 7 && <LineDrawerContainer />}
        </TabPanel>
        <TabPanel p={0} pt={9}>
          {active === 8 && <ArrowLineDrawerContainer />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
