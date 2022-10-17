import create from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'

export type NoticeInputList = {
  id: null | number
  published: boolean
  title: string
  content: string
}
export interface NoticeStoreState {
  noticeInputDataSet: NoticeInputList
  setNoticeInputDataSet: (dataSet: Partial<NoticeInputList>) => void
  isDelete: boolean
  setDelete: (status: boolean) => void
  isSave: boolean
  isUpdate: boolean
}

const useNoticeStore = create<
  NoticeStoreState,
  [['zustand/devtools', never], ['zustand/subscribeWithSelector', never]]
>(
  devtools(
    subscribeWithSelector((set, get) => ({
      noticeInputDataSet: {
        id: null,
        published: false,
        title: '',
        content: '',
      },
      setNoticeInputDataSet: (dataSet: Partial<NoticeInputList>) => {
        set((state) => {
          return {
            noticeInputDataSet: { ...state.noticeInputDataSet, ...dataSet },
          }
        })

        // 입력 확인
        if (
          (get().noticeInputDataSet.title?.trim().length ?? 0) > 0 &&
          get()
            .noticeInputDataSet.content.replace(/<(.|\n)*?>/g, '')
            .trim().length !== 0
        ) {
          set(() => {
            return {
              isSave: false,
            }
          })
        } else {
          set(() => {
            return {
              isSave: true,
            }
          })
        }
      },
      isDelete: false,
      isUpdate: false,
      isSave: true,
      setDelete: (isDelete: boolean) =>
        set(() => ({
          isDelete,
        })),
    }))
  )
)
export default useNoticeStore
