import banner from "@/src/assets/banners/snapfreez.jpg";
import logo from "@/src/assets/logos/snapfreez.png";

import type { Product } from "./types";

export const snapfreez = {
  slug: "snapfreez",
  liveUrl: "https://www.snapfreez.com/",
  name: "Snapfreez",
  summary:
    "An AI-powered product built around a familiar problem at large events: hundreds or thousands of photographs are taken, but finding the few that actually belong to you can take forever. Snapfreez turns that pile of event photography into personal galleries, helping guests get back to their own moments without searching through everything manually.",
  banner,
  logo,
  goal: [
    "Event photography has an odd gap between taking a photograph and actually giving it to the person in it.",
    "At a wedding, conference, hackathon, corporate gathering or large public event, a photographer might produce thousands of images. Those photographs usually end up in one enormous drive or gallery. For the organisers, the event has already happened. For the guest, however, the useful part starts afterwards: finding themselves somewhere inside all that media.",
    "Snapfreez was built around making that last mile feel different.",
    "Instead of asking someone to scroll through hundreds of photographs, the system could use AI-assisted photo discovery to help surface the images relevant to them, alongside event galleries, QR-based sharing and access controls.",
    "The difficult part behind that seemingly simple experience is the amount of media moving through the system. Uploads arrive in bursts. Images need to be stored, processed and organised. Recognition work may be expensive or asynchronous. A gallery needs to stay responsive even while processing continues behind it, and private event media cannot simply be exposed through unrestricted links.",
    "That backend problem was where most of my work lived.",
  ],
  stack: [
    { name: "AWS Lambda", src: "/images/tech/aws.svg" },
    { name: "Amazon S3", src: "/images/tech/aws.svg" },
    { name: "Amazon Rekognition", src: "/images/tech/aws.svg" },
    { name: "BullMQ" },
  ],
  contribution: [
    {
      paragraphs: [
        "I delivered much of Snapfreez's core backend, including the serverless image-processing pipeline built around AWS Lambda, S3 and Rekognition.",
        "Images could not be treated like ordinary application records. Uploading and processing media is comparatively heavy work, and event traffic can be uneven. An event may remain quiet for hours and then suddenly receive a large batch of photographs. I worked on separating that processing from the user-facing application so that the system could absorb those bursts without making someone wait for every piece of work to finish synchronously.",
        "BullMQ was part of that flow, helping us coordinate background jobs while the serverless components handled image-processing workloads.",
        "I also worked on the media-ingestion flow, gallery operations, secure sharing and role-based access. Those pieces mattered because the finished experience depended on more than recognition accuracy. Photographs still had to arrive reliably, remain associated with the correct event, appear in the right gallery, and only be accessible to the people who were supposed to see them.",
        "Launch day was probably the clearest test of those decisions. Around 2,000 people signed up on the first day, and the system handled that initial traffic without crashes.",
        "From there, the product grew to over 20,000 users and around 100,000 API requests a day.",
      ],
    },
  ],
  impact: [
    {
      highlight: "2K+ sign-ups on the first day,",
      text: "with zero application crashes during the launch.",
    },
    { highlight: "20K+ users", text: "as the product grew." },
    { highlight: "100K+", text: "daily API requests." },
    { highlight: "20%", text: "of users became paid users." },
  ],
} satisfies Product;
