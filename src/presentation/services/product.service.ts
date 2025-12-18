import { ProductModel } from '../../data'
import { CreateProductDto, CustomError, PaginationDto } from '../../domain'

export class ProductService {
  // DI
  constructor() {}
  async createProduct(createProductDto: CreateProductDto) {
    const productExists = await ProductModel.findOne({
      name: createProductDto.name,
    })
    if (productExists) throw CustomError.badRequest('Product already exists')

    try {
      const product = new ProductModel(createProductDto)
      await product.save()
      return product
    } catch (error) {
      throw CustomError.internalServerError(`${error}`)
    }
  }

  async getProducts(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto
    try {
      const [totalProducts, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category'),
      ])

      const totalPages = Math.ceil(totalProducts / limit)

      return {
        page,
        limit,
        totalProducts,
        totalPages,
        next:
          page >= totalPages
            ? null
            : `/api/products?page=${page + 1}&limit=${limit}`,
        previous:
          page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products,
      }
    } catch (error) {}
  }
}
