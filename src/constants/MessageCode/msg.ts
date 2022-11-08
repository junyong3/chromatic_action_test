export const MSG = {
  INFO: {
    CREATE_PERMISSION_CODE:
      '권한은 관련 코드가 생성되지 않은 경우 작동하지 않습니다. 관련 코드 생성은 백엔드 담당자에게 문의해주세요.',
    UPDATE_PERMISSION_CODE:
      '관련 코드 수정 없이 권한명이 수정되는 경우 오류가 발생할 수 있습니다. 관련 코드 수정은 백엔드 담당자에게 문의해주세요.',
    CREATE_NOTICE_CODE:
      '노출 상태는 저장 후, 수정 화면에서 변경할 수 있습니다.',
    BATCH_ROW_UPDATE_DELETE: '선택된 row만 수정/삭제 됩니다.',
    COMMERCE: {
      MEMBER: {
        ALREADY_IN_USE: '다른 회원이 사용하고 있어, 변경할 수 없습니다.',
      },
    },
  },
  ERROR: {
    NO_EMAIL: '이메일을 입력해 주세요',
    NO_PASSWORD: '비밀번호를 입력해 주세요',
    NO_OTP: 'OTP 인증번호를 입력해 주세요',
    INVALID_PASSWORD:
      '영소문자, 숫자, 특수문자를 포함한 8자리 이상의 문자를 입력해 주세요',
    NO_SAME_CONFIRM_PASSWORD: '위의 비밀번호와 동일하게 입력해 주세요.',
    NO_RECENTLY_USED_PASSWORD: '현재 비밀번호와 다른 비밀번호를 입력해 주세요.',
    NOT_EMAIL: '이메일과 다른 비밀번호를 입력해 주세요.',
    UNAUTHORIZED_SUBMIT: '입력한 정보가 일치하지 않습니다.',
    NOT_FOUND_CARD_NUMBER: '카드 번호를 다시 확인해 주세요',
    DUPLICATE_ROLE: '동일한 역할명이 존재합니다. 다른 역할명을 입력해 주세요.',
    DUPLICATE_PERMISSION:
      '동일한 권한명이 존재합니다. 다른 권한명을 입력해 주세요.',
    NOT_FOUND_NOTICE: '공지사항 정보를 찾을 수 없습니다.',
    DUPLICATE_EMAIL:
      '이미 해당 역할을 부여받은 사용자입니다. 다른 사용자를 선택해 주세요.',
    ALREADY_PERMISSION: '이미 추가된 권한입니다. 다른 권한을 선택해 주세요.',
  },
  SUCCESS: {
    IAM: {
      CHANGE_PASSWORD_GOTO_LOGIN:
        '비밀번호가 변경되었습니다. 변경된 비밀번호로 재로그인해 주세요.',
      CHANGE_PASSWORD: '비밀번호가 변경되었습니다.',
    },
    SAVE_ROLE: '역할 정보가 저장되었습니다.',
    SAVE_ORG: '조직 정보가 저장되었습니다.',
    SAVE_FACTORY: '공장/센터 정보가 저장되었습니다.',
    SAVE_WAREHOUSE: '창고 정보가 저장되었습니다.',
    SAVE_AREA: '구역 정보가 저장되었습니다.',
    SAVE_HEALTH_CRET: '보건증 정보가 저장되었습니다.',
    SAVE_LOCATION: '로케이션 정보가 저장되었습니다.',
    DELETE_LOCATION: '로케이션 정보가 삭제되었습니다.',
    DELETE_FACTORY: '공장/센터 정보가 삭제되었습니다.',
    DELETE_AREA: '구역 정보가 삭제되었습니다.',
    DELETE_HEALTH_CRET: '보건증 정보가 삭제되었습니다.',
    DELETE_ORG: '조직 정보가 삭제되었습니다.',
    DELETE_WAREHOUSE: '창고 정보가 삭제되었습니다.',
    DELETE_ROLE: '역할이 삭제되었습니다.',
    SAVE_PERMISSION: '권한 정보가 저장되었습니다.',
    SAVE_NOTICE: '공지 정보가 저장되었습니다.',
    DELETE_NOTICE: '공지가 삭제되었습니다.',
    DELETE_PERMISSION: '권한이 삭제되었습니다.',
    PAYMENT_CANCEL: '결제 취소가 완료되었습니다.',
    SAVE_MEMBER: '회원 정보가 저장되었습니다.',
    GIVE_MEMBER_COUPON: '쿠폰이 정상적으로 지급되었습니다.',
    GIVE_MEMBER_POINT: '적립금이 정상적으로 지급되었습니다.',
    MEMBER_COUPON: {
      EXPOSED: '쿠폰정보가 노출처리 되었습니다.',
      UNEXPOSED: '쿠폰정보가 숨김처리 되었습니다.',
    },
    MEMBER_POINT_HISTORY: {
      EXPOSED: '적립금 정보가 노출처리 되었습니다.',
      UNEXPOSED: '적립금 정보가 숨김처리 되었습니다.',
    },
    DELETE_CARD: '카드 삭제가 완료되었습니다.',
    SAVE_CARD: '카드 등록이 완료되었습니다.',
    SAVE_REFUNDS: '환급 계좌 정보가 저장되었습니다.',
    SAVE_CATEGORY: '카테고리 정보가 저장되었습니다.',
    DELETE_REFUNDS: '환급 계좌 정보가 삭제되었습니다.',
    COMMERCE: {
      MEMBER: {
        USE_POINT: '적립금이 사용되었습니다.',
      },
      COUPON: {
        CREATE_COUPON: '쿠폰이 생성되었습니다.',
        UPDATE_COUPON: '쿠폰이 저장되었습니다.',
      },
    },
    MDM: {
      GOODS: {
        CREATE_MATERIAL: '원부자재가 생성되었습니다.',
        DELETE_MATERIAL: '원부자재가 삭제되었습니다.',
        UPDATE_MATERIAL: '원부자재가 수정되었습니다.',
        CREATE_PRODUCT: '제상품이 생성되었습니다.',
        UPDATE_PRODUCT: '제상품이 수정되었습니다.',
        DELETE_PRODUCT: '제상품이 삭제되었습니다.',
        ADD_PURCHASE_PRICE: '구매 가격이 추가되었습니다.',
        DELETE_PURCHASE_PRICE: '구매 가격이 삭제되었습니다.',
        UPDATE_PURCHASE_PRICE: '구매 가격이 수정되었습니다.',
        ADD_SELLING_PRICE: '판매 가격이 추가되었습니다.',
        DELETE_SELLING_PRICE: '판매 가격이 삭제되었습니다.',
        UPDATE_SELLING_PRICE: '판매 가격이 수정되었습니다.',
      },
      PARTNERS: {
        ADD_VENDER: '매입처가 추가되었습니다.',
        DELETE_VENDER: '매입처가 삭제되었습니다.',
        UPDATE_VENDER: '매입처가 수정되었습니다.',
        ADD_CLIENT: '매출처가 추가되었습니다.',
        DELETE_CLIENT: '매출처가 삭제되었습니다.',
        UPDATE_CLIENT: '매출처가 수정되었습니다.',
      },
    },
  },
  WARNING: {
    SAMPLE: '다시 한번 체크 해주세요.',
  },
}

