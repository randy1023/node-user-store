import { Validators } from '../../../config'

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly user: string,
    public readonly category: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, user, category } = object

    if (!name) return ['Name is requiered', undefined]
    if (price) {
      if (!isNaN(price)) return ['Price must be a valid number', undefined]
    }

    if (!user) return ['UserId is required', undefined]
    if (!category) return ['CategoryId is required', undefined]
    if (!Validators.isMongoID(category)) return ['Invalid categoryId']
    if (!Validators.isMongoID(user)) return ['Invalid userID']

    return [
      undefined,
      new CreateProductDto(
        name,
        !!available,
        price,
        description,
        user,
        category
      ),
    ]
  }
}
