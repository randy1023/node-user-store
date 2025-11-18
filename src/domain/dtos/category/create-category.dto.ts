import { UserModel } from '../../../data/'

export class CreateCategoryDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateCategoryDto?] {
    const { name, available = false } = object
    let availableBool: boolean = available
    console.log(typeof available, available)
    if (!name) return ['Missing Name', undefined]
    if (typeof available === 'string') {
      if (available.toLowerCase() === 'true') {
        availableBool = true
      } else if (available.toLowerCase() === 'false') {
        availableBool = false
      } else {
        return ['Available must be a boolean', undefined]
      }
    }

    return [undefined, new CreateCategoryDto(name, availableBool)]
  }
}
