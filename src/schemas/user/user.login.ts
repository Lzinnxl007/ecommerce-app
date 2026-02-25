import { z } from "zod"

const UserLoginSchema = z.object({
    email: z.string().email("Field must be a email format!"),
    password: z.string()
})

export { UserLoginSchema }