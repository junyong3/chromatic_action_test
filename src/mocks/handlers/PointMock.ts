import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { COMMERCE_POINT_API_PATH as API } from '@api/path/Commerce/pointPath'
import { rest } from 'msw'
const ROOT_PATH = API_ROOT_PATH.COMMERCE

export const PointMock = {
  CreatePointPaymentTarget: rest.post(
    `${ROOT_PATH}${API.CREATE_POINT_TARGET}`,
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
  PointList: rest.get(`${ROOT_PATH}${API.POINT_LIST}`, (req, res, ctx) => {
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
    `${ROOT_PATH}${API.POINT_FAILED_LIST}`,
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
    `${ROOT_PATH}${API.DELETE_POINT}`,
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
