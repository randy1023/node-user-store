import { Request, Response } from 'express'
import { CustomError } from '../../domain'
import { ImagesService } from '../services'

export class ImagesController {
  //* DI
  constructor(private readonly imagesService: ImagesService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }

  public getImage = (req: Request, res: Response) => {
    const { type = '', img = '' } = req.params
    this.imagesService
      .getImage(type, img)
      .then((images) => res.sendFile(images))
      .catch((error) => this.handleError(error, res))
  }
  public getMultipleImages = (req: Request, res: Response) => {
    // this.uploadFileService
    //   .uploadMultiple(files, `uploads/${type}`)
    //   .then((fileNames) => res.json(fileNames))
    //   .catch((error) => this.handleError(error, res))
  }
}
