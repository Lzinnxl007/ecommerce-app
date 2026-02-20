import { UserRepository } from "@/repository/user.repository";
import { UserRegister } from "@/types/user/user.register";

const UserService = {
    async CreateUser(user: UserRegister) {
        const response = await UserRepository.CreateUser(user)
        return response
    },
    async GetUser(email: UserRegister["email"]) {
        return await UserRepository.GetUser(email)
    },
    async UpdateUserStatus(email: UserRegister["email"], data: Record<string, any>) {
        return await UserRepository.UpdateUserStatus(email, data)
    }
}

export { UserService }