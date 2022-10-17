import { faker } from '@faker-js/faker'
import { MSG } from '@constants/MessageCode/msg'

const email = Cypress.env('CY_TEST_ID')
const pwd = Cypress.env('CY_TEST_PWD')
const newPwd = Cypress.env('CY_TEST_NEW_PWD')
const secret = Cypress.env('CY_OTP_SECRET')

const fakePwd = faker.internet.password(
  20,
  true,
  /^(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*\d)/
)
const fakeOtp = faker.random.numeric(6)

beforeEach(() => {
  cy.restoreLocalStorage()

  cy.getLocalStorage('REFRESH_TOKEN').then((token) => {
    if (!token) {
      cy.login({ email, pwd, secret })
      cy.get('h1').should('have.text', 'HomePage')
    }
  })
})

afterEach(() => {
  cy.saveLocalStorage()
})

describe('Testing the Change Password', () => {
  it('각 필드를 잘못 입력해본 뒤 비밀번호 변경 테스트를 진행하고 원상복구한다.', () => {
    // 1. 잘못된 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인, OTP 인증번호를 입력하고 비밀번호 변경 시도를 한다
    cy.changePassword({ pwd: fakePwd, newPwd, secret })
    cy.dataCy('alert').should('have.text', MSG.ERROR.UNAUTHORIZED_SUBMIT)

    // 2. 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인, 잘못된 OTP 인증번호를 입력하고 비밀번호 변경 시도를 한다
    cy.changePassword({ pwd: fakePwd, newPwd, secret, fakeOtp })
    cy.dataCy('alert').should('have.text', MSG.ERROR.UNAUTHORIZED_SUBMIT)
  })
})
