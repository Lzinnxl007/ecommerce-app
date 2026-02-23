import { email, z } from "zod";

const UserRegisterSchema = z
  .object({
    name: z.string().max(30, "Name must be a max of 30 characters!"),
    email: z.string().email("Field must be a email format!"),
    password: z
      .string()
      .min(6, "Password must be a min of 6 characters")
      .max(40, "Password must a max of 40 characters!"),
    confirmPassword: z.string(),
    privacyPolicy: z.boolean(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    error: "Passwords not match!",
    path: ["confirmPassword"],
  })
  .refine((data) => data.privacyPolicy !== false, {
    error: "Accept Privacy Policy to continue!",
    path: ["privacyPolicy"],
  });

export { UserRegisterSchema };
