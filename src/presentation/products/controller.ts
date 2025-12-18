import { Request, Response } from 'express'
import { CreateProductDto, CustomError, PaginationDto } from '../../domain'
import { ProductService } from '../services/product.service'

export class ProductController {
  //* DI
  constructor(private readonly productService: ProductService) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      res.status(error.statusCode).json({ error: error.message })
      return
    }
    res.status(500).json({ error: 'Internal server error' })
  }

  public getProducts = (req: Request, res: Response) => {
    const { page = 1, limit = 10 } = req.query
    const [error, paginationDto] = PaginationDto.create(+page, +limit)

    if (error) {
      res.status(400).json({ error })
      return
    }
    this.productService
      .getProducts(paginationDto!)
      .then((products) => res.json(products))
      .catch((err) => this.handleError(err, res))
  }

  public createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id,
    })
    if (error) {
      res.status(400).json({ error })
      return
    }
    this.productService
      .createProduct(createProductDto!)
      .then((product) => res.json({ product }))
      .catch((err) => this.handleError(err, res))
  }
}
