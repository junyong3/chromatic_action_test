import { rest } from 'msw'
import { CommerceMockPath } from '@mocks/mockPath'

export const CouponMock = {
  CouponList: rest.get(CommerceMockPath.CouponList, (req, res, ctx) => {
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
              couponCode: 'pp386hg34',
              couponName: {
                customer: '첫구매 이벤트쿠폰',
                internal: '첫구매 할인',
              },
              couponDuration: {
                startDate: '2022-08-17 00:00:00',
                endDate: '2022-08-22 00:00:00',
              },
              couponType: '상품가 할인',
              benefitType: '정액 5,000원',
              paymentMethod: '다운로드',
              status: '저장완료',
              createdDate: '2022-09-03',
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  VerifyCouponCode: rest.post(
    CommerceMockPath.VerifyCouponCode,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '중복조회 완료',
          data: {
            result: true,
          },
        })
      )
  ),
  CreateCoupon: rest.post(CommerceMockPath.CreateCoupon, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          couponId: 1,
        },
      })
    )
  }),
  CouponSetActive: rest.patch(
    CommerceMockPath.CouponSetActive,
    (req, res, ctx) =>
      res(
        ctx.status(200),
        ctx.json({
          success: true,
          code: 'SUCCESS',
          message: '활성 상태 변경',
          data: {
            result: true,
          },
        })
      )
  ),
  CouponDetail: rest.get(CommerceMockPath.CouponDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          isActive: false,
          couponCode: 'pp386hg34',
          couponDuration: {
            type: 'duration',
            duration: {
              startDate: '2022-08-17 00:00:00',
              endDate: '2022-08-22 00:00:00',
            },
            validDayFromDownload: undefined,
          },
          couponName: {
            internal: '운영용 쿠폰명',
            customer: '고객용 쿠폰명',
          },
          channel: ['app', 'web'],
          couponType: 'discountPrice',
          target: {
            customer: {
              type: 'some',
              count: undefined,
              list: [],
            },
            product: {
              type: 'someProduct',
              someProduct: {
                count: undefined,
                list: [],
                except: false,
              },
              someCategory: {
                count: undefined,
                list: [],
                except: false,
              },
            },
          },
          productDiscountRestrictions: '1QuantityDiscount',
          benefitType: {
            // price || percent
            type: 'price',
            price: 10000,
            percent: undefined,
          },
          termsOfUse: {
            // maxDiscountPrice || minPaymentPrice
            type: ['maxDiscountPrice', 'minPaymentPrice'],
            maxDiscountPrice: 100000,
            minPaymentPrice: 40000,
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
      })
    )
  }),
  UpdateCoupon: rest.post(CommerceMockPath.UpdateCoupon, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '수정 성공',
        data: {},
      })
    )
  }),
  ProductList: rest.get(CommerceMockPath.ProductList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 2,
          page: 1,
          items: [
            {
              id: 1,
              productCode: '12',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 2,
              productCode: '34',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 3,
              productCode: '56',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 4,
              productCode: '78',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 5,
              productCode: '90',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 6,
              productCode: '1112',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 7,
              productCode: '1314',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 8,
              productCode: '1516',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 9,
              productCode: '1718',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 10,
              productCode: '1920',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
            {
              id: 11,
              productCode: '2122',
              productName: '무항생제 돼지 오겹살',
              price: 15000,
              categoryName: '신선식품>육류>돼지고기',
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  CategoryList: rest.get(CommerceMockPath.CategoryList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 2,
          page: 1,
          items: [
            {
              id: 1,
              categoryCode: '12',
              mainCategoryName: '신선식품',
              middleCategoryName: '육류',
              subCategoryName: '소분류명',
            },
            {
              id: 2,
              categoryCode: '24',
              mainCategoryName: '신선식품2',
              middleCategoryName: '육류2',
              subCategoryName: '소분류명2',
            },
            {
              id: 3,
              categoryCode: '34',
              mainCategoryName: '신선식품3',
              middleCategoryName: '육류3',
              subCategoryName: '소분류명3',
            },
            {
              id: 4,
              categoryCode: '44',
              mainCategoryName: '신선식품4',
              middleCategoryName: '육류4',
              subCategoryName: '소분류명4',
            },
            {
              id: 5,
              categoryCode: '54',
              mainCategoryName: '신선식품5',
              middleCategoryName: '육류5',
              subCategoryName: '소분류명5',
            },
            {
              id: 6,
              categoryCode: '64',
              mainCategoryName: '신선식품6',
              middleCategoryName: '육류6',
              subCategoryName: '소분류명6',
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  CustomerList: rest.get(CommerceMockPath.CustomerList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {
          total: 5,
          page: 1,
          items: [
            {
              id: 1,
              customerCode: '7654321',
              customerName: '김*일',
              email: 'syk1****@naver.com',
            },
            {
              id: 2,
              customerCode: '7654322',
              customerName: '김*이',
              email: 'syk2****@naver.com',
            },
            {
              id: 3,
              customerCode: '7654323',
              customerName: '김*삼',
              email: 'syk3****@naver.com',
            },
            {
              id: 4,
              customerCode: '7654324',
              customerName: '김*사',
              email: 'syk4****@naver.com',
            },
            {
              id: 5,
              customerCode: '7654325',
              customerName: '김*오',
              email: 'syk5****@naver.com',
            },
          ],
          limit: 10,
        },
      })
    )
  }),
}
