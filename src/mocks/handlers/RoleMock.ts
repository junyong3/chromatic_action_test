import { rest } from 'msw'
import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { IAM_API_PATH as API } from '@api/path/IAM/iamPath'

const IAM_PATH = API_ROOT_PATH.IAM

export const RoleMock = {
  RoleList: rest.get(`${IAM_PATH}${API.ROLE_LIST}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: [
          {
            id: 1,
            name: '테스트용 회원조회 관리자',
            memo: '메모 테스트',
            memo2: '메모',
            memo3: '메모3',
            createdAt: '2022-09-22T01:39:40.345Z',
            updatedAt: '2022-09-22T01:39:40.346Z',
            _count: { usersOnRoles: 1, permissionsOnRoles: 1 },
          },
        ],
        message: '성공',
        success: true,
      })
    )
  }),
  RolePrepare: rest.get(`${IAM_PATH}${API.ROLE_PREPARE}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: {
          users: [
            {
              id: 'e8a0476b-d494-4c73-9d04-6927b13102e3',
              username: 'cy-test@yookgak.com',
            },
          ],
          permissions: [
            {
              id: 201,
              name: '회원 조회',
              description: '회원목록 및 회원상세 조회 권한',
              createdAt: '2022-08-17T08:34:24.240Z',
              updatedAt: '2022-08-17T08:34:24.240Z',
            },
          ],
        },
        message: '성공',
        success: true,
      })
    )
  }),
  CreateRole: rest.post(`${IAM_PATH}${API.ROLE_LIST}`, (req, res, ctx) => {
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
  RoleDetail: rest.get(`${IAM_PATH}${API.ROLE('1')}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: {
          id: 1,
          name: '테스트용 회원조회 관리자',
          memo: '회원 조회 권한만 있고 회원 수정 권한이 없는 역할',
          createdAt: '2022-09-22T01:39:40.345Z',
          existingUsersOnRole: [],
          existingPermissionsOnRole: [
            {
              id: 201,
              name: '회원 조회',
              description: '회원목록 및 회원상세 조회 권한',
              assignedAt: '2022-09-22T01:39:40.345Z',
            },
          ],
          allUsers: [
            {
              id: 'e8a0476b-d494-4c73-9d04-6927b13102e3',
              username: 'cy-test@yookgak.com',
            },
          ],
          allPermissions: [
            {
              id: 201,
              name: '회원 조회',
              description: '회원목록 및 회원상세 조회 권한',
            },
          ],
        },
        message: '성공',
        success: true,
      })
    )
  }),
  UpdateRole: rest.put(`${IAM_PATH}${API.ROLE('1')}`, (req, res, ctx) => {
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
  DeleteRole: rest.delete(`${IAM_PATH}${API.ROLE('1')}`, (req, res, ctx) => {
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
}
