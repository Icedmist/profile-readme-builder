"use client";

import { useEffect, useMemo, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Project = { name: string; description: string; tech: string };
type ComponentKey = "typing" | "snake" | "divider" | "projects" | "footer";
type Mode = "studio" | "github" | "source";
type AssetKey = "hero" | "process" | "community";
type SvgSettings = { accent: string; ink: string; soft: string; heroLabel: string; processLabel: string; footerLabel: string };
type GithubProfile = { username: string; name: string; avatarUrl: string; publicRepos: number; followers: number; following: number; contributions: number | null; profileUrl: string };
type GithubAuthUser = { login: string; name: string; avatarUrl: string; profileUrl: string };

const starterProjects: Project[] = [
  { name: "signal-garden", description: "A tiny observability layer for calm, useful software.", tech: "TypeScript · Next.js" },
  { name: "field-notes", description: "A searchable notebook for ideas that want to become real.", tech: "Python · SQLite" },
];
const initialState = { name: "Maya Okafor", handle: "maya-builds", headline: "I make thoughtful tools for noisy problems.", bio: "Product engineer exploring the space between useful software, good questions, and a little bit of magic.", location: "Lagos, Nigeria" };
const starterAssets: Record<AssetKey, string> = {
  hero: "https://cocoindex.io/blobs/github/homepage/enterprise-hero-light.svg",
  process: "https://cocoindex.io/blobs/github/homepage/incremental-engine-light.svg",
  community: "https://cocoindex.io/blobs/github/homepage/share-build-light.svg",
};
const initialSvgSettings: SvgSettings = { accent: "#F26938", ink: "#172321", soft: "#B8E0C2", heroLabel: "BUILD WITH INTENTION", processLabel: "IDEAS  →  EXPERIMENTS  →  USEFUL THINGS", footerLabel: "KEEP MAKING THINGS" };

function escapeXml(value: string) { return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;" })[character] || character); }
function svgData(svg: string) { return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`; }
function buildHeroSvg(settings: SvgSettings) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 260"><rect width="1200" height="260" fill="${settings.ink}"/><circle cx="1050" cy="130" r="190" fill="none" stroke="${settings.soft}" stroke-width="2" opacity=".7"><animateTransform attributeName="transform" type="rotate" from="0 1050 130" to="360 1050 130" dur="18s" repeatCount="indefinite"/></circle><circle cx="1050" cy="130" r="125" fill="none" stroke="${settings.accent}" stroke-width="2" stroke-dasharray="8 12"><animateTransform attributeName="transform" type="rotate" from="360 1050 130" to="0 1050 130" dur="10s" repeatCount="indefinite"/></circle><text x="72" y="112" fill="${settings.soft}" font-family="monospace" font-size="16" letter-spacing="5">PERSONAL README</text><text x="72" y="170" fill="white" font-family="sans-serif" font-size="48" font-weight="700">${escapeXml(settings.heroLabel)}</text><path d="M72 198h210" stroke="${settings.accent}" stroke-width="4"/></svg>`; }
function buildProcessSvg(settings: SvgSettings) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 180"><rect width="1200" height="180" rx="8" fill="${settings.soft}"/><g fill="${settings.ink}" font-family="monospace" font-size="18"><text x="70" y="96">${escapeXml(settings.processLabel)}</text></g><path d="M70 125h1060" stroke="${settings.ink}" opacity=".25"/><circle cx="70" cy="125" r="7" fill="${settings.accent}"/><circle cx="565" cy="125" r="7" fill="${settings.accent}"/><circle cx="1130" cy="125" r="7" fill="${settings.accent}"/><path d="M90 125h450m45 0h525" stroke="${settings.accent}" stroke-width="3" stroke-dasharray="10 12"><animate attributeName="stroke-dashoffset" from="0" to="-44" dur="1.5s" repeatCount="indefinite"/></path></svg>`; }
function buildProjectsSvg(settings: SvgSettings, projects: Project[]) { const cards = projects.slice(0, 3).map((project, index) => { const x = 40 + index * 380; return `<g><rect x="${x}" y="35" width="340" height="150" rx="7" fill="white" stroke="${settings.ink}" stroke-opacity=".15"/><text x="${x + 24}" y="70" fill="${settings.accent}" font-family="monospace" font-size="13">0${index + 1}</text><text x="${x + 24}" y="102" fill="${settings.ink}" font-family="sans-serif" font-size="22" font-weight="700">${escapeXml(project.name)}</text><text x="${x + 24}" y="130" fill="${settings.ink}" opacity=".65" font-family="sans-serif" font-size="12">${escapeXml(project.tech)}</text><path d="M${x + 24} 153h${100 + index * 22}" stroke="${settings.accent}" stroke-width="3" stroke-dasharray="180" stroke-dashoffset="180"><animate attributeName="stroke-dashoffset" values="180;0;180" dur="4s" repeatCount="indefinite"/></path></g>`; }).join(""); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 220"><rect width="1200" height="220" rx="8" fill="${settings.soft}"/>${cards}</svg>`; }
function buildFooterSvg(settings: SvgSettings) { return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 150"><path d="M0 55 Q300 140 600 55 T1200 55V150H0Z" fill="${settings.ink}"><animate attributeName="d" dur="7s" repeatCount="indefinite" values="M0 55 Q300 140 600 55 T1200 55V150H0Z;M0 75 Q300 20 600 75 T1200 75V150H0Z;M0 55 Q300 140 600 55 T1200 55V150H0Z"/></path><text x="600" y="105" text-anchor="middle" fill="white" font-family="monospace" font-size="17" letter-spacing="4">${escapeXml(settings.footerLabel)}</text></svg>`; }

export default function Home() {
  const [profile, setProfile] = useState(initialState);
  const [projects, setProjects] = useState(starterProjects);
  const [components, setComponents] = useState<Record<ComponentKey, boolean>>({ typing: true, snake: true, divider: true, projects: true, footer: true });
  const [assets, setAssets] = useState(starterAssets);
  const [svgSettings, setSvgSettings] = useState(initialSvgSettings);
  const [showStats, setShowStats] = useState(true);
  const [showProjects, setShowProjects] = useState(true);
  const [showContact, setShowContact] = useState(true);
  const [mode, setMode] = useState<Mode>("studio");
  const [darkPreview, setDarkPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [publishStatus, setPublishStatus] = useState<"idle" | "publishing" | "success" | "error">("idle");
  const [githubProfile, setGithubProfile] = useState<GithubProfile | null>(null);
  const [githubStatus, setGithubStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [authUser, setAuthUser] = useState<GithubAuthUser | null>(null);
  const setField = (field: keyof typeof profile, value: string) => setProfile((current) => ({ ...current, [field]: value }));
  const toggleComponent = (key: ComponentKey) => setComponents((current) => ({ ...current, [key]: !current[key] }));
  const setAsset = (key: AssetKey, value: string) => setAssets((current) => ({ ...current, [key]: value }));
  const setSvgField = (key: keyof SvgSettings, value: string) => setSvgSettings((current) => ({ ...current, [key]: value }));
  const svgFiles = useMemo(() => ({ hero: buildHeroSvg(svgSettings), process: buildProcessSvg(svgSettings), projects: buildProjectsSvg(svgSettings, projects), community: buildFooterSvg(svgSettings) }), [projects, svgSettings]);

  useEffect(() => {
    const username = profile.handle.trim().replace(/^@/, "");
    if (!username) { setGithubProfile(null); setGithubStatus("idle"); return; }
    const controller = new AbortController();
    setGithubStatus("loading");
    fetch(`/api/github/profile?username=${encodeURIComponent(username)}`, { signal: controller.signal })
      .then((response) => { if (!response.ok) throw new Error("GitHub profile unavailable"); return response.json() as Promise<GithubProfile>; })
      .then((data) => { setGithubProfile(data); setGithubStatus("ready"); })
      .catch((error: Error) => { if (error.name !== "AbortError") { setGithubProfile(null); setGithubStatus("error"); } });
    return () => controller.abort();
  }, [profile.handle]);

  useEffect(() => { fetch("/api/auth/github/me").then((response) => response.ok ? response.json() as Promise<{ login: string; name: string; avatarUrl: string; profileUrl: string }> : null).then((user) => setAuthUser(user)); }, []);

  const markdown = useMemo(() => {
    const work = projects.map((project, index) => `### ${index + 1}. ${project.name}\n\n${project.description}\n\n**${project.tech}**`).join("\n\n");
    const typing = components.typing ? `![Animated typing introduction](https://readme-typing-svg.demolab.com?font=DM+Mono&size=20&duration=3200&pause=900&color=F26938&center=false&vCenter=true&width=700&lines=${encodeURIComponent(profile.headline)})\n\n` : "";
    const divider = components.divider ? "![Visual process divider](./assets/process-flow.svg)\n\n" : "";
    const snake = components.snake ? `## Contribution trail\n\n![Animated contribution snake](https://raw.githubusercontent.com/platane/snk/output/github-contribution-grid-snake.svg)\n\n` : "";
    const footer = components.footer ? "\n![Visual community footer](./assets/community-footer.svg)\n" : "";
    const hero = "![Profile hero](./assets/profile-hero.svg)\n\n";
    const projectImage = showProjects && components.projects ? "![Visual project showcase](./assets/projects-showcase.svg)\n\n" : "";
    const stats = `| ${githubProfile?.publicRepos ?? 48} repositories | ${githubProfile?.contributions?.toLocaleString() ?? "1.2k"} contributions | ${githubProfile?.followers ?? 7} followers |\n| --- | --- | --- |\n\n`;
    return `${hero}${typing}# Hey, I'm ${profile.name} 👋\n\n> ${profile.headline}\n\n${profile.bio}\n\n📍 ${profile.location} · [GitHub](https://github.com/${profile.handle})\n\n${divider}${showStats ? `## A few signals\n\n${stats}` : ""}${showProjects ? `## Things I'm building\n\n${projectImage}${work}\n\n` : ""}${snake}${showContact ? `## Find me\n\n[GitHub](https://github.com/${profile.handle}) · [LinkedIn](https://linkedin.com/in/${profile.handle}) · hello@example.com\n` : ""}${footer}`;
  }, [components, githubProfile, profile, projects, showContact, showProjects, showStats]);

  const updateProject = (index: number, key: keyof Project, value: string) => setProjects((current) => current.map((project, projectIndex) => projectIndex === index ? { ...project, [key]: value } : project));
  const copyMarkdown = async () => { await navigator.clipboard.writeText(markdown); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const downloadFile = (filename: string, content: string, type: string) => { const blob = new Blob([content], { type }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url); };
  const downloadMarkdown = () => downloadFile(`${profile.handle || "profile"}-README.md`, markdown, "text/markdown;charset=utf-8");
  const downloadSvg = (filename: string, content: string) => downloadFile(filename, content, "image/svg+xml;charset=utf-8");
  const publishToGitHub = async () => {
    setPublishStatus("publishing");
    const response = await fetch("/api/github/publish", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ markdown, assets: [{ path: "assets/profile-hero.svg", content: svgFiles.hero }, { path: "assets/process-flow.svg", content: svgFiles.process }, { path: "assets/projects-showcase.svg", content: svgFiles.projects }, { path: "assets/community-footer.svg", content: svgFiles.community }] }) });
    if (response.status === 401) { window.location.href = "/api/auth/github/start"; return; }
    setPublishStatus(response.ok ? "success" : "error");
  };
  const loginWithGitHub = () => { window.location.href = "/api/auth/github/start"; };
  const logoutFromGitHub = async () => { await fetch("/api/auth/github/sign-out", { method: "POST" }); setAuthUser(null); setPublishStatus("idle"); };
  const saveDraft = () => { localStorage.setItem("readme-studio-draft", JSON.stringify({ profile, projects, components, svgSettings, showStats, showProjects, showContact })); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  const reset = () => { setProfile(initialState); setProjects(starterProjects); setAssets(starterAssets); setSvgSettings(initialSvgSettings); setComponents({ typing: true, snake: true, divider: true, projects: true, footer: true }); setShowStats(true); setShowProjects(true); setShowContact(true); setSaved(false); };

  return <main className={`builder-shell ${darkPreview ? "dark-preview" : ""}`}>
    <header className="topbar"><div className="brand-lockup"><span className="brand-mark">✳</span><span>readme / studio</span></div><div className="topbar-meta"><span className="status-dot" /> {saved ? "Draft saved" : "Autosaved just now"}{authUser ? <button className="auth-user" onClick={logoutFromGitHub} title="Sign out of GitHub"><img src={authUser.avatarUrl} alt="" /> @{authUser.login}</button> : <button className="github-login" onClick={loginWithGitHub}>Log in with GitHub <span>↗</span></button>}<button className="avatar" onClick={saveDraft}>MO</button></div></header>
    <section className="intro-row"><div><p className="eyebrow">Personal identity, in markdown</p><h1>Make a README<br /><em>that sounds like you.</em></h1></div><div className="intro-side"><p>Compose a living profile from GitHub-safe animated components, then preview exactly what travels with your Markdown.</p><span className="step-count">01 <i /> 03</span></div></section>
    <div className="workspace-grid"><aside className="editor-panel">
      <div className="panel-heading"><div><span className="section-number">01</span><h2>Your signal</h2></div><span className="edit-label">EDITING</span></div>
      <Field label="Name" value={profile.name} onChange={(value) => setField("name", value)} /><Field label="GitHub handle" prefix="github.com/" value={profile.handle} onChange={(value) => setField("handle", value)} /><Field label="One-line headline" multiline value={profile.headline} onChange={(value) => setField("headline", value)} /><Field label="About you" multiline value={profile.bio} onChange={(value) => setField("bio", value)} /><Field label="Based in" value={profile.location} onChange={(value) => setField("location", value)} />
      <div className="panel-divider" /><div className="panel-heading compact"><div><span className="section-number">02</span><h2>Sections</h2></div></div><Toggle label="GitHub signals" active={showStats} onClick={() => setShowStats(!showStats)} /><Toggle label="Featured work" active={showProjects} onClick={() => setShowProjects(!showProjects)} /><Toggle label="Find me" active={showContact} onClick={() => setShowContact(!showContact)} />
      <div className="panel-divider" /><div className="panel-heading compact"><div><span className="section-number">03</span><h2>Animated components</h2></div></div><ComponentToggle label="Typing introduction" note="animated SVG" active={components.typing} onClick={() => toggleComponent("typing")} /><ComponentToggle label="Contribution snake" note="animated SVG" active={components.snake} onClick={() => toggleComponent("snake")} /><ComponentToggle label="Motion divider" note="animated SVG" active={components.divider} onClick={() => toggleComponent("divider")} /><ComponentToggle label="Project showcase" note="generated SVG" active={components.projects} onClick={() => toggleComponent("projects")} /><ComponentToggle label="Waving footer" note="animated SVG" active={components.footer} onClick={() => toggleComponent("footer")} />
      <div className="panel-divider small" /><div className="panel-heading compact"><div><span className="section-number">04</span><h2>Build the SVGs</h2></div></div><SvgTextField label="Hero label" value={svgSettings.heroLabel} onChange={(value) => setSvgField("heroLabel", value)} /><SvgTextField label="Process label" value={svgSettings.processLabel} onChange={(value) => setSvgField("processLabel", value)} /><SvgTextField label="Footer label" value={svgSettings.footerLabel} onChange={(value) => setSvgField("footerLabel", value)} /><div className="color-row"><ColorField label="Accent" value={svgSettings.accent} onChange={(value) => setSvgField("accent", value)} /><ColorField label="Ink" value={svgSettings.ink} onChange={(value) => setSvgField("ink", value)} /><ColorField label="Soft" value={svgSettings.soft} onChange={(value) => setSvgField("soft", value)} /></div><div className="svg-downloads"><button onClick={() => downloadSvg("profile-hero.svg", svgFiles.hero)}>Hero SVG ↓</button><button onClick={() => downloadSvg("process-flow.svg", svgFiles.process)}>Process SVG ↓</button><button onClick={() => downloadSvg("projects-showcase.svg", svgFiles.projects)}>Projects SVG ↓</button><button onClick={() => downloadSvg("community-footer.svg", svgFiles.community)}>Footer SVG ↓</button></div>
      <div className="panel-divider small" /><div className="panel-heading compact"><div><span className="section-number">05</span><h2>Featured work</h2></div><button className="add-button" onClick={() => setProjects([...projects, { name: "new-project", description: "What does it do?", tech: "Your stack" }])}>+</button></div>{projects.map((project, index) => <div className="project-edit" key={`${project.name}-${index}`}><input aria-label={`Project ${index + 1} name`} value={project.name} onChange={(event) => updateProject(index, "name", event.target.value)} /><textarea aria-label={`Project ${index + 1} description`} rows={2} value={project.description} onChange={(event) => updateProject(index, "description", event.target.value)} /><input aria-label={`Project ${index + 1} technology`} value={project.tech} onChange={(event) => updateProject(index, "tech", event.target.value)} /></div>)}
      <div className="editor-actions"><button className="text-button" onClick={reset}>Reset</button><button className="save-button" onClick={saveDraft}>{saved ? "Saved" : "Save draft"} <span>↗</span></button></div>
    </aside><section className="preview-panel">
      <div className="preview-toolbar"><div className="window-dots"><span /><span /><span /></div><div className="mode-tabs"><button className={mode === "studio" ? "selected" : ""} onClick={() => setMode("studio")}>Studio</button><button className={mode === "github" ? "selected" : ""} onClick={() => setMode("github")}>GitHub</button><button className={mode === "source" ? "selected" : ""} onClick={() => setMode("source")}>Markdown</button></div><div className="toolbar-actions"><button title="Toggle preview theme" onClick={() => setDarkPreview(!darkPreview)}>◐</button><button title="Download README" onClick={downloadMarkdown}>↓</button><button title="Copy Markdown" onClick={copyMarkdown}>{copied ? "✓" : "↗"}</button></div></div>
      {mode === "studio" && <StudioPreview profile={profile} githubProfile={githubProfile} svgFiles={svgFiles} projects={projects} components={components} showStats={showStats} showProjects={showProjects} showContact={showContact} />}{mode === "github" && <div className="github-frame"><div className="github-label">GitHub-compatible render <span>●</span><small>{githubStatus === "loading" ? "Refreshing GitHub data…" : githubStatus === "ready" ? `Live data from @${githubProfile?.username}` : "Connect a public GitHub username"}</small></div><div className="github-markdown"><Markdown remarkPlugins={[remarkGfm]} components={{ img: ({ src, alt, ...props }) => <img {...props} src={resolveAsset(src, svgFiles)} alt={alt || "README visual"} /> }}>{markdown}</Markdown></div></div>}{mode === "source" && <pre className="source-view"><code>{markdown}</code></pre>}
      <div className="preview-footer"><span>{mode === "github" ? "GitHub Flavored Markdown · animated media preserved" : "Generated from your profile data"}</span><div><button className="publish-button" onClick={publishToGitHub}>{publishStatus === "publishing" ? "Publishing…" : publishStatus === "success" ? "Published" : "Add to GitHub"} <span>↗</span></button><button onClick={copyMarkdown}>{copied ? "Copied" : "Copy Markdown"} <span>↗</span></button><button onClick={downloadMarkdown}>Download <span>↓</span></button></div></div>
    </section></div>
  </main>;
}

function Field({ label, value, onChange, multiline = false, prefix }: { label: string; value: string; onChange: (value: string) => void; multiline?: boolean; prefix?: string }) { return <label>{label}{prefix ? <div className="input-prefix"><span>{prefix}</span><input value={value} onChange={(event) => onChange(event.target.value)} /></div> : multiline ? <textarea rows={label === "About you" ? 3 : 2} value={value} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>; }
function SvgTextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="asset-field">{label}<input value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) { return <label className="color-field">{label}<input type="color" value={value} onChange={(event) => onChange(event.target.value)} /></label>; }
function resolveAsset(src: string | Blob | undefined, svgFiles: { hero: string; process: string; projects: string; community: string }) { if (typeof src !== "string") return ""; if (src === "./assets/profile-hero.svg") return svgData(svgFiles.hero); if (src === "./assets/process-flow.svg") return svgData(svgFiles.process); if (src === "./assets/projects-showcase.svg") return svgData(svgFiles.projects); if (src === "./assets/community-footer.svg") return svgData(svgFiles.community); return src; }
function Toggle({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) { return <button className="toggle-row" onClick={onClick}><span>{label}</span><span className={`toggle ${active ? "active" : ""}`}><i /></span></button>; }
function ComponentToggle({ label, note, active, onClick }: { label: string; note: string; active: boolean; onClick: () => void }) { return <button className="component-row" onClick={onClick}><span><strong>{label}</strong><small>{note}</small></span><span className={`toggle ${active ? "active" : ""}`}><i /></span></button>; }
function StudioPreview({ profile, githubProfile, projects, svgFiles, components, showStats, showProjects, showContact }: { profile: typeof initialState; githubProfile: GithubProfile | null; projects: Project[]; svgFiles: { hero: string; process: string; projects: string; community: string }; components: Record<ComponentKey, boolean>; showStats: boolean; showProjects: boolean; showContact: boolean }) {
  const repositoryCount = githubProfile?.publicRepos ?? 48;
  const contributionCount = githubProfile?.contributions?.toLocaleString() ?? "1.2k";
  const followerCount = githubProfile?.followers ?? 7;
  return <article className="readme-card"><img className="recipe-hero" src={svgData(svgFiles.hero)} alt="Generated profile hero SVG preview" />{components.typing && <div className="studio-typing"><span className="typing-caret" /> {profile.headline}</div>}<div className="readme-kicker"><span className="pulse-line" /> PERSONAL README <span>/{profile.handle}</span></div><h2>Hey, I&apos;m <strong>{profile.name}</strong> <span className="wave">👋</span></h2><p className="readme-headline">{profile.headline}</p><p className="readme-bio">{profile.bio}</p><div className="profile-meta"><span>◎ {profile.location}</span><span>↗ github.com/{profile.handle}</span></div>{showStats && <div className="signal-block"><div><span className="signal-value">{repositoryCount}</span><span className="signal-label">repositories</span></div><div><span className="signal-value">{contributionCount}</span><span className="signal-label">contributions</span></div><div><span className="signal-value">{followerCount}</span><span className="signal-label">followers</span></div></div>}{showProjects && <><div className="readme-rule"><span /> THINGS I&apos;M BUILDING <span /></div>{components.projects && <img className="recipe-projects" src={svgData(svgFiles.projects)} alt="Generated project showcase SVG preview" />}<div className="project-list">{projects.map((project, index) => <div className="readme-project" key={`${project.name}-preview`}><div className="project-index">0{index + 1}</div><div><h3>{project.name} <span>↗</span></h3><p>{project.description}</p><small>{project.tech}</small></div></div>)}</div></>}{components.divider && <img className="recipe-process" src={svgData(svgFiles.process)} alt="Generated process diagram SVG preview" />}{components.snake && <div className="studio-snake"><span className="snake-trail" /> CONTRIBUTION TRAIL <span className="snake-grid">▦ ▦ ▦ ▦ ▦</span></div>}{showContact && <div className="contact-strip"><strong>Find me</strong><span>GitHub</span><span>LinkedIn</span><span>hello@example.com</span></div>}{components.footer && <img className="recipe-footer" src={svgData(svgFiles.community)} alt="Generated community footer SVG preview" />}<div className="readme-footer"><span>Made with intention.</span><span>⌁</span></div></article>;
}
