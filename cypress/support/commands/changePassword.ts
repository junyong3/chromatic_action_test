export {}

Cypress.Commands.add(
  'changePassword',
  ({ pwd, newPwd, secret, fakeOtp = null }) => {
    cy.visit('/change-password')

    cy.dataCy('password').type(pwd)
    cy.dataCy('newPassword').type(newPwd)
    cy.dataCy('newPasswordConfirm').type(newPwd)

    if (fakeOtp) {
      cy.dataCy('otp').type(fakeOtp)
    } else {
      cy.task<string>('generateOTP', secret).then((otp) => {
        cy.dataCy('otp').type(otp)
      })
    }

    cy.dataCy('submit').click()
  }
)
