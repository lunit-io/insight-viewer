import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import AnnotationViewer from './Viewer'
import AnnotationDrawer from './Drawer'

export default function ProgressTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab data-cy-tab="viewer">Annotation Viewer</Tab>
        <Tab data-cy-tab="drawer">Annotation Drawer</Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <AnnotationViewer />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <AnnotationDrawer />}
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}
