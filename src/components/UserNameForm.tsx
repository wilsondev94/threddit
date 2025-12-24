"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import * as React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";

import { useUpdateUsername } from "@/hooks/mutation-services/useUpdateUsername";
import { cn } from "@/lib/utils";
import { UsernameSchema, UsernameValidation } from "@/lib/validators/username";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "username">;
}

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UsernameValidation>({
    resolver: zodResolver(UsernameSchema),
    defaultValues: {
      name: user?.username || "",
    },
  });

  const { updateUsername, isLoading } = useUpdateUsername();

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit((e) => updateUsername(e))}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Your username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute top-0 left-0 w-8 h-10 grid place-items-center">
              <span className="text-sm text-zinc-400">u/</span>
            </div>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px] pl-6"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button isLoading={isLoading}>Change name</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
