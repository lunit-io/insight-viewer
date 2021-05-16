import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Base from './Base'
import Custom from './Custom'
import NoContentLength from './NoContentLength'

export default function ProgressTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Default Progress</Tab>
        <Tab>Custom Progress</Tab>
        <Tab>No Content-Length Progress</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>{active === 0 && <Base />}</TabPanel>
        <TabPanel>{active === 1 && <Custom />}</TabPanel>
        <TabPanel>{active === 2 && <NoContentLength />}</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
