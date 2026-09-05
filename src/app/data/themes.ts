import { SvgThemeSettings } from "./animatedComponents";

export type ThemePreset = {
  id: string;
  name: string;
  description: string;
  previewColor: string; // Color pill hex
  darkPreview: boolean;
  settings: SvgThemeSettings;
};

export const themePresets: ThemePreset[] = [
  {
    id: "studio-orange",
    name: "Studio Original",
    description: "Warm terracotta accent on deep pine green & soft mint.",
    previewColor: "#F26938",
    darkPreview: false,
    settings: {
      accent: "#F26938",
      ink: "#172321",
      soft: "#B8E0C2",
      font: "DM Mono",
      heroLabel: "BUILD WITH INTENTION",
      processLabel: "IDEAS  →  EXPERIMENTS  →  USEFUL THINGS",
      footerLabel: "KEEP MAKING THINGS",
    },
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk Neon",
    description: "High-contrast glowing cyan & hot magenta on midnight black.",
    previewColor: "#00F0FF",
    darkPreview: true,
    settings: {
      accent: "#00F0FF",
      ink: "#0D0E15",
      soft: "#FF007A",
      font: "monospace",
      heroLabel: "SYSTEM // ONLINE",
      processLabel: "INPUT  →  COMPILE  →  EXECUTE",
      footerLabel: "CONNECTING TO SIGNAL...",
    },
  },
  {
    id: "tokyo-night",
    name: "Tokyo Night",
    description: "Serene violet indigo with electric cyan & soft lavender.",
    previewColor: "#7AA2F7",
    darkPreview: true,
    settings: {
      accent: "#7AA2F7",
      ink: "#1A1B26",
      soft: "#BB9AF7",
      font: "DM Mono",
      heroLabel: "SHADOW & CODE",
      processLabel: "DESIGN  →  REFINEMENT  →  DEPLOYMENT",
      footerLabel: "CREATING IN THE STILL NIGHT",
    },
  },
  {
    id: "dracula",
    name: "Dracula",
    description: "Classic vampire violet, vibrant pink, and bright cyan accents.",
    previewColor: "#FF79C6",
    darkPreview: true,
    settings: {
      accent: "#FF79C6",
      ink: "#282A36",
      soft: "#8BE9FD",
      font: "monospace",
      heroLabel: "FULL STACK SPELLS",
      processLabel: "CAST  →  TRANSFORM  →  RELEASE",
      footerLabel: "ALWAYS BUILDING IN THE DARK",
    },
  },
  {
    id: "emerald-matrix",
    name: "Emerald Matrix",
    description: "Phosphor matrix green & sleek deep dark gray.",
    previewColor: "#00FF66",
    darkPreview: true,
    settings: {
      accent: "#00FF66",
      ink: "#0A120D",
      soft: "#88FFB4",
      font: "monospace",
      heroLabel: "ENTER THE MATRIX",
      processLabel: "PARSE  →  TRANSFORM  →  EMIT",
      footerLabel: "FOLLOW THE WHITE RABBIT",
    },
  },
  {
    id: "nordic-frost",
    name: "Nordic Frost",
    description: "Cool arctic teal, crisp navy ink, and glacier white.",
    previewColor: "#38BDF8",
    darkPreview: false,
    settings: {
      accent: "#38BDF8",
      ink: "#0F172A",
      soft: "#BAE6FD",
      font: "DM Mono",
      heroLabel: "CLEAN & FOCUSED",
      processLabel: "SIMPLIFY  →  STRUCTURE  →  DELIVER",
      footerLabel: "DESIGNED WITH CALM RESTRAINT",
    },
  },
  {
    id: "solarized-warm",
    name: "Solarized Amber",
    description: "Warm amber gold on rich dark copper & ivory soft.",
    previewColor: "#D97706",
    darkPreview: false,
    settings: {
      accent: "#D97706",
      ink: "#1E1B18",
      soft: "#FDE68A",
      font: "Georgia",
      heroLabel: "CRAFTED WITH CARE",
      processLabel: "RESEARCH  →  PROTOTYPE  →  SHIP",
      footerLabel: "STAY CURIOUS & KEEP LEARNING",
    },
  },
  {
    id: "monochrome-minimal",
    name: "Monochrome Minimal",
    description: "Crisp black and white high-elegance typography.",
    previewColor: "#111827",
    darkPreview: false,
    settings: {
      accent: "#111827",
      ink: "#000000",
      soft: "#E5E7EB",
      font: "Verdana",
      heroLabel: "LESS BUT BETTER",
      processLabel: "ESSENCE  →  FORM  →  FUNCTION",
      footerLabel: "SIMPLICITY IS THE ULTIMATE SOPHISTICATION",
    },
  },
];
