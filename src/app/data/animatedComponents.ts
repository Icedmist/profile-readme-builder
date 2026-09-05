import { TechItem } from "./techStack";

export type SvgThemeSettings = {
  accent: string;
  ink: string;
  soft: string;
  font: string;
  heroLabel: string;
  processLabel: string;
  footerLabel: string;
};

function escapeXml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&apos;", '"': "&quot;" })[char] || char);
}

// 1. Tech Orbit SVG (concentric orbiting tech stack badges)
export function buildTechOrbitSvg(settings: SvgThemeSettings, items: TechItem[]): string {
  const selected = items.length > 0 ? items.slice(0, 8) : [
    { id: "ts", name: "TypeScript", color: "3178C6", logoSlug: "ts", category: "Languages" },
    { id: "react", name: "React", color: "61DAFB", logoSlug: "react", category: "Frontend" },
    { id: "next", name: "Next.js", color: "000000", logoSlug: "next", category: "Frontend" },
    { id: "python", name: "Python", color: "3776AB", logoSlug: "python", category: "Languages" },
    { id: "rust", name: "Rust", color: "000000", logoSlug: "rust", category: "Languages" },
    { id: "docker", name: "Docker", color: "2496ED", logoSlug: "docker", category: "Cloud & DevOps" },
  ] as TechItem[];

  const cx = 600;
  const cy = 160;
  const r1 = 110;
  const r2 = 180;

  const orbit1Nodes = selected.slice(0, 4).map((item, idx) => {
    const angle = (idx * 360) / Math.min(4, selected.length);
    const rad = (angle * Math.PI) / 180;
    const x = cx + r1 * Math.cos(rad);
    const y = cy + r1 * Math.sin(rad);
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})">
      <circle r="22" fill="${settings.ink}" stroke="${settings.accent}" stroke-width="2"/>
      <text y="4" text-anchor="middle" fill="${settings.soft}" font-family="${escapeXml(settings.font)}" font-size="11" font-weight="bold">${escapeXml(item.name.slice(0, 4))}</text>
    </g>`;
  }).join("");

  const orbit2Nodes = selected.slice(4, 8).map((item, idx) => {
    const angle = (idx * 360) / Math.max(1, selected.length - 4);
    const rad = (angle * Math.PI) / 180;
    const x = cx + r2 * Math.cos(rad);
    const y = cy + r2 * Math.sin(rad);
    return `<g transform="translate(${x.toFixed(1)}, ${y.toFixed(1)})">
      <circle r="20" fill="${settings.accent}" opacity="0.9"/>
      <text y="4" text-anchor="middle" fill="#ffffff" font-family="${escapeXml(settings.font)}" font-size="10" font-weight="bold">${escapeXml(item.name.slice(0, 4))}</text>
    </g>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 320">
    <rect width="1200" height="320" rx="12" fill="${settings.ink}"/>
    
    <!-- Central Pulsing Core -->
    <g transform="translate(${cx}, ${cy})">
      <circle r="45" fill="${settings.accent}" opacity="0.15">
        <animate attributeName="r" values="40;55;40" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle r="32" fill="${settings.accent}"/>
      <text y="5" text-anchor="middle" fill="#ffffff" font-family="${escapeXml(settings.font)}" font-size="14" font-weight="bold">CORE</text>
    </g>

    <!-- Inner Orbit Line & Group -->
    <circle cx="${cx}" cy="${cy}" r="${r1}" fill="none" stroke="${settings.soft}" stroke-width="1.5" stroke-dasharray="6 8" opacity="0.5"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="18s" repeatCount="indefinite"/>
      ${orbit1Nodes}
    </g>

    <!-- Outer Orbit Line & Group -->
    <circle cx="${cx}" cy="${cy}" r="${r2}" fill="none" stroke="${settings.accent}" stroke-width="1.5" opacity="0.4"/>
    <g>
      <animateTransform attributeName="transform" type="rotate" from="360 ${cx} ${cy}" to="0 ${cx} ${cy}" dur="26s" repeatCount="indefinite"/>
      ${orbit2Nodes}
    </g>

    <!-- Labels & Title -->
    <text x="60" y="70" fill="${settings.soft}" font-family="${escapeXml(settings.font)}" font-size="12" letter-spacing="4">SYSTEM ARCHITECTURE</text>
    <text x="60" y="115" fill="#ffffff" font-family="sans-serif" font-size="32" font-weight="bold">Interactive Tech Orbit</text>
    <path d="M60 135 h220" stroke="${settings.accent}" stroke-width="3"/>
  </svg>`;
}

// 2. Animated Cyberpunk Code Terminal SVG
export function buildTerminalSvg(settings: SvgThemeSettings, headline: string, bio: string): string {
  const safeHeadline = escapeXml(headline || "const developer = new Creator();");
  const safeBio = escapeXml(bio || "Building modern web experiences with clean architecture.");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 240">
    <rect width="1200" height="240" rx="10" fill="#0d1117" stroke="${settings.accent}" stroke-width="1.5"/>
    
    <!-- Window Topbar Buttons -->
    <g transform="translate(25, 20)">
      <circle cx="0" cy="0" r="6" fill="#ff5f56"/>
      <circle cx="18" cy="0" r="6" fill="#ffbd2e"/>
      <circle cx="36" cy="0" r="6" fill="#27c93f"/>
      <text x="70" y="4" fill="#8b949e" font-family="${escapeXml(settings.font)}" font-size="12">zsh — profile-terminal ~ 80x24</text>
    </g>
    <line x1="0" y1="42" x2="1200" y2="42" stroke="#21262d" stroke-width="1"/>

    <!-- Terminal Prompt Lines -->
    <g transform="translate(30, 80)" font-family="${escapeXml(settings.font)}" font-size="15">
      <text fill="${settings.accent}">⚡ ~/dev <tspan fill="#8b949e">on</tspan> <tspan fill="${settings.soft}">main</tspan> <tspan fill="#ffffff">$ cat headline.ts</tspan></text>
      <text y="35" fill="${settings.soft}" font-weight="500">" ${safeHeadline} "</text>
      
      <text y="75" fill="${settings.accent}">⚡ ~/dev <tspan fill="#8b949e">on</tspan> <tspan fill="${settings.soft}">main</tspan> <tspan fill="#ffffff">$ echo $STATUS</tspan></text>
      <text y="110" fill="#e6edf3">${safeBio.slice(0, 85)}<tspan fill="${settings.accent}">_</tspan></text>
    </g>

    <!-- Blinking Caret Animation -->
    <rect x="780" y="177" width="9" height="18" fill="${settings.accent}">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
  </svg>`;
}

