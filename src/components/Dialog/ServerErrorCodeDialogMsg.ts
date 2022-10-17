import { ERROR_TYPE_CONTENT_VIEW } from '@constants/MessageCode/msg'
import ErrorCode from '@src/api/NetworkService/errorCode'

export function serverErrorCodeDialogMsg(code: string | null) {
  const dialogMsg: {
    title: string
    content: string
    code: string | null
  } = {
    title: '',
    content: '',
    code: null,
  }
  switch (code) {
    // oderDetail dialog msg code start
    case ErrorCode.CANCEL_COMPLETE_DONE:
    case ErrorCode.NOT_VALID_CANCEL:
    case ErrorCode.ACCOUNT_HOLDER_INFO:
    case ErrorCode.ACCOUNT_NUMBER:
    case ErrorCode.ACCOUNT_CANCEL:
      dialogMsg.title = ERROR_TYPE_CONTENT_VIEW.PAYMENT.ERROR[code].title
      dialogMsg.content = ERROR_TYPE_CONTENT_VIEW.PAYMENT.ERROR[code].content
      dialogMsg.code = code
      break
    // end
    //refundAccount Member Tab
    case ErrorCode.INVALID_CUSTOMER_NAME:
    case ErrorCode.INVALID_ACCOUNT_NUMBER:
    case ErrorCode.INVALID_PROPERTY_ACCOUNT_NUMBER:
      dialogMsg.title = ERROR_TYPE_CONTENT_VIEW.PAYMENT.ERROR[code].title
      dialogMsg.content = ERROR_TYPE_CONTENT_VIEW.PAYMENT.ERROR[code].content
      dialogMsg.code = code
      break
    // card user tab
    case ErrorCode.INVALID_EXPIRATION_YEAR:
    case ErrorCode.INVALID_CARD_EXPIRATION:
    case ErrorCode.INVALID_CARD_NUMBER:
      dialogMsg.title = ERROR_TYPE_CONTENT_VIEW.PAYMENT.ERROR[code].title
      dialogMsg.content = ERROR_TYPE_CONTENT_VIEW.PAYMENT.ERROR[code].content
      dialogMsg.code = code
      break
    default:
      dialogMsg.code = null
      console.error('Not Error code', code)
  }

  return dialogMsg
}
