import { useErrorModule } from '@queries/Error/queryErrorHandler'
import { QueryKey, useQuery, UseQueryResult } from 'react-query'
import { AxiosError } from 'axios'
import { ErrorRes } from '@api/model/res'
import { UseQueryOptions } from 'react-query/types/react/types'

export const useQueryWrap = <ResData, ErrorResData = any>(
  queryKey: QueryKey,
  query: (data: any) => Promise<ResData>,
  options?: UseQueryOptions
): UseQueryResult<ResData, Error> => {
  const { errorHandler } = useErrorModule()

  return useQuery<ResData, AxiosError<ErrorRes<ErrorResData>>>(
    queryKey,
    (data) => {
      return query(data)
    },
    {
      ...({
        retry: false,
        onError: errorHandler,
      } as any),
      ...options,
    }
  )
}
