import { ListPagination } from './common'

export interface NoticeDto {
  readonly id: number
  title: string
  content?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export type NoticeListRes = ListPagination & { items: Array<NoticeDto> }

export interface CreateNoticeReq {
  title: string
  content: string
  published?: boolean
}

export type UpdateNoticeReq = Omit<NoticeDto, 'id' | 'updatedAt' | 'createdAt'>
