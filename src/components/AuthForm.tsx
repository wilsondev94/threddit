"use client";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Icons } from "./Icons";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const AuthForm = ({ className, ...props }: AuthFormProps) => {
  return (
    <div className={cn("flex justify-center", className)} {...props}>
      <Button type="button" size="sm" className="w-full" onClick={() => {}}>
        <Icons.google className="h-4 w-4 mr-2" />
        Google
      </Button>
    </div>
  );
};

export default AuthForm;
