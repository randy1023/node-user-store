import { Router } from 'express'
import { CategoryController } from './controller'
import { AuthMiddleware } from '../middlewares/auth.middleware'

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router()

    const categoryController = new CategoryController()
    // Definir las rutas
    router.get('/', categoryController.getCategory)
    router.post(
      '/',
      [AuthMiddleware.validateJWT],
      categoryController.createCategories
    )

    return router
  }
}
