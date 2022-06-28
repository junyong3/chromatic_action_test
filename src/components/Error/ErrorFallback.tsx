import React from 'react'
import { ErrorFallbackProps } from './Props'
import Button from '@components/Button'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import { ErrorBase } from '@components/Error/StyleObj'
import Center from '@components/Center/Center'

const ErrorFallback = ({
  withoutIcon = false,
  // error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  const hasResetErrorBoundary = !!resetErrorBoundary

  console.log(resetErrorBoundary)
  const handleClick = () => {
    resetErrorBoundary?.()
  }

  return (
    <ErrorBase>
      <div className={'msg'}>
        {!withoutIcon && <ReportGmailerrorredIcon fontSize={'medium'} />}
        <div>데이터를 불러오지 못했습니다.</div>
      </div>
      {hasResetErrorBoundary && (
        <div className={'retry'}>
          <Center>
            <Button
              className={'retry-button'}
              variant={'outlined'}
              size={'small'}
              onClick={handleClick}
            >
              다시 시도
            </Button>
          </Center>
        </div>
      )}
    </ErrorBase>
  )
}

export default ErrorFallback
