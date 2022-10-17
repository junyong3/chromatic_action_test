import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export interface refundsAccount {
  type: 'save' | 'update'
  formButton: {
    refundsBtnLabel: string
    cancelBtnLabel: string
    refundsBtnHandler?: (e: React.MouseEvent<HTMLButtonElement>) => void
    cancelBtnHandler?: () => void
  }
  bankCode: Array<string>
}

const initialRefundsAccount: refundsAccount = {
  type: 'save',
  formButton: {
    refundsBtnLabel: '환급 계좌 저장',
    cancelBtnLabel: '',
  },
  bankCode: [],
}
export type buttonTypeHandleTS = Pick<
  typeof initialRefundsAccount.formButton,
  'cancelBtnHandler' | 'refundsBtnHandler'
> & { type: string }
type MemberPaymentStoreState = {
  setButtonData: (param: buttonTypeHandleTS) => void
} & refundsAccount

const useMemberPaymentStore = create<
  MemberPaymentStoreState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]]
>(
  devtools(
    subscribeWithSelector((set) => ({
      ...initialRefundsAccount,
      setButtonData: ({
        type,
        refundsBtnHandler,
        cancelBtnHandler,
      }: buttonTypeHandleTS) => {
        const formButtonInfo = <typeof initialRefundsAccount.formButton>{}
        switch (type) {
          case 'save':
            formButtonInfo.refundsBtnLabel = '환급 계좌 저장'
            formButtonInfo.cancelBtnLabel = ''
            formButtonInfo.cancelBtnHandler = undefined
            formButtonInfo.refundsBtnHandler = refundsBtnHandler
            break
          case 'update':
            formButtonInfo.refundsBtnLabel = '환급 계좌 수정'
            formButtonInfo.cancelBtnLabel = '환급 계좌 삭제'
            formButtonInfo.cancelBtnHandler = cancelBtnHandler
            formButtonInfo.refundsBtnHandler = refundsBtnHandler
            break
          default:
            throw Error('No found type')
        }
        set({
          formButton: { ...formButtonInfo },
        })
      },
      // setUsablePoint: (usablePoint: number) => set({ usablePoint }),
    }))
  )
)
export default useMemberPaymentStore
