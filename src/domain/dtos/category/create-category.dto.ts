import { UserModel } from '../../../data/'

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = object
    let availableBool: boolean = available
    if (!name) return ['Missing Name', undefined]
    if (typeof available !== 'boolean') {
      availableBool = available === 'true'
    }
    return [undefined, new CreateCategoryDto(name, availableBool)]
  }
}
