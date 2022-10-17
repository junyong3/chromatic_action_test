import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { COMMERCE_PAYMENT_API_PATH as API } from '@api/path/Commerce/paymentPath'
import { rest } from 'msw'
const ROOT_PATH = API_ROOT_PATH.COMMERCE

const paymentDetailList = [
  {
    id: 152,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'complete',
    payMethod: 'choshop',
    amount: '100000',
    userInfo: { userName: '박*진', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 153,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'complete',
    payMethod: 'virtualAccount',
    amount: '999999',
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3****2222',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 154,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'complete',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 155,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'fail',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 152,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'partialCancel',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 156,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'partialCancel',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 157,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'allCancel',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 158,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'allCancel',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 159,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'allCancel',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
  {
    id: 160,
    createdAt: '2022-08-05T02:45:39.376Z',
    payStatus: 'allCancel',
    payMethod: 'choshop',
    amount: 12345678,
    userInfo: { userName: '박*용', phone: '010-****-1234' },
    reason: {
      payId: '3@ds3$3',
      msg: '유효기간 만료(카드정보 확인해주세요)',
    },
  },
]
export const PaymentMock = {
  PaymentList: rest.get(`${ROOT_PATH}${API.PAYMENT_LIST}`, (req, res, ctx) => {
    // const params = req.url.searchParams.getAll('limit')
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 119,
          page: 1,
          items: [
            {
              id: 160,
              createdAt: '2022-08-05T02:45:39.376Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'allCancel',
              payMethod: 'virtualAccount',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 148,
              createdAt: '2022-08-04T08:45:41.252Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'fail',
              payMethod: 'choshop',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)유효기간 만료(카드정보 확인해주세요)유효기간 만료(카드정보 확인해주세요)유효기간 만료(카드정보 확인해주세요)유효기간 만료(카드정보 확인해주세요)유효기간 만료(카드정보 확인해주세요)유효기간 만료(카드정보 확인해주세요',
              },
            },
            {
              id: 147,
              createdAt: '2022-08-04T08:39:49.958Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'complete',
              payMethod: 'virtualAccount',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 146,
              createdAt: '2022-08-04T08:29:33.297Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'complete',
              payMethod: 'choshop',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 144,
              createdAt: '2022-08-04T08:27:40.656Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'partialCancel',
              payMethod: 'kakao',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 143,
              createdAt: '2022-08-04T08:27:01.848Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'fail',
              payMethod: 'naver',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 138,
              createdAt: '2022-08-04T04:14:57.381Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'complete',
              payMethod: 'choshop',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 133,
              createdAt: '2022-08-02T08:50:44.646Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'complete',
              payMethod: 'choshop',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 132,
              createdAt: '2022-08-02T08:18:45.930Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'complete',
              payMethod: 'choshop',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
            {
              id: 118,
              createdAt: '2022-08-02T04:49:59.973Z',
              userInfo: {
                userId: 1,
                userName: '박*용',
                phone: '010-****-1234',
              },
              orderNumber: 3132131293219,
              payStatus: 'complete',
              payMethod: 'choshop',
              amount: 12345678,
              reason: {
                payId: '3@ds3$3',
                msg: '유효기간 만료(카드정보 확인해주세요)',
              },
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  PaymentHistory: rest.get(
    `${ROOT_PATH}${API.PAYMENT_HISTORY_LIST}`,
    (req, res, ctx) => {
      // const params = req.url.searchParams.getAll('limit')
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            total: 10,
            page: 1,
            limit: 10,
            items: paymentDetailList,
          },
        })
      )
    }
  ),
  UpdatePayment: rest.patch(
    `${ROOT_PATH}${API.PAYMENT_DETAIL(':id')}`,
    (req, res, ctx) => {
      const params = req.body as any
      const { id } = req.params
      const payStatus = params?.cancelType
      paymentDetailList.forEach((d) => {
        if (d.id === Number(id)) {
          if (payStatus === 'all') {
            d.payStatus = 'allCancel'
          } else {
            d.payStatus = 'partialCancel'
          }
        }
      })
      // cancelAccount: "312312"
      // cancelReason: {value: 'D', etcMsg: ''}
      // cancelType: "all"
      // refundsAccountInfo: {bankCode: '', accountNumber: 0, accountUser: ''}

      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            items: params,
          },
        })
      )
    }
  ),
}
