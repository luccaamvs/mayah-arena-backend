import { SignupController } from './signup-controller'

const makeSut = (): SignupController => {
  return new SignupController()
}

describe('Signup Controller', () => {
  test('should return 201 if valid data is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        username: 'valid_name',
        password: 'valid_password',
        passwordConfirm: 'valid_password',
        email: 'valid_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 201,
      body: {
        id: 'valid_id',
        username: 'valid_name',
        password: 'valid_password',
        email: 'valid_email@mail.com'
      }
    })
  })

  test('should return 400 if invalid email is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        username: 'any_name',
        password: 'any_password',
        passwordConfirm: 'any_password',
        email: 'any_email@mail'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error('Email ou senha invalidos')
    })
  })

  test('should return 400 if invalid password or password confirm is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        username: 'any_name',
        password: 'any_password',
        passwordConfirm: 'invalid_password',
        email: 'any_email@mail.com'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 400,
      body: new Error('Email ou senha invalidos')
    })
  })
})
