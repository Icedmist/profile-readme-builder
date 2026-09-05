import { TechItem, techStackLibrary } from "./techStack";
import { ThemePreset, themePresets } from "./themes";

export type ProfileTemplate = {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: string;
  theme: ThemePreset;
  profile: {
    name: string;
    handle: string;
    headline: string;
    bio: string;
    location: string;
  };
  projects: { name: string; description: string; tech: string }[];
  selectedTech: TechItem[];
  enabledComponents: {
    typing: boolean;
    snake: boolean;
    divider: boolean;
    signals: boolean;
    projects: boolean;
    footer: boolean;
    techOrbit: boolean;
    terminal: boolean;
    pulseWave: boolean;
  };
};

function getItem(id: string): TechItem {
  return techStackLibrary.find((item) => item.id === id) || techStackLibrary[0];
}

export const readyMadeTemplates: ProfileTemplate[] = [
  {
    id: "fullstack",
    name: "Full Stack Engineer",
    role: "Full-Stack Web & APIs",
    description: "Equipped with tech orbit, project showcase, live signals, and full-stack tech stack.",
    icon: "🚀",
    theme: themePresets[0], // Studio Original
    profile: {
      name: "Alex Rivera",
      handle: "alex-codes",
      headline: "Building resilient, end-to-end web applications.",
      bio: "Full stack architect bridging rich responsive UIs with scalable backend services and microservices.",
      location: "San Francisco, CA",
    },
    projects: [
      { name: "pulse-api", description: "High-throughput telemetry ingestion service in Go & Redis.", tech: "Go · Redis · Docker" },
      { name: "canvas-ui", description: "Real-time collaborative whiteboard built with Next.js and WebSockets.", tech: "TypeScript · Next.js · Tailwind" },
    ],
    selectedTech: [getItem("ts"), getItem("react"), getItem("nextjs"), getItem("nodejs"), getItem("postgres"), getItem("docker")],
    enabledComponents: { typing: true, snake: true, divider: true, signals: true, projects: true, footer: true, techOrbit: true, terminal: true, pulseWave: false },
  },
  {
    id: "opensource",
    name: "Open Source Maintainer",
    role: "Systems & OSS",
    description: "Dracula aesthetic with contribution snake, tech orbit, and systems stack.",
    icon: "⚡",
    theme: themePresets[3], // Dracula
    profile: {
      name: "Soren Vane",
      handle: "soren-rust",
      headline: "Crafting fast, memory-safe tools for modern developers.",
      bio: "Maintainer of open-source CLI utilities and async network runtimes in Rust and Go.",
      location: "Stockholm, Sweden",
    },
    projects: [
      { name: "hyper-cache", description: "Blazing fast in-memory key-value engine written in Rust.", tech: "Rust · Tokio" },
      { name: "flow-cli", description: "Developer workflow automation CLI for Git monorepos.", tech: "Go · Cobra" },
    ],
    selectedTech: [getItem("rust"), getItem("go"), getItem("python"), getItem("linux"), getItem("git"), getItem("actions")],
    enabledComponents: { typing: true, snake: true, divider: true, signals: true, projects: true, footer: true, techOrbit: true, terminal: true, pulseWave: true },
  },
  {
    id: "ai-datascientist",
    name: "AI & Data Scientist",
    role: "ML & Analytics",
    description: "Matrix green theme with terminal simulator, Python ecosystem, and model projects.",
    icon: "🧠",
    theme: themePresets[4], // Emerald Matrix
    profile: {
      name: "Elena Rostova",
      handle: "elena-ai",
      headline: "Training LLMs and turning raw data into actionable intelligence.",
      bio: "Machine learning engineer exploring neural architectures, agentic systems, and vector databases.",
      location: "London, UK",
    },
    projects: [
      { name: "vector-flow", description: "High-performance semantic vector search engine for embeddings.", tech: "Python · PyTorch · FastAPI" },
      { name: "agent-eval", description: "Benchmarking framework for LLM multi-step reasoning capabilities.", tech: "Python · LangChain" },
    ],
    selectedTech: [getItem("python"), getItem("fastapi"), getItem("postgres"), getItem("docker"), getItem("linux")],
    enabledComponents: { typing: true, snake: true, divider: true, signals: true, projects: true, footer: true, techOrbit: false, terminal: true, pulseWave: true },
  },
  {
    id: "devops-cloud",
    name: "DevOps & Cloud Architect",
    role: "Cloud & Infrastructure",
    description: "Cyberpunk neon theme with pulse wave line, Kubernetes, Docker, and AWS infrastructure.",
    icon: "☁️",
    theme: themePresets[1], // Cyberpunk
    profile: {
      name: "Marcus Vance",
      handle: "marcus-cloud",
      headline: "Automating cloud infrastructure and zero-downtime deployments.",
      bio: "DevOps specialist focused on Kubernetes clusters, CI/CD pipelines, and cloud security compliance.",
      location: "Austin, TX",
    },
    projects: [
      { name: "kube-guard", description: "Automated security policy auditor for Kubernetes clusters.", tech: "Go · Kubernetes · Docker" },
      { name: "infra-pipeline", description: "Terraform modules for multi-region AWS cloud deployments.", tech: "AWS · Terraform · Actions" },
    ],
    selectedTech: [getItem("docker"), getItem("kubernetes"), getItem("aws"), getItem("actions"), getItem("linux"), getItem("python")],
    enabledComponents: { typing: true, snake: true, divider: true, signals: true, projects: true, footer: true, techOrbit: true, terminal: true, pulseWave: true },
  },
  {
    id: "frontend-artisan",
    name: "Frontend Artisan",
    role: "UI/UX & Design Systems",
    description: "Nordic Frost theme with glowing Tech Orbit, Figma, React, Vue, and Tailwind.",
    icon: "🎨",
    theme: themePresets[5], // Nordic Frost
    profile: {
      name: "Chloe Dupont",
      handle: "chloe-ui",
      headline: "Designing fluid micro-interactions and pixel-perfect UIs.",
      bio: "Design-minded frontend developer crafting modern design systems and accessible user interfaces.",
      location: "Paris, France",
    },
    projects: [
      { name: "aurora-ds", description: "Accessible headless design system for React and Tailwind CSS.", tech: "TypeScript · React · Tailwind" },
      { name: "motion-lab", description: "Interactive CSS and Canvas animation showcase.", tech: "Vue.js · HTML5 · Sass" },
    ],
    selectedTech: [getItem("js"), getItem("ts"), getItem("react"), getItem("vue"), getItem("tailwind"), getItem("figma")],
    enabledComponents: { typing: true, snake: false, divider: true, signals: true, projects: true, footer: true, techOrbit: true, terminal: false, pulseWave: true },
  },
  {
    id: "minimalist",
    name: "Minimalist Developer",
    role: "Clean & Essential",
    description: "Monochrome high-elegance design focusing on clean typography and core signals.",
    icon: "✒️",
    theme: themePresets[7], // Monochrome Minimal
    profile: {
      name: "David Kim",
      handle: "david-minimal",
      headline: "Simplicity is the ultimate sophistication.",
      bio: "Software engineer building simple, reliable, and calm software tools.",
      location: "Seoul, South Korea",
    },
    projects: [
      { name: "calm-notes", description: "Distraction-free markdown note-taking app with local storage.", tech: "TypeScript · React" },
      { name: "minimal-db", description: "Lightweight embedded key-value store for web browsers.", tech: "JavaScript" },
    ],
    selectedTech: [getItem("ts"), getItem("js"), getItem("html"), getItem("css"), getItem("git")],
    enabledComponents: { typing: true, snake: false, divider: true, signals: true, projects: true, footer: true, techOrbit: false, terminal: false, pulseWave: false },
  },
];
