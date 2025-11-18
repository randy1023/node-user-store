import { Request, Response } from 'express'
import { CreateCategoryDto, CustomError } from '../../domain'

export class CategoryController {
  //* DI
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }

  public getCategory = (req: Request, res: Response) => {
    res.json({ message: 'Get category endpoint' })
  }

  public createCategories = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
    if (error) {
      res.status(400).json({ error })
      return
    }

    res.json({ category: createCategoryDto })
  }
}
