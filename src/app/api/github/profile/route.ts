import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username")?.trim().replace(/^@/, "");
  if (!username || !/^[a-zA-Z0-9-]{1,39}$/.test(username)) {
    return NextResponse.json({ error: "Enter a valid GitHub username." }, { status: 400 });
  }

  try {
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "readme-studio" };
    const [userResponse, contributionsResponse, repositoriesResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers, next: { revalidate: 300 } }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}`, { headers, next: { revalidate: 300 } }),
      fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=stars&direction=desc&per_page=6`, { headers, next: { revalidate: 300 } }),
    ]);

    if (!userResponse.ok) return NextResponse.json({ error: "That GitHub profile could not be found." }, { status: userResponse.status });
    const user = await userResponse.json();
    const contributionPayload = contributionsResponse.ok ? await contributionsResponse.json() : null;
    const repositoriesPayload = repositoriesResponse.ok ? await repositoriesResponse.json() : [];
    const contributions = Array.isArray(contributionPayload?.contributions)
      ? contributionPayload.contributions.reduce((total: number, day: { count?: number }) => total + (day.count || 0), 0)
      : null;

    return NextResponse.json({
      username: user.login,
      name: user.name || user.login,
      bio: user.bio || "",
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      contributions,
      profileUrl: user.html_url,
      repositories: Array.isArray(repositoriesPayload) ? repositoriesPayload.map((repository: { name: string; description: string | null; language: string | null; html_url: string; stargazers_count: number }) => ({ name: repository.name, description: repository.description || "A project worth exploring.", tech: repository.language || "Open source", url: repository.html_url, stars: repository.stargazers_count })) : [],
    });
  } catch {
    return NextResponse.json({ error: "GitHub data is temporarily unavailable." }, { status: 502 });
  }
}
