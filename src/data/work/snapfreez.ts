import banner from "@/src/assets/banners/snapfreez.jpg";

import type { Product } from "./types";

export const snapfreez = {
  slug: "snapfreez",
  name: "Snapfreez",
  summary:
    "An AI-powered social memory app that transforms live event photography into personalized event galleries.",
  banner,
  goal: [],
  stack: [
    { name: "AWS Lambda", src: "/images/tech/aws.svg" },
    { name: "Amazon S3", src: "/images/tech/aws.svg" },
    { name: "Amazon Rekognition", src: "/images/tech/aws.svg" },
    { name: "BullMQ" },
  ],
  contribution: [
    "Delivered the core backend for Snapfreez.",
    "Developed serverless image processing pipelines using Lambda, S3, Rekognition, and BullMQ to process event media, index visual data, and keep high-volume queues reliable at scale.",
    "Engineered core product workflows for media ingestion, gallery operations, secure sharing, and role-based access control.",
  ],
  impact: [
    "Supported 2K+ first-day signups with zero crashes or production errors.",
    "Scaled the platform to 20K+ users and 100K+ daily API requests, with a 20% paid customer base.",
  ],
} satisfies Product;
