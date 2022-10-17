import create from 'zustand'
import { GridRowId } from '@mui/x-data-grid'

export interface PointSearchCondition {
  startDate: string
  endDate: string
  fileName: string
}

interface PointStore {
  searchCondition: PointSearchCondition
  setSearchCondition: (searchCondition: PointSearchCondition) => void

  // 지급 대상 등록하기 모달
  isOpenTargetPaymentDialog: boolean
  setIsOpenTargetPaymentDialog: (isOpenTargetPaymentDialog: boolean) => void

  // 지급 실패 디테일 모달
  isPaymentFailDetailDialog: boolean
  paymentFailDetailParams: GridRowId
  setIsPaymentFailDetailDialog: (
    isPaymentFailDetailDialog: boolean,
    params?: GridRowId
  ) => void

  // 미지급 파일 삭제 모달
  isPaymentDeleteDialog: boolean
  paymentDeleteParams: GridRowId
  setIsPaymentDeleteDialog: (
    isPaymentDeleteDialog: boolean,
    params?: GridRowId
  ) => void
}

export const usePointStore = create<PointStore>((set) => ({
  searchCondition: {
    startDate: '',
    endDate: '',
    fileName: '',
  },
  setSearchCondition: (searchCondition: PointSearchCondition) =>
    set(() => ({ searchCondition })),

  // 지급 대상 등록하기 모달
  isOpenTargetPaymentDialog: false,
  setIsOpenTargetPaymentDialog: (isOpenTargetPaymentDialog: boolean) =>
    set(() => ({ isOpenTargetPaymentDialog })),

  // 지급 실패 디테일 모달
  isPaymentFailDetailDialog: false,
  paymentFailDetailParams: '',
  setIsPaymentFailDetailDialog: (
    isPaymentFailDetailDialog: boolean,
    params?: GridRowId
  ) =>
    set(() => ({ isPaymentFailDetailDialog, paymentFailDetailParams: params })),

  // 미지급 파일 삭제 모달
  isPaymentDeleteDialog: false,
  paymentDeleteParams: '',
  setIsPaymentDeleteDialog: (
    isPaymentDeleteDialog: boolean,
    params?: GridRowId
  ) => set(() => ({ isPaymentDeleteDialog, paymentDeleteParams: params })),
}))
