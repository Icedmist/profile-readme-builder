import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export async function GET(request: Request) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) return NextResponse.redirect(new URL("/?github=not-configured", request.url));
  const state = randomUUID();
  const redirectUri = process.env.GITHUB_REDIRECT_URI || new URL("/api/auth/github/callback", request.url).toString();
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo");
  authorizeUrl.searchParams.set("state", state);
  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set("github_oauth_state", state, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 600, path: "/" });
  return response;
}
