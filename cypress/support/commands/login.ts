export {}

Cypress.Commands.add('login', ({ email, pwd, secret, fakeOtp }) => {
  cy.visit('/login')

  cy.dataCy('email').type(email)
  cy.dataCy('password').type(pwd)

  if (fakeOtp) {
    cy.dataCy('otp').type(fakeOtp)
  } else {
    cy.task<string>('generateOTP', secret).then((otp) => {
      cy.dataCy('otp').clear().type(otp)
    })
  }

  cy.dataCy('submit').click()
})
