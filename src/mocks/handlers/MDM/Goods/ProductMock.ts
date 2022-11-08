import { rest } from 'msw'
import { MDMMockPath } from '@mocks/mockPath'
import { MaterialDto } from '@api/model/MDM/Goods/material'

export const ProductMock = {
  ProductList: rest.get(MDMMockPath.ProductList, (req, res, ctx) => {
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
  ProductDetail: rest.get(MDMMockPath.ProductDetail, (req, res, ctx) => {
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
  }),
  ProductDelete: rest.delete(MDMMockPath.DeleteProduct, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {},
      })
    )
  }),
  CustomerList: rest.get(MDMMockPath.ProductCustomerList, (req, res, ctx) => {
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
  }),
  CreateProduct: rest.post(MDMMockPath.CreateProduct, (req, res, ctx) => {
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
  }),
  UpdateProduct: rest.post(MDMMockPath.UpdateProduct, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {},
      })
    )
  }),
}
