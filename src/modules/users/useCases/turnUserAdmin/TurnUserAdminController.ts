import { Request, Response } from "express";

import { STATUS_CODES } from "../../../../utils/constants";
import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;
      const user = this.turnUserAdminUseCase.execute({ user_id });
      return response.status(STATUS_CODES.DONE).json(user);
    } catch (error) {
      return response.status(error.status).json({ error: error.message });
    }
  }
}

export { TurnUserAdminController };
