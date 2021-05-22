import { Request, Response } from "express";

import { STATUS_CODES } from "../../../../utils/constants";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  handle(request: Request, response: Response): Response {
    try {
      const { user_id } = request.params;
      const user = this.showUserProfileUseCase.execute({ user_id });
      return response.status(STATUS_CODES.DONE).json(user);
    } catch (error) {
      return response.status(error.status).json({ error: error.message });
    }
  }
}

export { ShowUserProfileController };
