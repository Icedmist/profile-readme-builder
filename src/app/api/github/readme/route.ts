import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")?.trim().replace(/^@/, "");
  if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json({ error: "Enter a valid GitHub username." }, { status: 400 });
  }

  try {
    const headers = { Accept: "application/vnd.github.raw+json", "User-Agent": "readme-studio" };
    // Try main branch first, fallback to master
    let response = await fetch(`https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(username)}/main/README.md`, { headers, next: { revalidate: 60 } });

    if (!response.ok) {
      response = await fetch(`https://raw.githubusercontent.com/${encodeURIComponent(username)}/${encodeURIComponent(username)}/master/README.md`, { headers, next: { revalidate: 60 } });
    }

    if (!response.ok) {
      return NextResponse.json({ error: `Could not find a profile README for @${username}. Make sure the repository ${username}/${username} exists and contains a README.md file.` }, { status: 404 });
    }

    const content = await response.text();
    return NextResponse.json({ username, content, byteSize: content.length });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub README. Please try again later." }, { status: 502 });
  }
}
