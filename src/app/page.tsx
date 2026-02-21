"use client"

import { GetSession } from "@/hooks/getSession";

export default function Home() {

  const user = GetSession()
  console.log(user)

  return (
    <main></main>
  );
}
