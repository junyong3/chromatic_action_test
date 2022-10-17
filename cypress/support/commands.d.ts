declare namespace Cypress {
  interface ChangePassword {
    pwd: string
    newPwd: string
    secret: string
    fakeOtp?: string
  }
  interface Login {
    email: string
    pwd: string
    secret: string
    fakeOtp?: string
  }
  interface SampleCommand1 {
    arg1: string
    arg2: string
    arg3: string
  }
  interface SampleCommand2 {
    arg1: string
    arg2: string
    arg3: string
  }
  interface Chainable {
    changePassword({ pwd, newPwd, secret, fakeOtp }: ChangePassword): Chainable
    login({ email, pwd, secret, fakeOtp }: Login): Chainable
    dataCy(selector: string): Chainable
    sampleCommand1({ arg1, arg2, arg3 }: SampleCommand1): Chainable
    sampleCommand2({ arg1, arg2, arg3 }: SampleCommand2): Chainable
  }
}
