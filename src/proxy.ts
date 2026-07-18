import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

/** Next.js 16 request proxy; protects only routes added to the matcher. */
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/dashboard/:path*"],
};
