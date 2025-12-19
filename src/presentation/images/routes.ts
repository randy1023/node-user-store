import { Router } from 'express'
import { ImagesController } from './controller'
import { ImagesService } from '../services'

export class ImagesRoutes {
  static get routes(): Router {
    const router = Router()
    const imagesService = new ImagesService()
    const imagesController = new ImagesController(imagesService)

    router.get('/:type/:img', imagesController.getImage)

    return router
  }
}
