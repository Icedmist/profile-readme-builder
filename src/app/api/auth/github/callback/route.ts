import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("github_oauth_state")?.value;
  if (!code || !state || !expectedState || state !== expectedState) return NextResponse.redirect(new URL("/?github=auth-error", request.url));

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: process.env.GITHUB_CLIENT_ID, client_secret: process.env.GITHUB_CLIENT_SECRET, code, redirect_uri: process.env.GITHUB_REDIRECT_URI || new URL("/api/auth/github/callback", process.env.APP_URL || request.nextUrl.origin).toString() }),
  });
  const token = await tokenResponse.json();
  if (!token.access_token) return NextResponse.redirect(new URL("/?github=auth-error", request.url));

  const response = NextResponse.redirect(new URL("/?github=connected", request.url));
  response.cookies.set("github_access_token", token.access_token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 60 * 60 * 24 * 30, path: "/" });
  response.cookies.delete("github_oauth_state");
  return response;
}
