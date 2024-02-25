"use server";

import { signIn, signOut } from "@/utils/auth";

export async function SignInWithGithub() {
  return signIn("github");
}

export async function signOutSession() {
  return signOut();
}