export const ALERT_SERVER_ERROR_TYPE = {
  NETWORK_ERROR: {
    title: '네트워크 오류가 발생했습니다.',
    content: '인터넷이 정상적으로 연결되어 있는지 확인 후 다시 시도해 주세요.',
    buttonName: '',
  },
  UNAUTHORIZED: {
    title: '접근 권한이 없습니다.',
    content:
      '해당 기능에 접근하기 위한 권한이 없습니다. 권한이 필요한 경우 <접근 권한 요청>을 통해 백오피스 관리자에게 문의해 주세요.',
    buttonName: '접근 권한 요청',
  },

  ERROR: {
    title: '오류가 발생했습니다.',
    content:
      '요청한 동작을 실행하는 중 오류가 발생했습니다. 새로고침 후에도 문제가 반복될 경우 <오류 발생 공유>를 통해 백오피스 관리자에게 문의해 주세요.',
    buttonName: '오류 발생 공유',
  },
  PAYMENT: {
    ERROR: {
      INVALID_EXPIRATION_YEAR: {
        title: '잘못된 유효기간',
        content: '유효기간을 다시 확인해 주세요.',
      },
      INVALID_CARD_EXPIRATION: {
        title: '잘못된 유효기간',
        content: '유효기간을 다시 확인해 주세요.',
      },
      INVALID_CARD_NUMBER: {
        title: '유효하지 않은 카드',
        content: '카드 번호를 다시 확인해 주세요.',
      },
      INVALID_ACCOUNT_NUMBER: {
        title: '유효하지 않은 계좌',
        content: '은행사 및 계좌 번호를 다시 확인해 주세요.',
      },
      INVALID_CUSTOMER_NAME: {
        title: '예금주 불일치',
        content: '예금주 정보를 다시 확인해 주세요.',
      },
      INVALID_PROPERTY_ACCOUNT_NUMBER: {
        title: '예금주 불일치',
        content: '은행사 및 계좌 번호를 다시 확인해 주세요.',
      },
      CANCEL_COMPLETE_DONE: {
        title: '결제 취소 불가',
        content: '이미 취소가 완료된 결제 건입니다.',
      },
      NOT_VALID_CANCEL: {
        title: '결제 취소 불가',
        content: '유효하지 않은 결제 건입니다.',
      },
      ACCOUNT_CANCEL: {
        title: '취소 금액 오류',
        content:
          '결제 취소할 수 있는 금액이 아닙니다.\n' +
          '취소 금액을 다시 한 번 확인해 주세요.',
      },
      ACCOUNT_NUMBER: {
        title: '계좌 정보 확인',
        content:
          '유효하지 않은 계좌 정보입니다. \n' +
          '은행사 및 계좌 번호를 다시 한 번 확인해 주세요.',
      },
      ACCOUNT_HOLDER_INFO: {
        title: '예금주 정보 불일치',
        content:
          '유효하지 않은 계좌 정보입니다. \n' +
          '은행사 및 계좌 번호를 다시 한 번 확인해 주세요.',
      },
    },
  },
}

export const ALERT_CLIENT_ERROR_TYPE: any = {
  BASE: {
    title: '',
    content: '',
  },
  CHECK: {
    title: '체크',
    content: '확인해주세요.',
  },
}
export const CONFIRM_DIALOG_MSG: any = {
  TEMP: {
    BASE: {
      title: '',
      content: '',
    },
  },
  DELETE: {
    BASE: {
      title: '삭제',
      content: '삭제하시겠습니까?',
    },
  },
  SAVE: {
    BASE: {
      title: '저장',
      content: '저장하시겠습니까?',
    },
  },
  UPDATE: {
    BASE: {
      title: '수정',
      content: '수정하시겠습니까?',
    },
  },
  CREATE: {
    BASE: {
      title: '추가',
      content: '추가하시겠습니까?',
    },
  },
}
