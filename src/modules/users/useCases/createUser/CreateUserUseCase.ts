import { SolidError } from "../../../../errors/SolidError";
import { STATUS_CODES } from "../../../../utils/constants";
import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {
    const alreadyExists = this.usersRepository.findByEmail(email);
    if (alreadyExists) {
      throw new SolidError(STATUS_CODES.BAD_REQUEST, "User already exists");
    }

    const user = this.usersRepository.create({
      name,
      email,
    });
    return user;
  }
}

export { CreateUserUseCase };
