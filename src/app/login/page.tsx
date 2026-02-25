"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UseToast } from "@/hooks/useToast";
import { useRouter } from "next/navigation";
import { UserLoginSchema } from "@/schemas/user/user.login";
import { UserLogin } from "@/types/user/user.login";
import LoginApresentation from "@/components/LoginApresentation";

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(UserLoginSchema),
    defaultValues: {
      password: "",
    },
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  async function login(user: UserLogin) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify(user),
    });
    const data = await response.json();
    return data;
  }

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data) {
        UseToast(data.message, data.status);
      }
      reset();
      if(data.status == 200) {
        router.push("/")
      }
      console.log("oi")
    },
  });

  async function submit(user: UserLogin) {
    mutation.mutateAsync(user);
  }

  return (
    <main className="h-screen max-xl:h-auto w-full flex items-start justify-between bg-black max-xl:flex-col">
      <div className="h-full w-1/2 max-xl:w-full">
        <LoginApresentation/>
      </div>
      <div className="xl:rounded-l-3xl bg-white h-full w-1/2 max-xl:w-full max-xl:py-20 flex items-center justify-center max-xl:rounded-t-3xl">
        <Card className="border-none shadow-none">
          <CardContent>
            <CardHeader>
              <CardTitle className="text-4xl text-center my-6 font-semibold">
                Log In
              </CardTitle>
            </CardHeader>
            <form className="space-y-4" onSubmit={handleSubmit(submit)}>
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
              <Button className="w-full">Log In</Button>
            </form>
            <div className="flex items-center justify-center mt-20 gap-4 text-zinc-600 text-sm">
              <span>No have an account?</span>
              <a href="/register" className="flex items-center gap-2">
                <LogIn />
                <span>Register</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
