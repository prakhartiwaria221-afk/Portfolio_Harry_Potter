import bookpardImage from "@/assets/bookpard-project.png";
import mindbloomImage from "@/assets/mindbloom-project.png";
import coordinetImage from "@/assets/coordinet-project.png";

export const profileUrl = "https://github.com/prakhartiwaria221-afk";

export const projects = [
  {
    title: "MindBloom",
    link: "https://github.com/prakhartiwaria221-afk/MindBloom",
    description: "AI-based adaptive learning platform with gamified learning, voice-guided systems, emotion-aware apps.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    image: mindbloomImage,
  },
  {
    title: "CoordiNet",
    link: profileUrl,
    description: "Emergency coordination platform connecting police, hospitals, and disaster authorities with citizens.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    image: coordinetImage,
  },
  {
    title: "BookPard",
    link: "https://github.com/prakhartiwaria221-afk/bookpard-treasure-trove",
    description: "A full-stack web application featuring authentication, book selling, admin dashboard, secure payments.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Supabase"],
    image: bookpardImage,
  },
  {
    title: "Library Management",
    link: "https://github.com/prakhartiwaria221-afk/Library-Management-System",
    description: "Console-based system using C++ and OOP concepts with file handling for data storage.",
    tags: ["C++", "OOP"],
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=500&fit=crop",
  },
];

export const techSkills = [
  { name: "C++", level: 60 },
  { name: "Java", level: 50 },
  { name: "React", level: 50 },
  { name: "Front-End Development", level: 80 },
  { name: "Web Design", level: 60 },
];

export const creativeSkills = [
  { name: "Video Editing", level: 70 },
  { name: "Graphic Design", level: 50 },
];

export const tools = ["React", "TypeScript", "Tailwind", "Git", "VS Code", "Figma", "SQL"];
