import { UserRepository } from "../interfaces/User";
import { User } from "../types/User";

export class UserService {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(user: User): Promise<User> {
        console.log(user);
        const newUser = await this.userRepository.createUser(user);
        return newUser;
    }

    async getUserById(id: string): Promise<User> {
        const user = await this.userRepository.getUserById(id);
        console.log('serv', user);
        return user;
    }
}