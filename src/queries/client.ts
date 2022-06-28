import { QueryClient } from 'react-query'

const defaultOptions = {
  queries: {
    staleTime: 1000 * 5,
  },
}

export const queryClient = new QueryClient({
  defaultOptions,
})