// 3. Stats Radar / Signals SVG
export function buildRadarSvg(settings: SvgThemeSettings, repos: number, contribs: string, followers: number): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200">
    <rect width="1200" height="200" rx="10" fill="${settings.ink}"/>
    
    <!-- Background Grid Lines -->
    <path d="M0 100 h1200 M600 0 v200" stroke="${settings.soft}" stroke-width="1" opacity="0.15"/>
    <circle cx="600" cy="100" r="70" fill="none" stroke="${settings.soft}" stroke-width="1" opacity="0.2"/>
    <circle cx="600" cy="100" r="40" fill="none" stroke="${settings.accent}" stroke-width="1" opacity="0.4"/>

    <!-- Rotating Radar Sweep Beam -->
    <g transform="translate(600,100)">
      <polygon points="0,0 160,-50 160,50" fill="${settings.accent}" opacity="0.15">
        <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="6s" repeatCount="indefinite"/>
      </polygon>
    </g>

    <!-- Stat Callout 1 -->
    <g transform="translate(100, 65)">
      <text fill="${settings.accent}" font-family="${escapeXml(settings.font)}" font-size="42" font-weight="bold">${repos}</text>
      <text y="30" fill="${settings.soft}" font-family="${escapeXml(settings.font)}" font-size="13" letter-spacing="3">PUBLIC REPOSITORIES</text>
    </g>

    <!-- Stat Callout 2 -->
    <g transform="translate(860, 65)">
      <text fill="${settings.accent}" font-family="${escapeXml(settings.font)}" font-size="42" font-weight="bold">${contribs}</text>
      <text y="30" fill="${settings.soft}" font-family="${escapeXml(settings.font)}" font-size="13" letter-spacing="3">TOTAL CONTRIBUTIONS</text>
    </g>

    <!-- Central Signal Marker -->
    <circle cx="600" cy="100" r="6" fill="${settings.accent}">
      <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite"/>
    </circle>
  </svg>`;
}

// 4. Activity Pulse Wave SVG
export function buildPulseWaveSvg(settings: SvgThemeSettings): string {
  const bars = Array.from({ length: 32 }).map((_, i) => {
    const x = 50 + i * 35;
    const h1 = Math.floor(Math.random() * 40) + 10;
    const h2 = Math.floor(Math.random() * 70) + 20;
    return `<rect x="${x}" y="${100 - h1}" width="12" height="${h1 * 2}" rx="6" fill="${i % 2 === 0 ? settings.accent : settings.soft}" opacity="0.8">
      <animate attributeName="height" values="${h1 * 2};${h2 * 2};${h1 * 2}" dur="${(1.2 + (i % 5) * 0.3).toFixed(1)}s" repeatCount="indefinite"/>
      <animate attributeName="y" values="${100 - h1};${100 - h2};${100 - h1}" dur="${(1.2 + (i % 5) * 0.3).toFixed(1)}s" repeatCount="indefinite"/>
    </rect>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 140">
    <rect width="1200" height="140" rx="8" fill="${settings.ink}"/>
    ${bars}
  </svg>`;
}
