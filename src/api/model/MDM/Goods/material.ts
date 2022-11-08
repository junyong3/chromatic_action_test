import { ListPagination } from '@api/model/Commerce/common'

export interface MaterialDto {
  // 자재코드, 자재명, 군, ph1, ph2
  materialCode: string
  materialName: string
  group: string
  ph1: string
  ph2: string
  // ph3, 자재유형, 조달구분, 브랜드 구분, 유통기간
  ph3: string
  materialType: string
  procurementCategory: string
  brandType: string
  shelfLife: string
  // 출고허용기간(min), 출고허용기간(max), 소비기간, 공급상태, 리드타임(일)
  minDeliveryAllowablePeriod: number
  maxDeliveryAllowablePeriod: number
  consumptionPeriod: number
  supplyStatus: boolean
  leadTime: number
  // 발주단위, 기본단위, 입고단위, 박스입수량, 파레트당 적재수량
  orderUnit: string
  basicUnit: string
  warehousingUnit: number
  boxQuantity: number
  loadedQuantityPerPallet: number
  // 발주단위수량, 최소발주수량, 최대발주수량, 입고가능요일, 자동발주 여부
  orderUnitQuantity: number
  minOrderQuantity: number
  maxOrderQuantity: number
  availableDays: string[]
  isAutomaticOrdering: string
  // 단일바코드 사용여부, 사용여부
  isUseSingleBarcode: string
  isUse: boolean
}

export type materialListRes = ListPagination & { items: Array<MaterialDto> }
