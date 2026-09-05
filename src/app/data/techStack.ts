export type TechCategory = "Languages" | "Frontend" | "Backend & DB" | "Cloud & DevOps" | "Tools & Design";

export type TechItem = {
  id: string;
  name: string;
  category: TechCategory;
  color: string; // Brand hex color
  logoSlug: string; // SimpleIcons slug or shield logo identifier
  iconSvg?: string; // Inline SVG path snippet
};

export const techStackLibrary: TechItem[] = [
  // Languages
  { id: "js", name: "JavaScript", category: "Languages", color: "F7DF1E", logoSlug: "javascript" },
  { id: "ts", name: "TypeScript", category: "Languages", color: "3178C6", logoSlug: "typescript" },
  { id: "python", name: "Python", category: "Languages", color: "3776AB", logoSlug: "python" },
  { id: "rust", name: "Rust", category: "Languages", color: "000000", logoSlug: "rust" },
  { id: "go", name: "Go", category: "Languages", color: "00ADD8", logoSlug: "go" },
  { id: "cpp", name: "C++", category: "Languages", color: "00599C", logoSlug: "cplusplus" },
  { id: "java", name: "Java", category: "Languages", color: "ED8B00", logoSlug: "openjdk" },
  { id: "kotlin", name: "Kotlin", category: "Languages", color: "7F52FF", logoSlug: "kotlin" },
  { id: "swift", name: "Swift", category: "Languages", color: "F05138", logoSlug: "swift" },
  { id: "html", name: "HTML5", category: "Languages", color: "E34F26", logoSlug: "html5" },
  { id: "css", name: "CSS3", category: "Languages", color: "1572B6", logoSlug: "css3" },

  // Frontend
  { id: "react", name: "React", category: "Frontend", color: "61DAFB", logoSlug: "react" },
  { id: "nextjs", name: "Next.js", category: "Frontend", color: "000000", logoSlug: "nextdotjs" },
  { id: "vue", name: "Vue.js", category: "Frontend", color: "4FC08D", logoSlug: "vuedotjs" },
  { id: "svelte", name: "Svelte", category: "Frontend", color: "FF3E00", logoSlug: "svelte" },
  { id: "angular", name: "Angular", category: "Frontend", color: "DD0031", logoSlug: "angular" },
  { id: "tailwind", name: "Tailwind CSS", category: "Frontend", color: "06B6D4", logoSlug: "tailwindcss" },
  { id: "sass", name: "Sass", category: "Frontend", color: "CC6699", logoSlug: "sass" },
  { id: "redux", name: "Redux", category: "Frontend", color: "764ABC", logoSlug: "redux" },

  // Backend & DB
  { id: "nodejs", name: "Node.js", category: "Backend & DB", color: "339933", logoSlug: "nodedotjs" },
  { id: "express", name: "Express", category: "Backend & DB", color: "000000", logoSlug: "express" },
  { id: "fastapi", name: "FastAPI", category: "Backend & DB", color: "009688", logoSlug: "fastapi" },
  { id: "django", name: "Django", category: "Backend & DB", color: "092E20", logoSlug: "django" },
  { id: "postgres", name: "PostgreSQL", category: "Backend & DB", color: "4169E1", logoSlug: "postgresql" },
  { id: "mongodb", name: "MongoDB", category: "Backend & DB", color: "47A248", logoSlug: "mongodb" },
  { id: "redis", name: "Redis", category: "Backend & DB", color: "DC382D", logoSlug: "redis" },
  { id: "graphql", name: "GraphQL", category: "Backend & DB", color: "E10098", logoSlug: "graphql" },

  // Cloud & DevOps
  { id: "docker", name: "Docker", category: "Cloud & DevOps", color: "2496ED", logoSlug: "docker" },
  { id: "kubernetes", name: "Kubernetes", category: "Cloud & DevOps", color: "326CE5", logoSlug: "kubernetes" },
  { id: "aws", name: "AWS", category: "Cloud & DevOps", color: "FF9900", logoSlug: "amazonwebservices" },
  { id: "firebase", name: "Firebase", category: "Cloud & DevOps", color: "DD2C00", logoSlug: "firebase" },
  { id: "vercel", name: "Vercel", category: "Cloud & DevOps", color: "000000", logoSlug: "vercel" },
  { id: "actions", name: "GitHub Actions", category: "Cloud & DevOps", color: "2088FF", logoSlug: "githubactions" },

  // Tools & Design
  { id: "git", name: "Git", category: "Tools & Design", color: "F05032", logoSlug: "git" },
  { id: "linux", name: "Linux", category: "Tools & Design", color: "FCC624", logoSlug: "linux" },
  { id: "figma", name: "Figma", category: "Tools & Design", color: "F24E1E", logoSlug: "figma" },
  { id: "postman", name: "Postman", category: "Tools & Design", color: "FF6C37", logoSlug: "postman" },
];

export function getShieldBadgeUrl(item: TechItem): string {
  // Uses Shields.io badge formatting
  const logoColor = ["000000", "FCC624", "F7DF1E"].includes(item.color) ? "black" : "white";
  return `https://img.shields.io/badge/${encodeURIComponent(item.name)}-${item.color}?style=for-the-badge&logo=${item.logoSlug}&logoColor=${logoColor}`;
}

export function buildTechStackBadgeMarkdown(items: TechItem[]): string {
  if (!items.length) return "";
  const badges = items.map((item) => `![${item.name}](${getShieldBadgeUrl(item)})`).join(" ");
  return `### ⚡ Tech Stack\n\n${badges}\n\n`;
}
