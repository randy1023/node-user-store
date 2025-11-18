import { Router } from 'express'
import { CategoryController } from './controller'

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router()

    const categoryController = new CategoryController()
    // Definir las rutas
    router.get('/', categoryController.getCategory)
    router.post('/', categoryController.createCategories)

    return router
  }
}
