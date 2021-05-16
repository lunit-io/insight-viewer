import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Base from './Base'
import NoContentLength from './NoContentLength'
import config from '../../../config'

export default function ProgressTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Default Multiframe</Tab>
        {config.IS_DEV && <Tab>Multiframe with no content-length</Tab>}
      </TabList>

      <TabPanels>
        <TabPanel>{active === 0 && <Base />}</TabPanel>
        {config.IS_DEV && (
          <TabPanel>{active === 1 && <NoContentLength />}</TabPanel>
        )}
      </TabPanels>
    </Tabs>
  )
}
