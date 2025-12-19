import { randomUUID } from 'crypto'

export class Uuidadapter {
  static v4 = () => randomUUID()
}
