import { Meta, Story } from '@storybook/react'
import NoDataBoundary from '@components/NoDataBoundary/NoDataBoundary'
import { Box, Divider, Skeleton, Stack } from '@mui/material'
import { BoundaryItem } from '@components/NoDataBoundary/StyleObj'
import BoxComp from '@components/NoDataBoundary/BoxComp'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '@components/Error/ErrorFallback'
import React, { useState, Suspense } from 'react'
import Button from '@components/Button'
import BoxErrorComp from '@components/NoDataBoundary/BoxErrorComp'

const Template: Story = () => {
  const [isRecovered, setIsRecovered] = useState(false)
  const [isOk, setIsOk] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isNoData, setIsNoData] = useState<any>(true)
  const OkClick = () => {
    setIsOk(!isOk)
  }

  return (
    <Stack
      direction="row"
      divider={<Divider orientation="vertical" flexItem />}
      spacing={2}
    >
      <Button
        onClick={OkClick}
        variant={'outlined'}
        sx={{ padding: '2px' }}
        size={'small'}
      >
        Call
      </Button>
      <BoundaryItem>
        <Box sx={{ my: 1, mx: 2 }}>정상 Case</Box>
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
                width={280}
                height={220}
              />
            }
          >
            <BoxComp
              key={'A'}
              isCall={isOk}
              bodyTitle={'성공'}
              content={'api 호출 -> 통신 -> 정상적인 데이터 -> 화면에 출력'}
            />
          </Suspense>
        </ErrorBoundary>
      </BoundaryItem>
      <BoundaryItem>
        <Box sx={{ my: 1, mx: 2 }}>데이터가 없는 Case</Box>
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
          <div style={{ height: '100%' }}>
            <NoDataBoundary dataSet={isNoData} msgKey={'noMsg'}>
              <Suspense
                fallback={
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    width={280}
                    height={220}
                  />
                }
              >
                <BoxComp
                  key={'B'}
                  setDataSet={setIsNoData}
                  isCall={isOk}
                  bodyTitle={'NoData'}
                  content={'api 호출 -> 통신 -> Nodata -> 화면에 출력 '}
                />
              </Suspense>
            </NoDataBoundary>
          </div>
        </ErrorBoundary>
      </BoundaryItem>
      <BoundaryItem>
        <Box sx={{ my: 1, mx: 2 }}>서버통신에러 Case</Box>
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
                width={280}
                height={220}
              />
            }
          >
            <BoxErrorComp
              isError={isError}
              setError={setIsError}
              key={'C'}
              isCall={isOk}
              bodyTitle={'서버통신에러'}
              content={'api 호출 -> 통신중단 -> Error Return'}
            />
          </Suspense>
        </ErrorBoundary>
      </BoundaryItem>
    </Stack>
  )
}
export default {
  title: 'components/YGUI/Boundary',
  component: NoDataBoundary,
  argTypes: {},
} as Meta

export const OverView = Template.bind({})

OverView.args = {}
