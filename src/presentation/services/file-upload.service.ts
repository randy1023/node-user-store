import type { UploadedFile } from 'express-fileupload'
import path from 'path'
import fs from 'fs'
import { Uuidadapter } from '../../config/uuid.adapter'
import { CustomError } from '../../domain'

export class UploadFileService {
  constructor(private readonly uuid = Uuidadapter.v4) {}

  async uploadMultiple(
    files: UploadedFile[],
    folder: string = 'upload',
    validExt: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    const fileNames = await Promise.all(
      files.map((file) => this.uploadSingle(file, folder, validExt))
    )

    return fileNames
  }

  async uploadSingle(
    file: UploadedFile,
    folder: string = 'uploads',
    validExt: string[] = ['png', 'jpg', 'jpeg', 'gif']
  ) {
    try {
      const { mimetype } = file
      const fileExt = mimetype.split('/')[1]
      if (!validExt.includes(fileExt))
        throw CustomError.badRequest(`Invalid extension: ${fileExt}`)

      const destination = path.resolve(__dirname, '../../../', folder)
      this.checkFolder(destination)
      const fileName = `${this.uuid()}.${fileExt}`

      file.mv(`${destination}/${fileName}`)
      return { fileName }
    } catch (error) {
      throw error
    }
  }

  private checkFolder(folderPath: string) {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath)
    }
  }
}
