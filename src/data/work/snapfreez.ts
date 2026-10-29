import banner from "@/src/assets/banners/snapfreez.jpg";
import logo from "@/src/assets/logos/snapfreez.png";

import type { Product } from "./types";

export const snapfreez = {
  slug: "snapfreez",
  name: "Snapfreez",
  summary:
    "An AI-powered social memory app that transforms live event photography into personalized event galleries.",
  banner,
  logo,
  goal: [],
  stack: [
    { name: "AWS Lambda", src: "/images/tech/aws.svg" },
    { name: "Amazon S3", src: "/images/tech/aws.svg" },
    { name: "Amazon Rekognition", src: "/images/tech/aws.svg" },
    { name: "BullMQ" },
  ],
  contribution: [
    {
      paragraphs: [
        "Delivered the core backend for Snapfreez.",
        "Developed serverless image processing pipelines using Lambda, S3, Rekognition, and BullMQ to process event media, index visual data, and keep high-volume queues reliable at scale.",
        "Engineered core product workflows for media ingestion, gallery operations, secure sharing, and role-based access control.",
      ],
    },
  ],
  impact: [
    {
      text: "Supported 2K+ first-day signups with zero crashes or production errors.",
    },
    {
      text: "Scaled the platform to 20K+ users and 100K+ daily API requests, with a 20% paid customer base.",
    },
  ],
} satisfies Product;
