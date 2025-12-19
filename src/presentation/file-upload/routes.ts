import { Router } from 'express'

import { AuthMiddleware } from '../middlewares/auth.middleware'
import { UploadFileController } from './controller'

export class FileUploadRoutes {
  static get routes(): Router {
    const router = Router()
    const uploadFileController = new UploadFileController()
    // Definir las rutas
    router.post('/single/:type', uploadFileController.uploadFile)
    router.post('/multiple/:type', uploadFileController.uploadMultipleFile)

    return router
  }
}
