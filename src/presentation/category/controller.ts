import { Request, Response } from 'express'
import { CreateCategoryDto, CustomError, PaginationDto } from '../../domain'
import { CategoryService } from '../services/category.service'

export class CategoryController {
  //* DI
  constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }

  public getCategory = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const userId = req.body.user.id
    const [error, paginationDto] = PaginationDto.create(+page, +limit)

    if (error) {
      res.status(400).json({ error })
      return
    }
    this.categoryService
      .getCategoryById(userId, paginationDto!)
      .then((categories) => res.status(200).json(categories))
      .catch((error) => this.handleError(error, res))
  }

  public createCategories = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
    if (error) {
      res.status(400).json({ error })
      return
    }
    this.categoryService
      .createCategory(createCategoryDto!, req.body.user)
      .then((newCategory) => res.status(200).json(newCategory))
      .catch((error) => this.handleError(error, res))
  }
}
