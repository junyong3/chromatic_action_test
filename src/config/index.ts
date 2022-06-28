const HOSTNAME_LOCAL = 'localhost'
const HOSTNAME_DEV = 'jyg-village-hall.dev.yookgak.com'
const HOSTNAME_PROD = 'jyg-village-hall.yookgak.com'
export const IS_LOCAL = window.location.hostname === HOSTNAME_LOCAL
export const IS_DEVLOPMENT = window.location.hostname === HOSTNAME_DEV
export const IS_PRODUCTION = window.location.hostname === HOSTNAME_PROD

export const LEGACY_API_ENDPOINT = IS_PRODUCTION
  ? 'https://iam.yookgak.com'
  : 'https://dev-iam.yookgak.com'

export const CORE_API_ENDPOINT = IS_PRODUCTION
  ? 'https://hall-api.dev.yookgak.com'
  : 'https://hall-api.dev.yookgak.com'

export const SLACK_계정관리_정보보안_CAHNNEL_URL =
  'https://jeongyookgak.slack.com/archives/C03C6SN5YUU'
export const SLACK_마을회관_PROJ_CHANNEL_URL =
  'https://jeongyookgak.slack.com/archives/C03B1FZJBTK'

export const DRAWER_WIDTH = 224
