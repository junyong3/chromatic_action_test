import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { rest } from 'msw'
import { MDM_PRODUCT_API_PATH as API } from '@api/path/MDM/productPath'
import { MaterialDto } from '@src/api/model/MDM/material'

const ROOT_PATH = API_ROOT_PATH.MDM
export const ProductMock = {
  ProductList: rest.get(`${ROOT_PATH}${API.PRODUCT_LIST}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 1,
          page: 1,
          items: [
            {
              availableDays: [],
              basicUnit: '',
              boxQuantity: 0,
              brandType: '브랜드 구분',
              consumptionPeriod: 0,
              group: '군',
              isAutomaticOrdering: '자동',
              isUse: false,
              isUseSingleBarcode: '사용',
              leadTime: 0,
              loadedQuantityPerPallet: 0,
              materialCode: '자재코드',
              materialName: '자재명',
              materialType: '자재유형',
              maxDeliveryAllowablePeriod: 0,
              maxOrderQuantity: 0,
              minDeliveryAllowablePeriod: 0,
              minOrderQuantity: 0,
              orderUnit: '발주단위',
              orderUnitQuantity: 0,
              ph1: 'Ph1',
              ph2: 'Ph2',
              ph3: 'Ph3',
              procurementCategory: '',
              shelfLife: '',
              supplyStatus: false,
              warehousingUnit: 0,
            },
          ] as MaterialDto[],
          limit: 10,
        },
      })
    )
  }),
  ProductDetail: rest.get(
    `${ROOT_PATH}${API.PRODUCT_DETAIL('1')}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            availableDays: ['월'],
            basicUnit: '',
            boxQuantity: 0,
            brandType: '브랜드 구분',
            consumptionPeriod: 0,
            group: '군',
            isAutomaticOrdering: '자동',
            isUse: false,
            isUseSingleBarcode: '사용',
            leadTime: 0,
            loadedQuantityPerPallet: 0,
            materialCode: '자재코드',
            materialName: '자재명',
            materialType: '자재유형',
            maxDeliveryAllowablePeriod: 0,
            maxOrderQuantity: 0,
            minDeliveryAllowablePeriod: 0,
            minOrderQuantity: 0,
            orderUnit: '발주단위',
            orderUnitQuantity: 0,
            ph1: 'Ph1',
            ph2: 'Ph2',
            ph3: 'Ph3',
            procurementCategory: '',
            shelfLife: '',
            supplyStatus: false,
            singleBarcode: '12345678',
            warehousingUnit: 0,
          },
        })
      )
    }
  ),
  ProductDelete: rest.delete(
    `${ROOT_PATH}${API.PRODUCT_DETAIL('1')}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {},
        })
      )
    }
  ),
  CustomerList: rest.get(
    `${ROOT_PATH}${API.CUSTOMER_LIST}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            total: 1,
            page: 1,
            items: [
              {
                id: 1,
                customerName: '삼성',
                customerCode: 'SAMSUNG',
                manager: '권영기',
                businessCode: '1234-5678',
              },
              {
                id: 2,
                customerName: '엘지',
                customerCode: 'LG',
                manager: '권영기',
                businessCode: '1234-5678',
              },
            ],
            limit: 10,
          },
        })
      )
    }
  ),
  ProductCreate: rest.post(
    `${ROOT_PATH}${API.CREATE_PRODUCT}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            productId: 1,
          },
        })
      )
    }
  ),
  ProductUpdate: rest.post(
    `${ROOT_PATH}${API.PRODUCT_DETAIL('1')}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {},
        })
      )
    }
  ),
}
