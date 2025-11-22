import { writable } from "svelte/store";

export interface Project {
  id: string;
  title: string;
  link: string;
  techStack: string;
  description?: string;
  metrics?: string; // Added metric field
  addedAt?: Date;
}

export const projects = writable<Project[]>([
  {
    id: "1",
    title: "Airdrop Tracker (SaaS)",
    link: "https://airdroptracker.app",
    techStack: "React, Blockchain Integration, Payment Gateways, Tailwind CSS",
    description:
      "A full-stack crypto tracking solution abstracting multi-wallet complexity for easy payment of subscription models.",
    metrics: "100+ Active Users"
  },
]);
