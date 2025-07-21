import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthService {
  constructor() {} // Replace 'any' with the actual type of your UserRepository

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({
      email: registerUserDto.email,
    });
    if (existUser) throw CustomError.badRequest("Email already exists");
    try {
      const user = new UserModel(registerUserDto);

      // Encriptar la contraseña
      user.password = await bcryptAdapter.hash(registerUserDto.password);
      await user.save();
      //JWT <---- para mantener la autenticación del usuario

      // Email de confirmacion

      // de esta manera se evita devolver el password es una de tantas maneras
      const { password, ...restData } = UserEntity.fromObject(user);
      return {
        user: restData,
        token: "ABC",
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({
      email: loginUserDto.email,
    });
    if (!existUser) throw CustomError.badRequest("User not found");
    try {
      // Verificar la contraseña
      const isPasswordValid = await bcryptAdapter.compare(
        loginUserDto.password,
        existUser.password
      );
      if (!isPasswordValid) throw CustomError.badRequest("Invalid password");
      const { password, ...restData } = UserEntity.fromObject(existUser);
      return {
        user: restData,
        token: "ABC", // Aquí deberías generar un token JWT real
      };
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }
}
