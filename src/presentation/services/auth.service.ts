import { bcryptAdapter, envs, JwtAdapter } from '../../config'
import { UserModel } from '../../data'
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain'
import { EmailService } from '../services'

export class AuthService {
  constructor(
    // DI - Email Service
    private readonly emailService: EmailService
  ) {} // Replace 'any' with the actual type of your UserRepository

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({
      email: registerUserDto.email,
    })
    if (existUser) throw CustomError.badRequest('Email already exists')
    try {
      const user = new UserModel(registerUserDto)

      // Encriptar la contraseña
      user.password = await bcryptAdapter.hash(registerUserDto.password)
      await user.save()
      // Email de confirmacion
      //??? Como usar el servicio de enviar correo de confirmacion
      await this.sendEmailValidationLink(user.email)
      //JWT <---- para mantener la autenticación del usuario
      const payload = {
        id: user.id,
      }
      const token = await JwtAdapter.generateToken(payload)

      if (!token)
        throw CustomError.internalServerError('Error while creating JWT')

      // No devolver la contraseña
      const userEntity = UserEntity.fromObject(user)
      return {
        user: userEntity.values,
        token,
      }
    } catch (error) {
      throw CustomError.internalServerError(`${error}`)
    }
  }
  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({
      email: loginUserDto.email,
    })
    if (!existUser) throw CustomError.badRequest('User not found')
    try {
      // Verificar la contraseña
      const isPasswordValid = await bcryptAdapter.compare(
        loginUserDto.password,
        existUser.password
      )
      if (!isPasswordValid) throw CustomError.badRequest('Invalid password')
      const userEntity = UserEntity.fromObject(existUser)
      const payload = {
        id: existUser.id,
      }
      const token = await JwtAdapter.generateToken(payload)

      if (!token)
        throw CustomError.internalServerError('Error while creating JWT')

      return {
        user: userEntity.values,
        token, // Aquí deberías generar un token JWT real
      }
    } catch (error) {
      throw CustomError.internalServerError(`${error}`)
    }
  }

  public async validateEmailToken(token: string) {
    const payload = await JwtAdapter.validateToken(token)
    if (!payload) throw CustomError.unauthorized('Invalid or expired token')

    const { email } = payload as { email: string }
    if (!email)
      throw CustomError.internalServerError('Email not found in token')

    const user = await UserModel.findOne({ email })

    if (!user) throw CustomError.internalServerError('Email user not found')

    user.emailValidated = true
    await user.save()

    return true
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({ email })
    if (!token)
      throw CustomError.internalServerError('Error while creating JWT')

    const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`

    const html = `
    <h1> Validate your email</h1>
    <p>Click on the following link to validate your email</p>
    <a href="${link}">Press to Validate your email</a>
    `

    const options = {
      to: email,
      subject: 'Validate to email',
      htmlBody: html,
    }

    const isSent = await this.emailService.sendEmail(options)

    if (!isSent) throw CustomError.internalServerError('Error sending email')

    return true
  }
}
