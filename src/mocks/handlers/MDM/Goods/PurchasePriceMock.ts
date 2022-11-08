import { rest } from 'msw'
import { MDMMockPath } from '@src/mocks/mockPath'

export const PurchasePriceMock = {
  MaterialPurchasePriceList: rest.get(
    MDMMockPath.MaterialPurchasePriceList,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              id: 'MPP0001',
              goods: {
                code: 'M0001',
                name: '원부자재 1',
              },
              supplier: {
                code: 'V0001',
                name: '거래거래사',
              },
              price: 3000,
              availableStartDate: '2022-08-17 00:00:00',
              register: '권영기',
            },
            {
              id: 'MPP0002',
              goods: {
                code: 'M0001',
                name: '원부자재 1',
              },
              supplier: {
                code: 'V0002',
                name: '다거리해',
              },
              price: 3000,
              availableStartDate: '2022-09-17 00:00:00',
              register: '권영기',
            },
          ],
        })
      )
    }
  ),
  MaterialPurchasePriceHistory: rest.get(
    MDMMockPath.MaterialPurchasePriceHistory,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              price: 2000,
              availableStartDate: '2022-09-20 00:00:00',
              availableEndDate: '2022-09-29 00:00:00',
              register: '권영기',
            },
            {
              price: 2000,
              availableStartDate: '2022-09-15 00:00:00',
              availableEndDate: '2022-09-20 00:00:00',
              register: '권영기',
            },
            {
              price: 2000,
              availableStartDate: '2022-09-10 00:00:00',
              availableEndDate: '2022-09-15 00:00:00',
              register: '권영기',
            },
            {
              price: 2000,
              availableStartDate: '2022-09-01 00:00:00',
              availableEndDate: '2022-09-10 00:00:00',
              register: '권영기',
            },
            {
              price: 2000,
              availableStartDate: '2022-08-20 00:00:00',
              availableEndDate: '2022-09-01 00:00:00',
              register: '권영기',
            },
            {
              price: 2000,
              availableStartDate: '2022-08-01 00:00:00',
              availableEndDate: '2022-08-20 00:00:00',
              register: '권영기',
            },
          ],
        })
      )
    }
  ),
  CreateMaterialPurchasePrice: rest.post(
    MDMMockPath.CreateMaterialPurchasePrice,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            id: 'MPP0004',
          },
        })
      )
    }
  ),
  MaterialPurchasePriceDetail: rest.get(
    MDMMockPath.MaterialPurchasePriceDetail,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            id: 'MPP0001',
            goods: {
              code: 'M0001',
              name: '원부자재입니다',
            },
            supplier: 'cow',
            price: 50000,
            availableStartDate: '2022-08-17 00:00:00',
          },
        })
      )
    }
  ),
  UpdateMaterialPurchasePrice: rest.patch(
    MDMMockPath.MaterialPurchasePriceDetail,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            result: true,
          },
        })
      )
    }
  ),
  DeleteMaterialPurchasePrice: rest.delete(
    MDMMockPath.MaterialPurchasePriceDetail,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            result: true,
          },
        })
      )
    }
  ),
  ProductPurchasePriceList: rest.get(
    MDMMockPath.ProductPurchasePriceList,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              id: 'PPP0001',
              goods: {
                code: 'P0001',
                name: '제상품 1',
              },
              supplier: {
                code: 'V0001',
                name: '거래거래사',
              },
              price: 3000,
              availableStartDate: '2022-08-17 00:00:00',
              register: '권영기',
            },
            {
              id: 'PPP0002',
              goods: {
                code: 'P0002',
                name: '제상품 2',
              },
              supplier: {
                code: 'V0002',
                name: '거래거래사',
              },
              price: 12000,
              availableStartDate: '2022-08-20 00:00:00',
              register: '권영기',
            },
          ],
        })
      )
    }
  ),
  ProductPurchasePriceHistory: rest.get(
    MDMMockPath.ProductPurchasePriceHistory,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              price: 3000,
              availableStartDate: '2022-09-20 00:00:00',
              availableEndDate: '2022-09-29 00:00:00',
              register: '권영기',
            },
            {
              price: 3000,
              availableStartDate: '2022-09-15 00:00:00',
              availableEndDate: '2022-09-20 00:00:00',
              register: '권영기',
            },
            {
              price: 1000,
              availableStartDate: '2022-09-10 00:00:00',
              availableEndDate: '2022-09-15 00:00:00',
              register: '권영기',
            },
            {
              price: 3000,
              availableStartDate: '2022-09-01 00:00:00',
              availableEndDate: '2022-09-10 00:00:00',
              register: '권영기',
            },
            {
              price: 3000,
              availableStartDate: '2022-08-20 00:00:00',
              availableEndDate: '2022-09-01 00:00:00',
              register: '권영기',
            },
            {
              price: 3000,
              availableStartDate: '2022-08-01 00:00:00',
              availableEndDate: '2022-08-20 00:00:00',
              register: '권영기',
            },
          ],
        })
      )
    }
  ),
  CreateProductPurchasePrice: rest.post(
    MDMMockPath.CreateProductPurchasePrice,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            id: 'MPP0004',
          },
        })
      )
    }
  ),
  ProductPurchasePriceDetail: rest.get(
    MDMMockPath.ProductPurchasePriceDetail,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            id: 'PPP0001',
            goods: {
              code: 'M0001',
              name: '원부자재입니다',
            },
            supplier: 'chicken',
            price: 990000,
            availableStartDate: '2022-08-23 00:00:00',
          },
        })
      )
    }
  ),
  UpdateProductPurchasePrice: rest.patch(
    MDMMockPath.ProductPurchasePriceDetail,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            result: true,
          },
        })
      )
    }
  ),
  DeleteProductPurchasePrice: rest.delete(
    MDMMockPath.ProductPurchasePriceDetail,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            result: true,
          },
        })
      )
    }
  ),
  MaterialListForPurchasePrice: rest.get(
    MDMMockPath.MaterialListForPurchasePrice,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              code: 'M0001',
              name: '자재 1',
            },
            {
              code: 'M0002',
              name: '자재 2',
            },
            {
              code: 'M0003',
              name: '자재 3',
            },
            {
              code: 'M0004',
              name: '자재 4',
            },
            {
              code: 'M0005',
              name: '자재 5',
            },
            {
              code: 'M0006',
              name: '자재 6',
            },
            {
              code: 'M0007',
              name: '자재 7',
            },
            {
              code: 'M0008',
              name: '자재 8',
            },
            {
              code: 'M0009',
              name: '자재 9',
            },
            {
              code: 'M00010',
              name: '자재 10',
            },
            {
              code: 'M00011',
              name: '자재 11',
            },
            {
              code: 'M00012',
              name: '자재 12',
            },
          ],
        })
      )
    }
  ),
  ProductListForPurchasePrice: rest.get(
    MDMMockPath.ProductListForPurchasePrice,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              code: 'P0001',
              name: '제상품 1',
            },
            {
              code: 'P0002',
              name: '제상품 2',
            },
            {
              code: 'P0003',
              name: '제상품 3',
            },
            {
              code: 'P0004',
              name: '제상품 4',
            },
            {
              code: 'P0005',
              name: '제상품 5',
            },
            {
              code: 'P0006',
              name: '제상품 6',
            },
            {
              code: 'P0007',
              name: '제상품 7',
            },
            {
              code: 'P0008',
              name: '제상품 8',
            },
            {
              code: 'P0009',
              name: '제상품 9',
            },
            {
              code: 'P00010',
              name: '제상품 10',
            },
            {
              code: 'P00011',
              name: '제상품 11',
            },
            {
              code: 'P00012',
              name: '제상품 12',
            },
          ],
        })
      )
    }
  ),
}
