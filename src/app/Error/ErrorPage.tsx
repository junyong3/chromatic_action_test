import Page from '@components/Page'
import ErrorByTypeView from '@components/Error/ErrorByTypeView'
import { useLocation, useNavigate } from 'react-router-dom'
import { ErrorByTypeViewProps } from '@components/Error/Props'
import useNetwork from '@hooks/useNetwork'
import { useEffect } from 'react'
import { useErrorStore } from '@stores/error.store'

function ErrorPage() {
  const location = useLocation()
  const isOnLine = useNetwork()
  const navigate = useNavigate()
  const linkProps = location?.state as ErrorByTypeViewProps
  useEffect(() => {
    if (isOnLine && linkProps?.type === 'NETWORK_ERROR') {
      navigate(-1)
    }

    return () => {
      // clean up 실행
      useErrorStore.getState().reset()
    }
  }, [isOnLine, linkProps?.type, navigate])

  return (
    <Page>
      <ErrorByTypeView
        {...(linkProps ? { ...linkProps } : { type: 'ERROR' })}
      />
    </Page>
  )
}

export default ErrorPage
