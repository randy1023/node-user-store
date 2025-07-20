import { Request, Response } from "express";

export class AuthController {
  //* DI
  constructor() {}

  public async loginUser(req: Request, res: Response) {
    // Implement login logic here
    res.json("Login endpoint");
  }
  public async registerUser(req: Request, res: Response) {
    // Implement registration logic here
    res.json("Registration endpoint");
  }

  public async validateEmail(req: Request, res: Response) {
    // Implement email validation logic here

    res.json(`Email validation endpoint with token:`);
  }
}
