import { API_ROOT_PATH } from '@api/path/ROOTPath'
import { rest } from 'msw'
import { IAM_API_PATH as API } from '@api/path/IAM/iamPath'

const IAM_PATH = API_ROOT_PATH.IAM

export const UserMock = {
  UserList: rest.get(`${IAM_PATH}${API.USER_LIST}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: [
          {
            id: 'e8a0476b-d494-4c73-9d04-6927b13102e3',
            username: 'cy-test@yookgak.com',
            _count: { roles: 4 },
          },
        ],
        message: '성공',
        success: true,
      })
    )
  }),
  UserDetail: rest.get(`${IAM_PATH}${API.USER('1')}`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        code: 'SUCCESS',
        data: {
          id: 'e8a0476b-d494-4c73-9d04-6927b13102e3',
          username: 'cy-test@yookgak.com',
          usersOnRoles: [
            {
              id: 335,
              userId: 'e8a0476b-d494-4c73-9d04-6927b13102e3',
              roleId: 198,
              assignedAt: '2022-08-05T04:27:04.486Z',
              role: {
                id: 198,
                name: '테스트용',
                memo: '헬로우',
                memo2: '메모',
                memo3: '메모3',
                createdAt: '2022-08-04T23:39:54.724Z',
                updatedAt: '2022-08-05T04:27:04.487Z',
              },
            },
          ],
        },
        message: '성공',
        success: true,
      })
    )
  }),
}
