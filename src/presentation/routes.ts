import { Router } from 'express'
import { AuthRoutes } from './auth'
import { CategoryRoutes } from './category'
import { ProductRoutes } from './products'
import { FileUploadRoutes } from './file-upload'
import { ImagesRoutes } from './images'

export class AppRoutes {
  static get routes(): Router {
    const router = Router()

    // Definir las rutas
    router.use('/api/auth', AuthRoutes.routes)
    router.use('/api/categories', CategoryRoutes.routes)
    router.use('/api/products', ProductRoutes.routes)
    router.use('/api/upload', FileUploadRoutes.routes)
    router.use('/api/images', ImagesRoutes.routes)

    return router
  }
}
