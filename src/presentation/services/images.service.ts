import path from 'path'
import fs from 'fs'
import { CustomError } from '../../domain'

export class ImagesService {
  constructor() {}

  async getImage(type: string, img: string) {
    const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${img}`)

    try {
      if (!fs.existsSync(imagePath))
        throw CustomError.badRequest('Image not found')
      return imagePath
    } catch (error) {
      throw error
    }
  }
}
