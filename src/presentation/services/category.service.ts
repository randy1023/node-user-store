import { CategoryModel } from '../../data'
import { CreateCategoryDto, CustomError, UserEntity } from '../../domain'

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

  async getCategoryById(userID: string) {
    try {
      const category = await CategoryModel.find({ user: userID })
      if (!category || category.length === 0) return []
      return category.map((cat) => {
        return { id: cat.id, name: cat.name, available: cat.available }
      })
    } catch (error) {
      throw CustomError.internalServerError(`Internal server error`)
    }
  }
}
