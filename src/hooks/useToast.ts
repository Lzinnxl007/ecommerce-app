"use client";

import { toast } from "sonner";

export function UseToast(message: string, status: number) {
  if (message || status) {
    if (status == 200) {
      toast.success(message);
      return;
    }
    toast.error(message);
  }
}
