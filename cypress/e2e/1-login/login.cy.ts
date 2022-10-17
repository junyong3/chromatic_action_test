import { faker } from '@faker-js/faker'
import { MSG } from '@constants/MessageCode/msg'

const fakeEmail = faker.internet.email()
const fakePwd = faker.internet.password()
const fakeOtp = faker.random.numeric(6)

const email = Cypress.env('CY_TEST_ID')
const pwd = Cypress.env('CY_TEST_PWD')
const secret = Cypress.env('CY_OTP_SECRET')

describe('Testing the Login Page', () => {
  it('각 필드를 잘못 입력 해본 뒤 로그인 성공 테스트', () => {
    // 1. 잘못된 아이디, 비밀번호, OTP 인증값을 입력하고 로그인 시도를 한다
    cy.login({ email: fakeEmail, pwd, secret })
    cy.dataCy('alert').should('have.text', MSG.ERROR.UNAUTHORIZED_SUBMIT)

    // 2. 올바른 아이디, 잘못된 비밀번호, 올바른 OTP 인증값을 입력하고 로그인 시도를 한다
    cy.login({ email, pwd: fakePwd, secret })
    cy.dataCy('alert').should('have.text', MSG.ERROR.UNAUTHORIZED_SUBMIT)

    // 3. 올바른 아이디, 올바른 비밀번호, 잘못된 OTP 인증값을 입력하고 로그인 시도를 한다
    cy.login({ email, pwd: fakePwd, secret, fakeOtp })
    cy.dataCy('alert').should('have.text', MSG.ERROR.UNAUTHORIZED_SUBMIT)

    // 4. 올바른 아이디, 비밀번호, OTP 인증값을 입력하고 로그인 시도를 한다
    cy.login({ email, pwd, secret })
    cy.get('h1').should('have.text', 'HomePage')
  })
})
