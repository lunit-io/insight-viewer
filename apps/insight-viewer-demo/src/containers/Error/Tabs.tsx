import { useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Base from './Base'
import Custom from './Custom'

export default function ErrorTabs(): JSX.Element {
  const [active, setActive] = useState(0)

  function handleChange(index: number): void {
    setActive(index)
  }

  return (
    <Tabs isLazy onChange={handleChange}>
      <TabList>
        <Tab>Default Error</Tab>
        <Tab className="custom-error">Custom Error</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>{active === 0 && <Base />}</TabPanel>
        <TabPanel>{active === 1 && <Custom />}</TabPanel>
      </TabPanels>
    </Tabs>
  )
}
