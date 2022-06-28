import { RouteConfig } from '@routes/rotuerType'
import HomePage from '@pages/HomePage'
import LoginPage from '@pages/LoginPage'
import ChangePasswordPage from '@pages/ChangePasswordPage'
import IAMLayout from '@layouts/IAMLayout'
import EmptyLayout from '@layouts/EmptyLayout'
import {
  IAMRolesDetailPage,
  IAMRolesListPage,
  IAMRolesUpdatePage,
} from '@pages/IAM/IAMRolesPage'
import {
  IAMPermissionsDetailPage,
  IAMPermissionsListPage,
  IAMPermissionsUpdatePage,
} from '@pages/IAM/IAMPermissionsPage'
import { IAMUsersDetailPage, IAMUsersListPage } from '@pages/IAM/IAMUsersPage'

export const Path = {
  Home: '/',
  Login: '/login',
  ChangePassword: '/change-password',
  IAM: {
    Base: '/iam',
    Home: '',
    UsersList: 'users',
    UsersDetail: 'users/:id',
    RolesList: 'roles',
    RolesCreate: 'roles/create',
    RolesDetail: 'roles/:id',
    RolesUpdate: 'roles/:id/update',
    PermissionsList: 'permissions',
    PermissionsCreate: 'permissions/create',
    PermissionsDetail: 'permissions/:id',
    PermissionsUpdate: 'permissions/:id/update',
  },
}

export const routeList: RouteConfig = {
  ROOT: [
    {
      name: 'Home',
      path: Path.Home,
      type: 'layout',
      component: <HomePage />,
    },
    {
      name: 'Login',
      path: Path.Login,
      type: 'layout',
      component: <LoginPage />,
    },
    {
      name: 'ChangePassword',
      path: Path.ChangePassword,
      type: 'layout',
      component: <ChangePasswordPage />,
    },
  ],
  IAM: [
    {
      name: 'Base',
      path: Path.IAM.Base,
      component: <IAMLayout />,
    },
    {
      name: 'Empty',
      path: Path.IAM.Base,
      component: <EmptyLayout />,
    },
    {
      name: 'UsersList',
      path: Path.IAM.UsersList,
      type: 'layout',
      component: <IAMUsersListPage />,
    },
    {
      name: 'UsersDetail',
      path: Path.IAM.UsersDetail,
      type: 'empty',
      component: <IAMUsersDetailPage />,
    },
    {
      name: 'RolesList',
      path: Path.IAM.RolesList,
      type: 'layout',
      component: <IAMRolesListPage />,
    },
    {
      name: 'RolesCreate',
      path: Path.IAM.RolesCreate,
      type: 'empty',
      component: <IAMRolesUpdatePage />,
    },
    {
      name: 'RolesDetail',
      path: Path.IAM.RolesDetail,
      type: 'empty',
      component: <IAMRolesDetailPage />,
    },
    {
      name: 'RolesUpdate',
      path: Path.IAM.RolesUpdate,
      type: 'empty',
      component: <IAMRolesUpdatePage />,
    },
    {
      name: 'PermissionsList',
      path: Path.IAM.PermissionsList,
      type: 'layout',
      component: <IAMPermissionsListPage />,
    },
    {
      name: 'PermissionsCreate',
      path: Path.IAM.PermissionsCreate,
      type: 'empty',
      component: <IAMPermissionsUpdatePage />,
    },
    {
      name: 'PermissionsDetail',
      path: Path.IAM.PermissionsDetail,
      type: 'empty',
      component: <IAMPermissionsDetailPage />,
    },
    {
      name: 'PermissionsUpdate',
      path: Path.IAM.PermissionsUpdate,
      type: 'empty',
      component: <IAMPermissionsUpdatePage />,
    },
  ],
}
