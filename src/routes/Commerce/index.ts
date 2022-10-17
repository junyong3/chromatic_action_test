import { member, memberChildren } from './memberRoute'
import { inquiry, inquiryChildren } from './inquiryRoute'
import { notice, noticeChildren } from './noticeRoute'
import { review, reviewChildren } from './reviewRoute'
import { product, productChildren } from './productRoute'
import { exhibit, exhibitChildren } from './exhibitRoute'
import { search, searchChildren } from './searchRoute'
import { coupon, couponChildren } from './couponRoute'
import { noti, notiChildren } from './notiRoute'
import { order, orderChildren } from './orderRoute'
import { payment, paymentChildren } from './paymentRoute'
import { takeBack, takeBackChildren } from './takeBackRoute'
import { info, infoChildren } from './infoRoute'
import { point, pointChildren } from './pointRoute'

export const CommerceRoot = [
  member,
  inquiry,
  notice,
  review,
  product,
  exhibit,
  search,
  point,
  coupon,
  noti,
  order,
  payment,
  takeBack,
  info,
]
export const CommerceChildren = [
  ...memberChildren,
  ...inquiryChildren,
  ...noticeChildren,
  ...reviewChildren,
  ...productChildren,
  ...exhibitChildren,
  ...searchChildren,
  ...pointChildren,
  ...couponChildren,
  ...notiChildren,
  ...orderChildren,
  ...paymentChildren,
  ...takeBackChildren,
  ...infoChildren,
]
