import { Request, Response } from 'express'
import { CustomError } from '../../domain'
import { UploadFileService } from '../services'
import { UploadedFile } from 'express-fileupload'

export class UploadFileController {
  //* DI
  constructor(private readonly uploadFileService: UploadFileService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }

  public uploadFile = (req: Request, res: Response) => {
    const type = req.params.type
    const file = req.body.files[0] as UploadedFile

    this.uploadFileService
      .uploadSingle(file, `uploads/${type}`)
      .then((fileName) => res.json({ fileName }))
      .catch((error) => this.handleError(error, res))
  }
  public uploadMultipleFile = (req: Request, res: Response) => {
    const files = req.body.files as UploadedFile[]
    const type = req.params.type

    this.uploadFileService
      .uploadMultiple(files, `uploads/${type}`)
      .then((fileNames) => res.json(fileNames))
      .catch((error) => this.handleError(error, res))
  }
}
