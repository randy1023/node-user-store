export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number
  ) {}

  static create(
    page: number = 1,
    limit: number = 10
  ): [string?, PaginationDto?] {
    if (page <= 0) return ['page must be greater than 0', undefined]
    if (limit <= 0) return ['limit must be grater than 0', undefined]
    if (isNaN(page)) return ['page must be a number', undefined]
    if (isNaN(limit)) return ['limit must be a number', undefined]

    return [undefined, new PaginationDto(page, limit)]
  }
}
