import { Router } from 'express'

import { AuthMiddleware } from '../middlewares/auth.middleware'
import { UploadFileController } from './controller'
import { UploadFileService } from '../services'
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware'
import { FileTypeMiddleware } from '../middlewares/file-type.middleware'

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router()
    const uploadFileService = new UploadFileService()
    const uploadFileController = new UploadFileController(uploadFileService)
    router.use(FileUploadMiddleware.containFiles)

    // Definir las rutas
    router.post(
      '/single/:type',
      [FileTypeMiddleware.validFileType],
      uploadFileController.uploadFile
    )
    router.post(
      '/multiple/:type',
      [FileTypeMiddleware.validFileType],
      uploadFileController.uploadMultipleFile
    )

    return router
  }
}
