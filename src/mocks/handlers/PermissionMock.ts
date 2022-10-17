import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { rest } from 'msw'
import { IAM_API_PATH as API } from '@api/path/IAM/iamPath'

const IAM_PATH = API_ROOT_PATH.IAM

export const PermissionMock = {
  PermissionList: rest.get(
    `${IAM_PATH}${API.PERMISSION_LIST}`,
    (req, res, ctx) => {
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
    }
  ),
  CreatePermission: rest.post(
    `${IAM_PATH}${API.PERMISSION_LIST}`,
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
  PermissionDetail: rest.get(
    `${IAM_PATH}${API.PERMISSION('1')}`,
    (req, res, ctx) => {
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
    }
  ),
  UpdatePermission: rest.put(
    `${IAM_PATH}${API.PERMISSION('1')}`,
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          code: 'SUCCESS',
          data: { id: 1 },
          message: '성공',
          success: true,
        })
      )
    }
  ),
  DeletePermission: rest.delete(
    `${IAM_PATH}${API.PERMISSION('1')}`,
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
