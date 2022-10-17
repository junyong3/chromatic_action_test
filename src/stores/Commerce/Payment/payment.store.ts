import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export interface PaymentStoreState {
  sample: string
}
const initialCancelInputState: PaymentStoreState = {
  sample: 'test',
}
const usePaymentStore = create<
  PaymentStoreState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]]
>(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialCancelInputState,
    }))
  )
)
export default usePaymentStore
