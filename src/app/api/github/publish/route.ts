import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

type Asset = { path: string; content: string };

async function githubRequest(path: string, token: string, init?: RequestInit) {
  return fetch(`https://api.github.com${path}`, { ...init, headers: { Accept: "application/vnd.github+json", Authorization: `Bearer ${token}`, "User-Agent": "readme-studio", "Content-Type": "application/json", ...(init?.headers || {}) } });
}

export async function POST(request: NextRequest) {
  const token = (await cookies()).get("github_access_token")?.value;
  if (!token) return NextResponse.json({ error: "Connect GitHub before publishing." }, { status: 401 });
  const body = await request.json() as { markdown?: string; assets?: Asset[] };
  if (!body.markdown) return NextResponse.json({ error: "README content is required." }, { status: 400 });

  const userResponse = await githubRequest("/user", token);
  if (!userResponse.ok) return NextResponse.json({ error: "Your GitHub connection has expired." }, { status: 401 });
  const user = await userResponse.json();
  const owner = user.login;
  const repoResponse = await githubRequest(`/repos/${owner}/${owner}`, token);
  if (repoResponse.status === 404) {
    const createResponse = await githubRequest("/user/repos", token, { method: "POST", body: JSON.stringify({ name: owner, description: "My GitHub profile README", private: false, auto_init: true }) });
    if (!createResponse.ok) return NextResponse.json({ error: "GitHub could not create your profile repository." }, { status: createResponse.status });
  } else if (!repoResponse.ok) return NextResponse.json({ error: "GitHub profile repository could not be accessed." }, { status: repoResponse.status });

  const files = [{ path: "README.md", content: body.markdown }, ...(body.assets || [])];
  for (const file of files) {
    const existingResponse = await githubRequest(`/repos/${owner}/${owner}/contents/${file.path}`, token);
    const existing = existingResponse.ok ? await existingResponse.json() : null;
    const updateResponse = await githubRequest(`/repos/${owner}/${owner}/contents/${file.path}`, token, { method: "PUT", body: JSON.stringify({ message: `Update profile README assets`, content: Buffer.from(file.content, "utf8").toString("base64"), ...(existing?.sha ? { sha: existing.sha } : {}) }) });
    if (!updateResponse.ok) return NextResponse.json({ error: `Could not publish ${file.path} to GitHub.` }, { status: updateResponse.status });
  }
  return NextResponse.json({ success: true, url: `https://github.com/${owner}` });
}
