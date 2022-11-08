import { CATEGORY_API_PATH as API } from '@api/path/Commerce/categoryPath'
import { rest } from 'msw'

export const CategoryMock = {
  productCategoryList: rest.get(`${API.PRODUCT_CATEGORY}`, (req, res, ctx) => {
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
              id: '고기',
              name: '고기',
              imageUrl: 'https://www.naver.com',
              exposureState: 'reservation',
              duration: {
                startDate: '',
                endDate: '',
              },
              children: [
                {
                  id: '1',
                  name: 'Child - 1',
                  exposureState: 'unexposed',
                  children: [],
                },
                {
                  id: '2',
                  name: 'Child - 2',
                  exposureState: 'reservation',
                  duration: {
                    startDate: '2022-10-25 12:00:00',
                    endDate: '2022-10-26 12:00:00',
                  },
                  children: [],
                },
              ],
            },
            {
              id: '생선',
              name: '생선',
              exposureState: 'unexposed',
              children: [
                {
                  id: '3',
                  name: 'Child - 3',
                  exposureState: 'reservation',
                  children: [],
                },
                {
                  id: '4',
                  name: 'Child - 4',
                  exposureState: 'reservation',
                  children: [],
                },
              ],
            },
            {
              id: '우유',
              name: '우유',
              exposureState: 'unexposed',
              children: [
                {
                  id: '5',
                  name: 'Child - 5',
                  exposureState: 'reservation',
                  children: [],
                },
                {
                  id: '6',
                  name: 'Child - 6',
                  exposureState: 'reservation',
                  children: [],
                },
              ],
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  updateProductCategory: rest.patch(
    `${API.PRODUCT_CATEGORY}`,
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
  brandCategoryList: rest.get(`${API.BRAND_CATEGORY}`, (req, res, ctx) => {
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
              id: '초신선',
              name: '초신선',
              imageUrl: 'https://www.naver.com',
              exposureState: 'exposed',
              children: [],
            },
            {
              id: '초숙성',
              name: '초숙성',
              exposureState: 'unexposed',
              children: [],
            },
            {
              id: '초제철',
              name: '초제철',
              exposureState: 'unexposed',
              children: [],
            },
            {
              id: 'BaBy',
              name: 'BaBy',
              exposureState: 'exposed',
              children: [],
            },
          ],
          limit: 10,
        },
      })
    )
  }),
  updateBrandCategory: rest.patch(`${API.BRAND_CATEGORY}`, (req, res, ctx) => {
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
