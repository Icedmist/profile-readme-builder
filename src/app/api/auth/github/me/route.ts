import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const token = (await cookies()).get("github_access_token")?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 401 });
  const response = await fetch("https://api.github.com/user", { headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "User-Agent": "readme-studio" }, cache: "no-store" });
  if (!response.ok) return NextResponse.json({ authenticated: false }, { status: 401 });
  const user = await response.json();
  return NextResponse.json({ authenticated: true, login: user.login, name: user.name || user.login, avatarUrl: user.avatar_url, profileUrl: user.html_url });
}
