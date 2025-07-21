import { CustomError } from "../errors/custom.error";

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly emailValidated: boolean,
    public readonly password: string,
    public readonly role: string[],
    public readonly img?: string
  ) {}

  static fromObject(object: { [key: string]: any }): UserEntity {
    const { id, _id, name, email, emailValidated, password, role, img } =
      object;

    if (!id && !_id) throw CustomError.badRequest("Missing Id");
    if (!name) throw CustomError.badRequest("Missing Name");
    if (!email) throw CustomError.badRequest("Missing Email");
    if (!password) throw CustomError.badRequest("Missing Password");
    if (emailValidated === undefined)
      throw CustomError.badRequest("Missing Email Validation Status");
    if (!role) throw CustomError.badRequest("Missing Role");

    return new UserEntity(
      id || _id,
      name,
      email,
      emailValidated ?? false,
      password,
      Array.isArray(role) ? role : [role],
      img
    );
  }
}
