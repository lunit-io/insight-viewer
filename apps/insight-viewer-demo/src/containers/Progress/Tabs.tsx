import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Base from './Base'
import Custom from './Custom'
import NoContentLength from './NoContentLength'

const isDev = process.env.NODE_ENV === 'development'

export default function ProgressTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Default No Progress</Tab>
        <Tab>Custom Progress</Tab>
        {isDev && <Tab>No content-length</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel p={0} pt={6}>
          {active === 0 && <Base />}
        </TabPanel>
        <TabPanel p={0} pt={6}>
          {active === 1 && <Custom />}
        </TabPanel>
        {isDev && (
          <TabPanel p={0} pt={6}>
            {active === 2 && <NoContentLength />}
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}
