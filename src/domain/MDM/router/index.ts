import { config, configChildren } from './configRoute'
import { goods, goodsChildren } from '@domain/MDM/router/goodsRoute'
import { partners, partnersChildren } from '@domain/MDM/router/partnersRoute'
import { addInfo, addInfoChildren } from '@domain/MDM/router/AddInfoRoute'

export const MDMRoot = [config, goods, partners, addInfo]
export const MDMChildren = [
  ...configChildren,
  ...goodsChildren,
  ...partnersChildren,
  ...addInfoChildren,
]
