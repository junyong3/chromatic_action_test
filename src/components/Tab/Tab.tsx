import React from 'react'
import { Box, Tabs as MuiTabs, Tab as MuiTab } from '@mui/material'
import { PropsWithChildren, useState } from 'react'
import { TabProp } from './Props'
import { TabWrap } from './StyleObj'
import TabPanel from './TabPanel'

function Tab({
  defaultIndex = 0,
  tabList,
  variant = 'standard',
}: PropsWithChildren<TabProp>) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  return (
    <TabWrap>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs
          value={activeIndex}
          onChange={(event: React.SyntheticEvent, newValue: number) => {
            setActiveIndex(newValue)
          }}
          variant={variant}
        >
          {tabList.map(({ label, tabKey }, index) => {
            return (
              <MuiTab
                key={index}
                data-cy={tabKey ?? index}
                label={label}
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
              />
            )
          })}
        </MuiTabs>
      </Box>
      {tabList.map(({ children }, index) => {
        return (
          <TabPanel key={index} value={activeIndex} index={index}>
            {children}
          </TabPanel>
        )
      })}
    </TabWrap>
  )
}

export default Tab
