import { GetSession } from "@/hooks/getSession";
import { useRouter } from "next/navigation";

function AdminAuth() {
    const user = GetSession()

    const router = useRouter()
    if(!user) {
        router.push("/login")
    }

    if(user?.role !== "ADMIN") {
        router.push("/login")
    }
}

export { AdminAuth }

