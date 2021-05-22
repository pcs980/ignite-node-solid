import { Response, Request } from "express";

import { STATUS_CODES } from "../../../../utils/constants";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const { name, email } = request.body;
    try {
      const result = this.createUserUseCase.execute({ name, email });
      return response.status(STATUS_CODES.CREATED).json(result);
    } catch (error) {
      return response.status(error.status).json({ error: error.message });
    }
  }
}

export { CreateUserController };
