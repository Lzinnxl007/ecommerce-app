"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Divide, Eye, EyeOff, LogIn } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRegisterSchema } from "@/schemas/user/user.register";
import { UserRegister } from "@/types/user/user.register";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { UseToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import RegisterApresentation from "@/components/RegisterApresentation";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(UserRegisterSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      privacyPolicy: false,
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);

  interface UserRegisterWithConfirmPassword extends UserRegister {
    confirmPassword: string;
  }

  async function registerUser(user: UserRegister) {
    const response = await fetch("/api/users/register", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data) {
        UseToast(data.message, data.status);
      }
      reset();
    },
  });

  async function submit(user: UserRegisterWithConfirmPassword) {
    const { name, email, password } = user;
    const newUser = { name, email, password };
    mutation.mutate(newUser);
  }

  return (
    <main className="h-screen max-xl:h-auto w-full flex items-start justify-between bg-black max-xl:flex-col">
      <div className="h-full w-1/2 max-xl:w-full">
        <RegisterApresentation />
      </div>
      <div className="xl:rounded-l-3xl bg-white h-full w-1/2 max-xl:w-full max-xl:py-20 flex items-center justify-center max-xl:rounded-t-3xl">
        <Card className="border-none shadow-none">
          <CardContent>
            <CardHeader>
              <CardTitle className="text-4xl text-center my-6 font-semibold">
                Create an account
              </CardTitle>
            </CardHeader>
            <form className="space-y-4" onSubmit={handleSubmit(submit)}>
              <div>
                <Label className="text-gray-500">First Name</Label>
                <Input
                  {...register("name")}
                  className="border-none"
                  type="text"
                  name="name"
                  required
                />
                <FormError message={errors?.name?.message ?? ""} />
              </div>
              <div>
                <Label className="text-gray-500">Email</Label>
                <Input
                  {...register("email")}
                  className="border-none"
                  type="email"
                  name="email"
                  required
                />
                <FormError message={errors?.email?.message ?? ""} />
              </div>
              <div>
                <Label className="text-gray-500">Password</Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <InputGroup className="border-none">
                        <InputGroupInput
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          value={field.value}
                          onChange={field.onChange}
                          required
                        />
                        <InputGroupAddon
                          className="cursor-pointer"
                          align="inline-end"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? <Eye /> : <EyeOff />}
                        </InputGroupAddon>
                      </InputGroup>
                      <FormError message={errors?.password?.message ?? ""} />
                    </div>
                  )}
                />
              </div>
              <div>
                <Label className="text-gray-500">Confirm Password</Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <InputGroup className="border-none">
                        <InputGroupInput
                          type={confirmPasswordVisible ? "text" : "password"}
                          name="confirm-password"
                          onChange={field.onChange}
                          value={field.value}
                          required
                        />
                        <InputGroupAddon
                          align="inline-end"
                          className="cursor-pointer"
                          onClick={() =>
                            setconfirmPasswordVisible(!confirmPasswordVisible)
                          }
                        >
                          {confirmPasswordVisible ? <Eye /> : <EyeOff />}
                        </InputGroupAddon>
                      </InputGroup>
                      <FormError
                        message={errors?.confirmPassword?.message ?? ""}
                      />
                    </div>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="privacyPolicy"
                  control={control}
                  render={({ field }) => (
                    <div className="flex items-center gap-2">
                      <Checkbox
                        name="privacy-policy"
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm">
                        I accept the{" "}
                        <a href="/privacy-policy">
                          <strong>Privacy Policy</strong>
                        </a>
                      </span>
                    </div>
                  )}
                />
                <FormError message={errors?.privacyPolicy?.message ?? ""} />
              </div>
              <Button className="w-full">Register</Button>
            </form>
            <div className="flex items-center justify-center mt-20 gap-4 text-zinc-600 text-sm">
              <span>Already have an account?</span>
              <a href="/login" className="flex items-center gap-2">
                <LogIn />
                <span>Log In</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
