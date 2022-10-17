import { Meta, Story } from '@storybook/react'
import { SuspenseWrap } from '@components/Suspense/StyleObj'
import DataLayer from '@components/Suspense/DataLayer'
import React, { Suspense, useState } from 'react'
import { Skeleton } from '@mui/material'
import Center from '@components/Center/Center'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@components/Error/ErrorFallback'

const Template: Story = () => {
  const [isRecovered, setIsRecovered] = useState(false)
  return (
    <SuspenseWrap>
      <div
        style={{
          flexBasis: '500px',
          height: '500px',
          backgroundColor: 'white',
          border: '1px solid black',
        }}
      >
        <Center>
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <ErrorFallback
                error={error}
                resetErrorBoundary={resetErrorBoundary}
              />
            )}
            onReset={() => {
              setIsRecovered(true)
            }}
            resetKeys={[isRecovered]}
          >
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
          </ErrorBoundary>
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
