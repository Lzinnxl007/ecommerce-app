import { GetSession } from "@/hooks/getSession";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    const response = await fetch("/api/auth/session");

    if (!response.ok) {
      redirect("/login");
    }

    const user = await response.json();
    if (!user) {
      redirect("/login");
    }

    if (user?.role !== "ADMIN") {
      redirect("/login");
    }
  } catch (error) {
    redirect("/login");
  }
  return <>{children}</>;
}
