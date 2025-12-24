"use client";

import { UsernameValidation } from "@/lib/validators/username";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useUpdateUsername() {
  const router = useRouter();

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: UsernameValidation) => {
      const payload: UsernameValidation = { name };

      const { data } = await axios.patch(`/api/username/`, payload);
      return data;
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast.error(err.response.data);
        }
      }

      return toast.error("Your username was not updated. Please try again.");
    },
    onSuccess: () => {
      toast.success("Your username has been updated.");
      router.refresh();
    },
  });

  return {
    updateUsername,
    isLoading,
  };
}
