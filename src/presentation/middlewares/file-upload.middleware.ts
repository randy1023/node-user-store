import { NextFunction, Request, Response } from 'express'

export class FileUploadMiddleware {
  static containFiles(req: Request, resp: Response, next: NextFunction) {
    const files = req.files
    if (!files) {
      resp.status(400).json({ error: 'Missing file' })
      return
    }
    //INICIALIZAR req.body SI ES UNDEFINED porque al usar el formato form-data puede venir undefined y da un error al asignar user
    if (!req.body) {
      req.body = {}
    }
    if (!Array.isArray(files.file)) {
      req.body.files = [files.file]
    } else {
      req.body.files = files.file
    }
    next()
  }
}
