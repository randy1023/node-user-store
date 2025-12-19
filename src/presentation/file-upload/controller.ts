import { Request, Response } from 'express'
import { CustomError } from '../../domain'

export class UploadFileController {
  //* DI
  //   constructor(private readonly categoryService: CategoryService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }

  public uploadFile = (req: Request, res: Response) => {
    res.json({ message: 'Archivo enviado a upload-file' })
    // this.categoryService
    //   .getCategoryById(userId, paginationDto!)
    //   .then((categories) => res.status(200).json(categories))
    //   .catch((error) => this.handleError(error, res))
  }
  public uploadMultipleFile = (req: Request, res: Response) => {
    res.json({ message: 'Archivo enviado upload-multiple-file' })
    // this.categoryService
    //   .getCategoryById(userId, paginationDto!)
    //   .then((categories) => res.status(200).json(categories))
    //   .catch((error) => this.handleError(error, res))
  }
}
