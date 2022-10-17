import create from 'zustand'

export type CouponSearchConditionTS = {
  startDate: string
  endDate: string
  couponType: string[]
  useChannel: string[]
  couponCodeOrCouponName: string
  status: string[]
}

export interface CouponDataSet {
  isActive: boolean
  couponCodeType: 'auto' | 'custom'
  couponCode: string
  couponDuration: {
    type: 'duration' | 'validDayFromDownload'
    duration?: {
      startDate: string
      endDate: string
    }
    validDayFromDownload?: number
  }
  couponName: {
    internal: string
    customer: string
  }
  channel: string[]
  couponType:
    | 'discountPrice'
    | 'discountCart'
    | 'giftProduct'
    | 'freeDelivery'
    | 'etc'
  target: {
    customer: {
      type: string
      count: number | undefined
      list: any[]
    }
    product: {
      type: string
      count: number | undefined
      list: any[]
    }
  }
  productDiscountRestrictions: '1QuantityDiscount' | 'none'
  benefitType: {
    type: 'price' | 'percent'
    price?: number
    percent?: number
  }
  termsOfUse: {
    type: string[]
    maxDiscountPrice?: number
    minPaymentPrice?: number
  }
  paymentMethod: {
    type?: 'download' | 'autoServe' | 'register'
    download: {
      firstCome?: number | undefined
      duration?: {
        startDate: string
        endDate: string
      }
    }
  }
}

interface CouponStoreState {
  searchCondition: CouponSearchConditionTS
  setSearchCondition: (searchCondition: CouponSearchConditionTS) => void

  couponDataSet: CouponDataSet
  setCouponDataSet: (dataSet: Partial<CouponDataSet>) => void

  // 쿠폰코드 직접 만들기 모달
  isOpenCouponCodeDialog: boolean
  setIsOpenCouponCodeDialog: (isOpenCouponCodeDialog: boolean) => void

  // 쿠폰 타겟 회원 등록 모달
  isOpenCustomerRegisterDialog: boolean
  setIsOpenCustomerRegisterDialog: (
    isOpenCustomerRegisterDialog: boolean
  ) => void
  targetCustomerList: any[]
  setTargetCustomerList: (targetCustomerList: any[]) => void

  // 쿠폰 타겟 상품 등록 모달
  isOpenProductRegisterDialog: boolean
  setIsOpenProductRegisterDialog: (isOpenProductRegisterDialog: boolean) => void
  targetProductList: any[]
  setTargetProductList: (targetProductList: any[]) => void
  targetProductExcept: boolean
  setTargetProductExcept: (targetProductExcept: boolean) => void

  // 쿠폰 타겟 카테고리 등록 모달
  isOpenCategoryRegisterDialog: boolean
  setIsOpenCategoryRegisterDialog: (
    isOpenCategoryRegisterDialog: boolean
  ) => void
  targetCategoryList: any[]
  setTargetCategoryList: (targetCategoryList: any[]) => void
  targetCategoryExcept: boolean
  setTargetCategoryExcept: (targetCategoryExcept: boolean) => void
}

export const useCouponStore = create<CouponStoreState>((set) => ({
  searchCondition: {
    startDate: '',
    endDate: '',
    couponType: [],
    useChannel: [],
    couponCodeOrCouponName: '',
    status: [],
  },
  setSearchCondition: (searchCondition: CouponSearchConditionTS) =>
    set(() => ({ searchCondition })),

  couponDataSet: {
    isActive: false,
    couponCodeType: 'auto',
    couponCode: '',
    couponDuration: {
      type: 'duration',
      duration: {
        startDate: '',
        endDate: '',
      },
      validDayFromDownload: undefined,
    },
    couponName: {
      internal: '',
      customer: '',
    },
    channel: ['app', 'web', 'store'],
    couponType: 'discountPrice',
    target: {
      customer: {
        type: 'some',
        count: undefined,
        list: [],
      },
      product: {
        type: 'someProduct',
        count: undefined,
        list: [],
      },
    },
    productDiscountRestrictions: 'none',
    benefitType: {
      type: 'price',
      price: undefined,
      percent: undefined,
    },
    termsOfUse: {
      type: ['maxDiscountPrice'],
      maxDiscountPrice: undefined,
      minPaymentPrice: undefined,
    },
    paymentMethod: {
      type: 'download',
      download: {
        firstCome: undefined,
        duration: {
          startDate: '',
          endDate: '',
        },
      },
    },
  },
  setCouponDataSet: (dataSet: Partial<CouponDataSet>) => {
    set(({ couponDataSet }) => ({
      couponDataSet: { ...couponDataSet, ...dataSet },
    }))
  },

  isOpenCouponCodeDialog: false,
  setIsOpenCouponCodeDialog: (isOpenCouponCodeDialog: boolean) =>
    set(() => ({ isOpenCouponCodeDialog })),

  // 쿠폰 타겟 회원 등록 모달
  isOpenCustomerRegisterDialog: false,
  setIsOpenCustomerRegisterDialog: (isOpenCustomerRegisterDialog: boolean) =>
    set(() => ({ isOpenCustomerRegisterDialog })),
  targetCustomerList: [],
  setTargetCustomerList: (targetCustomerList: any[]) =>
    set(() => ({ targetCustomerList })),

  // 쿠폰 타겟 상품 등록 모달
  isOpenProductRegisterDialog: false,
  setIsOpenProductRegisterDialog: (isOpenProductRegisterDialog: boolean) =>
    set(() => ({ isOpenProductRegisterDialog })),
  targetProductList: [],
  setTargetProductList: (targetProductList: any[]) =>
    set(() => ({ targetProductList })),
  targetProductExcept: false,
  setTargetProductExcept: (targetProductExcept: boolean) =>
    set(() => ({ targetProductExcept })),

  // 쿠폰 타겟 카테고리 등록 모달
  isOpenCategoryRegisterDialog: false,
  setIsOpenCategoryRegisterDialog: (isOpenCategoryRegisterDialog: boolean) =>
    set(() => ({ isOpenCategoryRegisterDialog })),
  targetCategoryList: [],
  setTargetCategoryList: (targetCategoryList: any[]) =>
    set(() => ({ targetCategoryList })),
  targetCategoryExcept: false,
  setTargetCategoryExcept: (targetCategoryExcept: boolean) =>
    set(() => ({ targetCategoryExcept })),
}))
