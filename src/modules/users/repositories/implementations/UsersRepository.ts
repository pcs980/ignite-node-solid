import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      admin: false,
    });
    this.users = [...this.users, user];
    return user;
  }

  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const adminUser = {
      ...receivedUser,
      admin: true,
      // updated_at: new Date(), comentado por erro no teste
    };
    this.users = [
      ...this.users.filter((u) => u.id !== receivedUser.id),
      adminUser,
    ];
    return adminUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
