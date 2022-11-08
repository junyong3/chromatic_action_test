import { CATEGORY_API_PATH as API } from '@api/path/MDM/categoryPath'
import { rest } from 'msw'

export const CategoryMock = {
  materialCategoryList: rest.get(
    `${API.MATERIAL_CATEGORY_LIST}`,
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
                id: '군-001',
                name: '군-001',
                code: '군-001',
                children: [
                  {
                    id: 'Ph1-001',
                    name: 'Ph1-001',
                    code: 'Ph1-001',
                    children: [],
                  },
                  {
                    id: 'Ph1-002',
                    name: 'Ph1-002',
                    code: 'Ph1-002',
                    children: [],
                  },
                ],
              },
              {
                id: '군-002',
                name: '군-002',
                code: '군-002',
                children: [
                  {
                    id: 'Ph2-001',
                    name: 'Ph2-001',
                    code: 'Ph2-001',
                    children: [],
                  },
                  {
                    id: 'Ph2-002',
                    name: 'Ph2-002',
                    code: 'Ph2-002',
                    children: [
                      {
                        id: 'Ph3-001',
                        name: 'Ph3-001',
                        code: 'Ph3-001',
                        children: [],
                      },
                      {
                        id: 'Ph3-002',
                        name: 'Ph3-002',
                        code: 'Ph3-002',
                        children: [],
                      },
                      {
                        id: 'Ph3-003',
                        name: 'Ph3-003',
                        code: 'Ph3-003',
                        children: [],
                      },
                    ],
                  },
                ],
              },
            ],
            limit: 10,
          },
        })
      )
    }
  ),
  updateCategory: rest.post(`${API.MATERIAL_CATEGORY}`, (req, res, ctx) => {
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
