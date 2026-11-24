import banner from "@/src/assets/banners/kaacib.jpg";
import logo from "@/src/assets/logos/kaacib.png";

import type { Product } from "./types";

export const kaacib = {
  slug: "kaacib",
  liveUrl: "https://kaacib.com/",
  name: "KAACIB",
  period: "May 2024 – February 2025",
  summary:
    "A local services marketplace built around a problem that usually becomes urgent at the worst possible time: you need an electrician, mechanic, plumber, or technician, but finding someone available and trustworthy can take longer than the repair itself. KAACIB connects customers with trained service professionals nearby, while giving technicians another way to find consistent work in their own area.",
  banner,
  logo,
  goal: [
    "Finding a good technician is rarely a structured process. Someone asks a neighbour for a number, searches through old WhatsApp messages, calls a few people, and hopes one of them is nearby and available. The customer has very little visibility into who is coming or where they are, while a skilled worker may be sitting only a few streets away without any way of knowing that work is available.",
    "KAACIB was trying to bring some structure to that exchange.",
    "Customers could request services at their location across categories such as electrical work, plumbing, carpentry, vehicle repair, cleaning, CCTV installation and other everyday maintenance needs. On the other side, technicians had a worker-facing application through which they could register for work, operate within their area, and receive jobs rather than depending entirely on word of mouth.",
    "That made the experience between the two sides especially important. Once a customer has booked someone to come to their home, a static “booking confirmed” screen is not enough. They want to know whether the technician has accepted the job, where they are, how to reach them, and what is happening if something changes.",
    "A large part of my work sat in that space between a booking being created and the actual service being completed.",
  ],
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
    {
      paragraphs: [
        "Much of my contribution focused on the backend systems behind an active service request.",
        "I built the real-time chat and live-location tracking using WebSockets with Pub/Sub. These were not isolated features. Both existed because the customer and technician were moving through the same job from two different places, and the platform needed to keep both sides in sync without requiring constant refreshes or repeated polling.",
        "I also developed event-driven AWS Lambda workflows around notifications, payments, and webhooks. Those operations did not all need to happen inside the main request-response path, so separating them into event-driven workflows kept the core application from carrying work that could happen independently.",
        "As usage grew, deployment speed and infrastructure behaviour became another part of my work. I introduced CI/CD around multi-stage Docker builds, reducing deployment time by as much as 80%, and worked with AWS Auto Scaling so capacity could respond to demand rather than relying on a permanently oversized environment.",
        "I like this project because the engineering problems were easy to connect to something happening in the real world. A location update was a technician moving towards somebody's home. A delayed event could mean a customer wondering whether anyone was coming. That made reliability feel considerably less abstract.",
      ],
    },
  ],
  impact: [
    { highlight: "50K+", text: "Play Store downloads." },
    { highlight: "5K+", text: "daily active users." },
    { highlight: "Nearly PKR 10 million", text: "in revenue." },
    {
      highlight: "Up to 80% faster deployments",
      text: "after introducing the new CI/CD and multi-stage Docker workflow.",
    },
  ],
} satisfies Product;
