import { User } from "@/types/user/user";
import { useState, useEffect } from "react";

function GetSession() {
  const [user, setUser] = useState<User | null>(null);

  async function fetchSession() {
    const response = await fetch("/api/auth/session");

    if (response.status !== 200) {
      setUser(null);
      return;
    }

    const sessionUser = await response.json();
    setUser(sessionUser);
  }

  useEffect(() => {
    fetchSession();
  }, []);

  return user
}

export { GetSession };
