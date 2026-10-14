import banner from "@/src/assets/banners/sit-lms.jpg";

import type { Product } from "./types";

export const sitLms = {
  slug: "sit-lms",
  name: "Saylani IT LMS",
  summary:
    "A nationwide LMS ecosystem serving 600K+ students across web and mobile platforms.",
  banner,
  goal: [],
  stack: [
    { name: "React", src: "/images/tech/react.png" },
    { name: "Redux", src: "/images/tech/redux.png" },
    { name: "Node.js", src: "/images/tech/nodejs.png" },
    { name: "Laravel", src: "/images/tech/laravel.png" },
    { name: "REST APIs" },
    { name: "Serverless" },
    { name: "Docker" },
    { name: "CI/CD" },
    { name: "Prometheus" },
    { name: "Grafana" },
    { name: "Firebase Crashlytics", src: "/images/tech/firebase.svg" },
    { name: "Firebase Analytics", src: "/images/tech/firebase.svg" },
    { name: "Sentry" },
  ],
  contribution: [
    "Led the development of Saylani Student Portal as engineering lead for a 4-member team.",
    "Owned system design, backend services, frontend integration, and product experience across the complete product ecosystem.",
    "Built and shipped frontend systems across web and mobile platforms, focusing on frontend architecture, performance, design patterns, responsive UI, and seamless user experience.",
    "Designed robust REST APIs and event-driven serverless workflows, scaling backend systems for reliability and performance across high-volume production workloads.",
    "Automated deployment workflows through CI/CD pipelines using Docker and a blue-green deployment strategy.",
    "Established production observability across web, mobile, and backend systems by self-hosting Prometheus and Grafana and integrating Firebase Crashlytics, Firebase Analytics, and Sentry for crash tracking, session replay, and API error monitoring.",
  ],
  impact: [
    "Serves 600K+ students and 30K+ daily active users, driving ~$2M ARR across web and mobile platforms.",
    "Backend scaled to process 800K+ daily API requests.",
    "Zero-downtime production releases through blue-green deployments.",
  ],
} satisfies Product;
