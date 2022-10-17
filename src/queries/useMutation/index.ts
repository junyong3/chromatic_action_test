import { useErrorModule } from '@queries/Error/queryErrorHandler'
import { useMutation } from 'react-query'
import { AxiosError } from 'axios'
import { ErrorRes, SuccessRes } from '@api/model/res'

export const useMutationWrap = <ResData, ErrorResData = any>() => {
  const { errorHandler } = useErrorModule()
  return useMutation<
    SuccessRes<ResData>,
    AxiosError<ErrorRes<ErrorResData>>,
    any
  >((query) => query, {
    onError: errorHandler,
  })
}

export const useMutationWrap2 = <ResData, ErrorResData = any>(fetchFn: any) => {
  const { errorHandler } = useErrorModule()
  return useMutation<
    SuccessRes<ResData>,
    AxiosError<ErrorRes<ErrorResData>>,
    any
  >(fetchFn, {
    onError: errorHandler,
  })
}
