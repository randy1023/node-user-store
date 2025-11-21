import { CategoryModel } from '../../data'
import {
  CreateCategoryDto,
  CustomError,
  PaginationDto,
  UserEntity,
} from '../../domain'

export class CategoryService {
  // DI
  constructor() {}

  async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({
      name: createCategoryDto.name,
    })
    if (categoryExists) throw CustomError.badRequest('Category already exists')

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      })
      await category.save()
      return {
        message: 'Category created successfully',
        id: category.id,
        name: category.name,
        available: category.available,
      }
    } catch (error) {
      throw CustomError.internalServerError(`${error}`)
    }
  }

  async getCategoryById(userID: string, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto
    try {
      const [totalCategories, category] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find({ user: userID })
          .skip((page - 1) * limit)
          .limit(limit),
      ])

      const totalPages = Math.ceil(totalCategories / limit)
      return {
        page,
        limit,
        totalCategories,
        totalPages,
        next:
          page >= totalPages
            ? null
            : `/api/categories?page=${page + 1}&limit=${limit}`,
        previous:
          page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        categories: category.map((cat) => ({
          id: cat.id,
          name: cat.name,
          available: cat.available,
        })),
      }
    } catch (error) {
      throw CustomError.internalServerError(`Internal server error`)
    }
  }
}
