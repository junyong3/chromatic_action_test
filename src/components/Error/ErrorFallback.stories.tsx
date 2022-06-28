import React, { useState } from 'react'
import ErrorFallback from './ErrorFallback'
import { Meta, Story } from '@storybook/react'
import { ErrorFallbackProps } from './Props'
import { ErrorBoundary } from 'react-error-boundary'
import Center from '@components/Center/Center'

const Template: Story<ErrorFallbackProps> = (args: ErrorFallbackProps) => {
  const [isRecovered, setIsRecovered] = useState(false)
  const Child = ({ isRecovered }: { isRecovered: boolean }): JSX.Element => {
    if (!isRecovered) {
      throw new Error()
    }
    return <Center>다시 데이터를 불러왔습니다!!.</Center>
  }
  return (
    <div
      style={{
        display: 'inline-block',
        width: '300px',
        height: '100px',
        border: '1px dashed black',
      }}
    >
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <ErrorFallback
            error={error}
            resetErrorBoundary={resetErrorBoundary}
            {...args}
          />
        )}
        onReset={() => {
          setIsRecovered(true)
        }}
        resetKeys={[isRecovered]}
      >
        <Child isRecovered={isRecovered} />
      </ErrorBoundary>
    </div>
  )
}

export const ErrorMsg: Story<ErrorFallbackProps> = (
  args: ErrorFallbackProps
) => (
  <div style={{ display: 'flex', gap: 20 }}>
    <div
      style={{
        display: 'inline-block',
        width: '200px',
        height: '100px',
        border: '1px dashed black',
      }}
    >
      <ErrorFallback {...args} />
    </div>
    <div
      style={{
        display: 'inline-block',
        width: '100px',
        height: '100px',
        border: '1px dashed black',
      }}
    >
      <ErrorFallback {...args} />
    </div>
  </div>
)

export default {
  title: 'components/YGUI/Boundary',
  component: ErrorFallback,
  argTypes: {},
} as Meta

export const RetryError = Template.bind({})
RetryError.args = {}
