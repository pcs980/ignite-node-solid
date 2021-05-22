import { SolidError } from "../../../../errors/SolidError";
import { STATUS_CODES } from "../../../../utils/constants";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ShowUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);
    if (!user) {
      throw new SolidError(STATUS_CODES.NOT_FOUND, "User not found");
    }

    return user;
  }
}

export { ShowUserProfileUseCase };
