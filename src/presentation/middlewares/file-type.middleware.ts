import { NextFunction, Request, Response } from 'express'

export class FileTypeMiddleware {
  static validFileType(req: Request, resp: Response, next: NextFunction) {
    const type = req.params.type
    const validType = ['users', 'products', 'categories']
    if (!validType.includes(type)) {
      resp.status(400).json({ error: `Invalid type: ${type}` })
      return
    }

    next()
  }
}
