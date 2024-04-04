'use server'

import { redirect } from "next/navigation"
import LoginForm from "./LoginForm";
import { getServerSession } from "next-auth";

export default async function LoginPage() {

    const session = await getServerSession();
  if (session) {
    redirect('/');
  }
  return <LoginForm />;
}