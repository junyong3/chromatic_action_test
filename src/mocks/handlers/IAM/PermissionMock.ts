import { rest } from 'msw'
import { IAMMockPath } from '@mocks/mockPath'

export const PermissionMock = {
  PermissionList: rest.get(IAMMockPath.PermissionList, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: [
          {
            id: 207,
            name: '주문목록 다운로드',
            description: '주문목록 다운로드 권한 (망분리 대상)\n테스트',
            createdAt: '2022-08-17T08:39:53.453Z',
            updatedAt: '2022-08-19T01:15:23.992Z',
          },
        ],
        message: '성공',
        success: true,
      })
    )
  }),
  CreatePermission: rest.post(IAMMockPath.CreatePermission, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: {},
        message: '성공',
        success: true,
      })
    )
  }),
  PermissionDetail: rest.get(IAMMockPath.PermissionDetail, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: {
          id: 207,
          name: '주문목록 다운로드',
          description: '주문목록 다운로드 권한 (망분리 대상)\n테스트',
          createdAt: '2022-08-17T08:39:53.453Z',
          updatedAt: '2022-08-19T01:15:23.992Z',
          permissionsOnRoles: [],
          actorUsername: 'shkang@yookgak.com',
          loggedAt: '2022-08-19T01:15:23.998Z',
        },
        message: '성공',
        success: true,
      })
    )
  }),
  UpdatePermission: rest.put(IAMMockPath.UpdatePermission, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: { id: 1 },
        message: '성공',
        success: true,
      })
    )
  }),
  DeletePermission: rest.delete(
    IAMMockPath.DeletePermission,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          data: {},
          message: '성공',
          success: true,
        })
      )
    }
  ),
}
