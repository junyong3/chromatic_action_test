import { config, configChildren } from './configRoute'
import { goods, goodsChildren } from '@src/routes/MDM/goodsRoute'

export const MDMRoot = [config, goods]
export const MDMChildren = [...configChildren, ...goodsChildren]
