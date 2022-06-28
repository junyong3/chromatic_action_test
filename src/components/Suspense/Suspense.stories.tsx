import { Meta, Story } from '@storybook/react'
import { SuspenseWrap } from '@components/Suspense/StyleObj'
import DataLayer from '@components/Suspense/DataLayer'
import { Suspense } from 'react'
import { Skeleton } from '@mui/material'
import Center from '@components/Center/Center'

const Template: Story = () => {
  return (
    <SuspenseWrap>
      <div
        style={{
          flexBasis: '500px',
          height: '500px',
          backgroundColor: 'white',
        }}
      >
        <Center>
          <Suspense
            fallback={
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={500}
                height={500}
              />
            }
          >
            <DataLayer />
          </Suspense>
        </Center>
      </div>
    </SuspenseWrap>
  )
}
export default {
  title: 'components/YGUI/Boundary',
  component: Suspense,
  argTypes: {},
} as Meta

export const SuspenseLayer = Template.bind({})

SuspenseLayer.args = {}
