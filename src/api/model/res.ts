import { IAMErrorRes, IAMSuccessRes } from '@api/model/IAMRes'
import { CommerceErrorRes, CommerceSuccessRes } from '@api/model/CommerceRes'

export type SuccessRes<SD> = IAMSuccessRes<SD> & CommerceSuccessRes<SD>
export type ErrorRes<FD> = IAMErrorRes<FD> & CommerceErrorRes<FD>
