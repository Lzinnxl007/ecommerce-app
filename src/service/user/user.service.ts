import { UserRepository } from "@/repository/user.repository";
import { UserRegister } from "@/types/user/user.register";

const UserService = {
    async CreateUser(user: UserRegister) {
        const response = await UserRepository.CreateUser(user)
        return response
    }
}

export { UserService }