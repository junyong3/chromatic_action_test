import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export type cancelTS = 'all' | 'part'
export interface OrderStoreState {
  //detail
  isCancelBtn: boolean
  isCancelView: boolean
  setCancelView: (status: boolean) => void
  selectRowData: any
  setCancelReqCall: (isCall: boolean) => void
  cancelReqCall: boolean
}
const initialCancelInputState: Pick<
  OrderStoreState,
  'isCancelBtn' | 'selectRowData' | 'isCancelView' | 'cancelReqCall'
> = {
  isCancelBtn: true,
  selectRowData: {},
  isCancelView: false,
  cancelReqCall: false,
}
const useOrderStore = create<
  OrderStoreState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]]
>(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialCancelInputState,
      setCancelView: async (isCancelView: boolean) =>
        set(() => ({
          isCancelView,
        })),
      cancelReset: () => {
        set({ ...initialCancelInputState })
      },
      setCancelReqCall: (isCall: boolean) => {
        set({ cancelReqCall: isCall })
      },
    }))
  )
)
export default useOrderStore
