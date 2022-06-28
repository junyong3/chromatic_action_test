import { HTMLAttributes } from 'react'
import { FallbackProps } from 'react-error-boundary'

export interface ErrorFallbackProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<FallbackProps> {
  withoutIcon?: boolean
}
