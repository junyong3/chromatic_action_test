import { HTMLAttributes } from 'react'
import { FallbackProps } from 'react-error-boundary'

export interface ErrorFallbackProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<FallbackProps> {
  withoutIcon?: boolean
}

export type ErrorByTypeViewProps = {
  type: 'NETWORK_ERROR' | 'UNAUTHORIZED' | 'ERROR'
  code?: number
  clickHandler?: () => void
}
