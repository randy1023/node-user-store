import { Request, Response } from 'express'
import { CustomError } from '../../domain'

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
    res.json({ message: 'Create category endpoint' })
  }
}
