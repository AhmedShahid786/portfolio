import banner from "@/src/assets/banners/kaacib.jpg";

import type { Product } from "./types";

export const kaacib = {
  slug: "kaacib",
  name: "KAACIB",
  summary:
    "A local services marketplace connecting customers with trained technicians for everyday repair and maintenance needs.",
  banner,
  goal: [],
  stack: [
    { name: "WebSockets" },
    { name: "Pub/Sub" },
    { name: "AWS Lambda", src: "/images/tech/aws.svg" },
    { name: "AWS Auto Scaling Groups", src: "/images/tech/aws.svg" },
    { name: "Firebase Cloud Messaging", src: "/images/tech/firebase.svg" },
    { name: "Docker" },
    { name: "CI/CD" },
  ],
  contribution: [
    "Engineered live location tracking and real-time chat between customers and technicians using WebSockets, scaling the socket infrastructure with a Pub/Sub architecture.",
    "Designed event-driven backend workflows with AWS Lambda and FCM for notifications, payment processing, and webhook handling, decoupling service operations from the main request flow.",
    "Optimized CI/CD pipelines using multistage Docker builds and build layer caching, and configured AWS Auto Scaling Groups for production auto scaling under high-traffic workloads.",
    "Worked across the stack to ship end-to-end features for Kaacib's mobile app.",
  ],
  impact: [
    "Helped scale the platform to 50K+ Play Store downloads, 5K+ daily active users, and nearly 10M PKR in revenue.",
    "Reduced deployment time by up to 80%.",
  ],
} satisfies Product;
