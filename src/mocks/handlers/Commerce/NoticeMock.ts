import { rest } from 'msw'
import { CommerceMockPath } from '@mocks/mockPath'

export const NoticeMock = {
  NoticeCreate: rest.post(CommerceMockPath.NoticeCreate, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        message: '성공',
        data: {},
      })
    )
  }),
  NoticeList: rest.get(CommerceMockPath.NoticeList, (req, res, ctx) => {
    console.log(req, res, ctx)
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
              id: 152,
              createdAt: '2022-08-05T02:45:39.376Z',
              updatedAt: '2022-08-05T04:52:54.978Z',
              title: '역할 없는 사용자가 공지를 만들 수 있는지111',
              published: true,
            },
            {
              id: 148,
              createdAt: '2022-08-04T08:45:41.252Z',
              updatedAt: '2022-08-04T09:05:58.861Z',
              title: 'National Intranet Assistant',
              published: false,
            },
            {
              id: 147,
              createdAt: '2022-08-04T08:39:49.958Z',
              updatedAt: '2022-08-04T08:39:49.958Z',
              title: 'Global Web Executive',
              published: false,
            },
            {
              id: 146,
              createdAt: '2022-08-04T08:29:33.297Z',
              updatedAt: '2022-08-04T08:29:33.297Z',
              title: 'Investor Mobility Associate',
              published: false,
            },
            {
              id: 144,
              createdAt: '2022-08-04T08:27:40.656Z',
              updatedAt: '2022-08-04T08:27:40.657Z',
              title: 'Future Marketing Architect',
              published: false,
            },
            {
              id: 143,
              createdAt: '2022-08-04T08:27:01.848Z',
              updatedAt: '2022-08-04T08:27:01.848Z',
              title: 'Dynamic Research Strategist',
              published: false,
            },
            {
              id: 138,
              createdAt: '2022-08-04T04:14:57.381Z',
              updatedAt: '2022-08-05T05:17:30.683Z',
              title: '에디터 교체1',
              published: false,
            },
            {
              id: 133,
              createdAt: '2022-08-02T08:50:44.646Z',
              updatedAt: '2022-08-04T02:41:03.865Z',
              title: '공지 생성 테스트',
              published: true,
            },
            {
              id: 132,
              createdAt: '2022-08-02T08:18:45.930Z',
              updatedAt: '2022-08-04T03:00:36.278Z',
              title: '테스트',
              published: false,
            },
            {
              id: 118,
              createdAt: '2022-08-02T04:49:59.973Z',
              updatedAt: '2022-08-04T06:44:54.929Z',
              title: '공지 육각 내용1',
              published: true,
            },
          ],
          limit: 10,
        },
      })
    )
  }),
}
