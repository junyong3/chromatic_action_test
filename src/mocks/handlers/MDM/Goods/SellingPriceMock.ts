import { rest } from 'msw'
import { MDMMockPath } from '@src/mocks/mockPath'

export const SellingPriceMock = {
  ProductSellingPriceList: rest.get(
    MDMMockPath.ProductSellingPriceList,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              id: 'PSP0001',
              goods: {
                code: 'P0001',
                name: '제상품 1',
              },
              customer: {
                code: 'C0001',
                name: '거래거래사',
              },
              price: 3000,
              availableStartDate: '2022-08-17 00:00:00',
              register: '권영기',
            },
          ],
        })
      )
    }
  ),
  ProductSellingPriceHistory: rest.get(
    MDMMockPath.ProductSellingPriceHistory,
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
  CreateProductSellingPrice: rest.post(
    MDMMockPath.CreateProductSellingPrice,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            id: 'PSP0004',
          },
        })
      )
    }
  ),
  ProductSellingPriceDetail: rest.get(
    MDMMockPath.ProductSellingPriceDetail,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            id: 'PSP0001',
            goods: {
              code: 'M0001',
              name: '상품입니다',
            },
            customer: 'chicken',
            price: 990000,
            availableStartDate: '2022-08-23 00:00:00',
          },
        })
      )
    }
  ),
  UpdateProductSellingPrice: rest.patch(
    MDMMockPath.ProductSellingPriceDetail,
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
  DeleteProductSellingPrice: rest.delete(
    MDMMockPath.ProductSellingPriceDetail,
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
  ProductListForSellingPrice: rest.get(
    MDMMockPath.ProductListForSellingPrice,
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
