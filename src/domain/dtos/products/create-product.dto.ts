export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: string,
    public readonly price: number,
    public readonly description: string,
    public readonly userId: string,
    public readonly categoryId: string
  ) {}

  static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, available, price, description, userId, categoryId } = object

    if (!name) return ['Name is requiered', undefined]
    if (!available) return ['Available is required', undefined]
    if (!isNaN(price)) return ['Price must be a valid number', undefined]
    if (!price) return ['Price is required', undefined]
    if (!description) return ['Description is required', undefined]
    if (!userId) return ['UserId is required', undefined]
    if (!categoryId) return ['CategoryId is required', undefined]

    return [
      undefined,
      new CreateProductDto(
        name,
        available,
        price,
        description,
        userId,
        categoryId
      ),
    ]
  }
}
