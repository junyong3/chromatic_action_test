import { rest } from 'msw'
import { MemberStatus, OrderCheck } from '@stores/Commerce/Member/member.store'
import { CommerceMockPath } from '@mocks/mockPath'

export const MemberMock = {
  MemberList: rest.get(CommerceMockPath.MemberList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 119,
          page: 1,
          limit: 10,
          user: [
            {
              id: 'gQi86Nao3bTvBiE0kR60r8w7z662O',
              name: '황*리',
              email: 'ab*****@yookgak.com',
              phone: '010****1909',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-08-01T02:45:39.376Z',
            },
            {
              id: 'gQi86Nao3bTvBiE0kR60r8w7z663P',
              name: '황***리자로',
              email: 'cd*****@yookgak.com',
              phone: '010****1909',
              memberStatus: MemberStatus.SECESSION,
              registerDate: '2022-08-10T02:45:39.376Z',
            },
            {
              id: 'gQi86Nao3bTvBiE0kR60r8w7z664Q',
              name: '끝*는말은',
              email: 'ef*****@yookgak.com',
              phone: '010****1909',
              memberStatus: MemberStatus.SECESSION,
              registerDate: '2022-08-05T02:45:39.376Z',
            },
            {
              id: 'hhQi86N3bTvBiE0kR60r8w7z665',
              name: '미*리',
              email: 'ab*****@yookgak.com',
              phone: '010****3333',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-08-01T02:45:39.376Z',
            },
            {
              id: 'hhQi86N3bTvBiE0kR60r8w7z663',
              name: '개*리',
              email: 'cd*****@yookgak.com',
              phone: '010****3333',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-08-10T02:45:39.376Z',
            },
            {
              id: 'hhQi86N3bTvBiE0kR60r8w7z664',
              name: '초*리',
              email: 'ef*****@yookgak.com',
              phone: '010****3333',
              memberStatus: MemberStatus.SECESSION,
              registerDate: '2022-08-05T02:45:39.376Z',
            },
            {
              id: 'YUYUi86Nao3bTvBiE0kR60r8w7z662',
              name: '파*리',
              email: 'ab*****@yookgak.com',
              phone: '010****1911',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-08-01T02:45:39.376Z',
            },
            {
              id: 'YUYUi86Nao3bTvBiE0kR60r8w7z663',
              name: '필릴릴리',
              email: 'cd*****@yookgak.com',
              phone: '010****1911',
              memberStatus: MemberStatus.DORMANCY,
              registerDate: '2022-08-10T02:45:39.376Z',
            },
            {
              id: 'YUYUi86Nao3bTvBiE0kR60r8w7z664',
              name: '파리',
              email: 'ef*****@yookgak.com',
              phone: '010****1911',
              memberStatus: MemberStatus.DORMANCY,
              registerDate: '2022-08-05T02:45:39.376Z',
            },
            {
              id: 'gQi86Nao3bTvBiE0kR60r8w7z662',
              name: '띠로리',
              email: 'yiyi*****@yookgak.com',
              phone: '010****2345',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-08-01T02:45:39.376Z',
            },
            {
              id: 'gQi86Nao3bTvBiE0kR60r8w7z663',
              name: '머리',
              email: 'yiyi*****@yookgak.com',
              phone: '010****2345',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-08-10T02:45:39.376Z',
            },
            {
              id: 'gQi86Nao3bTvBiE0kR60r8w7z664',
              name: '오리',
              email: 'yiyi*****@yookgak.com',
              phone: '010****2345',
              memberStatus: MemberStatus.DORMANCY,
              registerDate: '2022-08-05T02:45:39.376Z',
            },
            {
              id: 'gQi86Nao3bTvBiE0kR60r8w7z663P',
              name: '닭한마리',
              email: 'ab*****@yookgak.com',
              phone: '010****7788',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-07-01T02:45:39.376Z',
            },
            {
              id: 'TJDUDUdwNao3bTvBiE0kR60r8w7z663',
              name: '맛있겠다',
              email: 'cd*****@yookgak.com',
              phone: '010****7788',
              memberStatus: MemberStatus.NORMAL,
              registerDate: '2022-07-10T02:45:39.376Z',
            },
            {
              id: 'TJDUDUdwNao3bTvBiE0kR60r8w7z664',
              name: '유리항아리',
              email: 'ef*****@yookgak.com',
              phone: '010****7788',
              memberStatus: MemberStatus.DORMANCY,
              registerDate: '2022-07-05T02:45:39.376Z',
            },
          ],
        },
      })
    )
  }),
  MemberDetail: rest.get(CommerceMockPath.MemberDetail, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 'SUCCESS',
        message: '조회성공',
        data: {
          id: 'gQi86Nao3bTvBiE0kR60r8w7z663P',
          name: '황미리',
          email: 'skyc1212@naver.com',
          phone: '01022334455',
          registerDate: '2022-07-05T02:45:39.376Z',
          registerRoute: '자체',
          registerDevice: 'IOS',
          memberStatus: MemberStatus.NORMAL,
          orderCheck: OrderCheck.YES,
          fcmToken: '12313',
          useWebPushYN: 'Y',
        },
      })
    )
  ),
  VerifyPhone: rest.post(CommerceMockPath.VerifyPhone, (req, res, ctx) => {
    const successJSON = {
      success: true,
      code: 'SUCCESS',
      message: '중복조회 완료',
      data: {
        result: true,
      },
    }

    return res(ctx.status(200), ctx.json(successJSON))
  }),
  VerifyEmail: rest.post(CommerceMockPath.VerifyEmail, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 'SUCCESS',
        message: '중복조회 완료',
        data: {
          result: false,
        },
      })
    )
  ),
  UpdateMember: rest.patch(CommerceMockPath.UpdateMember, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 'SUCCESS',
        message: '수정 성공',
        data: {
          user: {
            id: 'gQi86Nao3bTvBiE0kR60r8w7z663P',
            name: '황미리',
            email: 'skyc1212@naver.com',
            phone: '123',
            registerDate: '2022-07-05T02:45:39.376Z',
            memberStatus: MemberStatus.NORMAL,
            orderCheck: OrderCheck.YES,
            fcmToken: '12313',
            useWebPushYN: 'Y',
          },
        },
      })
    )
  ),
  CSCouponList: rest.get(CommerceMockPath.CSCouponList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 'SUCCESS',
        message: '성공',
        data: [
          {
            id: 1,
            couponCode: 'pp386hg34',
            couponName: '무료 배송',
          },
          {
            id: 2,
            couponCode: 'tt386hg34',
            couponName: '첫 구매 할인',
          },
          {
            id: 3,
            couponCode: 'qq386hg34',
            couponName: '10% 할인',
          },
          {
            id: 4,
            couponCode: 'aa386hg34',
            couponName: '5,000원 할인',
          },
        ],
      })
    )
  }),
  MemberCouponList: rest.get(
    CommerceMockPath.MemberCouponList,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '성공',
          data: {
            total: 119,
            page: 1,
            limit: 10,
            coupon: [
              {
                couponId: Date.now() + 'a',
                couponName: '추석 할인 행사',
                couponType: '판매가 할인',
                benefitType: '정액 5000원',
                paymentMethod: '다운로드',
                couponDuration: {
                  startDate: '2022-08-10T02:45:39.376Z',
                  endDate: '2022-08-20T02:45:39.376Z',
                },
                issuedDate: '2022-08-18T13:45:39.376Z',
                used: {
                  usedDate: '2022-08-19T13:45:39.376Z',
                  orderNumber: 3132131293219,
                },
                manager: { team: 'CS운영기획팀', name: '김소영' },
                isExposed: true,
              },
              {
                couponId: Date.now() + 'b',
                couponName: '다 가져가',
                couponType: '증정',
                benefitType: '삼겹살 3kg',
                paymentMethod: '등록형',
                couponDuration: {
                  startDate: '2022-08-20T02:45:39.376Z',
                  endDate: '2022-09-28T02:45:39.376Z',
                },
                issuedDate: '2022-09-20T14:45:39.376Z',
                used: null,
                manager: { team: 'CS운영팀', name: '김소일' },
                isExposed: false,
              },
              {
                couponId: Date.now() + 'c',
                couponName: '가입 축하하하',
                couponType: '판매가 할인',
                benefitType: '할인 1%',
                paymentMethod: '자동지급',
                couponDuration: {
                  startDate: '2022-07-20T02:45:39.376Z',
                  endDate: '2022-07-28T02:45:39.376Z',
                },
                issuedDate: '2022-07-20T14:45:39.376Z',
                used: null,
                manager: null,
                isExposed: true,
              },
            ],
          },
        })
      )
    }
  ),
  GiveMemberCoupon: rest.post(
    CommerceMockPath.GiveMemberCoupon,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '쿠폰 지급 완료',
          data: {
            data: true,
          },
        })
      )
  ),
  DeleteMemberCoupon: rest.delete(
    CommerceMockPath.DeleteMemberCoupon,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '쿠폰 삭제 완료',
          data: {
            data: true,
          },
        })
      )
  ),
  MemberPointHistoryList: rest.get(
    CommerceMockPath.MemberPointHistoryList,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '성공',
          data: {
            total: 119,
            page: 1,
            limit: 10,
            usablePoint: 10000,
            expiringPoint: 100,
            point: [
              {
                pointId: Date.now() + 'a',
                registerDate: '2022-09-01T02:45:39.376Z',
                reason: '단백질 부족',
                amount: 593000,
                endDate: '2023-08-21T02:45:39.376Z',
                manager: { team: 'CS운영기획팀', name: '김소영' },
                isExposed: true,
              },
              {
                pointId: Date.now() + 'b',
                registerDate: '2022-08-20T02:45:39.376Z',
                reason: '기간 만료',
                amount: -3000,
                endDate: '2022-08-21T02:45:39.376Z',
                manager: { team: 'CS운영팀', name: '김소일' },
                isExposed: false,
              },
              {
                pointId: Date.now() + 'c',
                registerDate: '2022-09-01T02:45:39.376Z',
                reason: '기간 만료',
                amount: -3000,
                endDate: '2022-09-03T02:45:39.376Z',
                manager: null,
                isExposed: true,
              },
            ],
          },
        })
      )
    }
  ),
  UseMemberPoint: rest.patch(CommerceMockPath.UseMemberPoint, (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        success: true,
        code: 'SUCCESS',
        message: '적립금 사용 완료',
        data: {
          result: true,
        },
      })
    )
  ),
  GiveMemberPoint: rest.post(
    CommerceMockPath.GiveMemberPoint,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '적립금 지급 완료',
          data: {
            result: true,
          },
        })
      )
  ),
  ToggleMemberCouponExposed: rest.patch(
    CommerceMockPath.ToggleMemberCouponExposed,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '쿠폰 노출여부 변경 완료',
          data: {
            result: true,
          },
        })
      )
  ),
  ToggleMemberPointHistoryExposed: rest.patch(
    CommerceMockPath.ToggleMemberPointHistoryExposed,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '적립금 내역 노출여부 변경 완료',
          data: {
            result: true,
          },
        })
      )
  ),
  MemberRefundAccountInfo: rest.get(
    CommerceMockPath.MemberRefundAccountInfo,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: {
            bank: '신한',
            accountNumber: '110393205045',
            customerName: '박준용',
          },
        })
      )
    }
  ),
  SaveMemberRefundAccount: rest.patch(
    CommerceMockPath.SaveMemberRefundAccount,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ code: 'SUCCESS', message: '성공', data: true })
      )
    }
  ),
  RemoveMemberRefundAccount: rest.patch(
    CommerceMockPath.RemoveMemberRefundAccount,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ code: 'SUCCESS', message: '성공', data: true })
      )
    }
  ),
  RefundAccountBankList: rest.get(
    CommerceMockPath.RefundAccountBankList,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            '경남',
            '광주',
            '국민',
            '기업',
            '농협',
            '단위농협',
            '대구',
            '부산',
            '산업',
            '새마을',
            '산림',
            '수협',
            '신한',
            '신협',
            '씨티',
            '우리',
            '우체국',
            '저축',
            '전북',
            '제주',
            '카카오',
            '케이',
            '토스',
            '하나',
            'SC제일',
            '홍콩상하이',
          ],
        })
      )
    }
  ),
  AddMemberCreditCard: rest.post(
    CommerceMockPath.AddMemberCreditCard,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [],
        })
      )
    }
  ),
  DeleteMemberCreditCard: rest.delete(
    CommerceMockPath.DeleteMemberCoupon,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [],
        })
      )
    }
  ),
  MemberCreditCardList: rest.get(
    CommerceMockPath.MemberCreditCardList,
    (req, res, ctx) => {
      // const params = req.body as any
      // const { id } = req.params
      // console.log('mock Api id: ', id)
      // console.log('mock Api params: ', params)

      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          message: '성공',
          data: [
            {
              id: 'cl89xufpm03210jr7x56we9at',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard4',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:32:27.658Z',
              updatedAt: '2022-09-20T08:32:27.876Z',
            },
            {
              id: 'cl89xrs7j02280jr7mae17c16',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: '슈퍼카드',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-03',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:30:23.887Z',
              updatedAt: '2022-09-20T08:30:24.316Z',
            },
            {
              id: 'cl89pcjpd00070jr7i5v68yxn',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2030-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T04:34:36.097Z',
              updatedAt: '2022-09-20T04:34:36.486Z',
            },
            {
              id: 'cl89pdb8400090kpjfmh1465j',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard2',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T04:35:11.764Z',
              updatedAt: '2022-09-20T04:35:12.071Z',
            },
            {
              id: 'cl89xsxxm02550jr7hwfraifw',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: '플레티넘카드',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2023-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:31:17.962Z',
              updatedAt: '2022-09-20T08:31:18.360Z',
            },
            {
              id: 'cl89xtqjr02960jr74hlmafg9',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: '패스카드',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2030-03',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:31:55.047Z',
              updatedAt: '2022-09-20T08:31:55.461Z',
            },
            {
              id: 'cl89xue1x01900kpj63i9gjay',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard4',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:32:25.509Z',
              updatedAt: '2022-09-20T08:32:25.778Z',
            },
            {
              id: 'cl89xuexx02150kpjeme4cxab',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard4',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:32:26.661Z',
              updatedAt: '2022-09-20T08:32:26.865Z',
            },
            {
              id: 'cl89xugdx03460jr75t5qul7q',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard4',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:32:28.533Z',
              updatedAt: '2022-09-20T08:32:28.776Z',
            },
            {
              id: 'cl89xuh2w03710jr7ftzehi6x',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard4',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:32:29.432Z',
              updatedAt: '2022-09-20T08:32:29.666Z',
            },
            {
              id: 'cl89xuhrt03960jr73gxlxdc9',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard4',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:32:30.329Z',
              updatedAt: '2022-09-20T08:32:30.549Z',
            },
            {
              id: 'cl89xuih004210jr7yz45iiz4',
              userId: '01GAT8CJY5SYXNZS6TNZ9SETWW',
              cardName: 'MyCard4',
              company: '하나',
              last4Digits: '3481',
              expirationDt: '2027-01',
              type: 'CREDIT',
              status: 'AVAILABLE',
              lastUsedAt: null,
              createdAt: '2022-09-20T08:32:31.236Z',
              updatedAt: '2022-09-20T08:32:31.474Z',
            },
          ],
        })
      )
    }
  ),
}
