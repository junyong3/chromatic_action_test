import { rest } from 'msw'
import { CommerceMockPath } from '@mocks/mockPath'

export const PointMock = {
  CreatePointPaymentTarget: rest.post(
    CommerceMockPath.CreatePointPaymentTarget,
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
  PointList: rest.get(CommerceMockPath.PointList, (req, res, ctx) => {
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
              registrationDate: '2022-07-29 17:39:25',
              registrationFileName: '1차 리뷰어이벤트 당첨 고객',
              paymentStartDate: '2022-09-29 17:39:25',
              createdName: '김소영',
              status: '지급 예정',
              paymentResult: {
                success: 1009,
                fail: 7,
              },
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  PointFailedList: rest.get(
    CommerceMockPath.PointFailedList,
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
                customerPhone: '010-1234-5678',
              },
            ],
            limit: 10,
          },
        })
      )
    }
  ),
  DeletePointPayment: rest.delete(
    CommerceMockPath.DeletePointPayment,
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
