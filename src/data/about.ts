export type AboutSegment =
  | string
  | { kind: "link"; text: string; href: string }
  | { kind: "emphasis"; text: string };

export type AboutBullet = {
  id: string;
  content: AboutSegment[];
};

export const ABOUT_BULLETS = [
  {
    id: "intro",
    content: [
      "Product Engineer with 3+ years of experience building and shipping products that people actually use and that add value to their lives.",
    ],
  },
  {
    id: "curiosity",
    content: ["Fascinated by computers. I love building and breaking things."],
  },
  {
    id: "mindset",
    content: ["A generalist with a perfectionist mindset."],
  },
  {
    id: "craft",
    content: [
      "I care just as much about backend architecture as I do about the tiny interaction that doesn’t quite feel right.",
    ],
  },
  {
    id: "hats",
    content: [
      "I love wearing multiple hats — backend, frontend, UI, micro-interactions, infrastructure, deployments. You name it.",
    ],
  },
  {
    id: "reach",
    content: [
      "I’ve shipped products that have reached hundreds of thousands of users.",
    ],
  },
  {
    id: "scale",
    content: [
      "Built systems that scaled to massive workloads and mobile apps downloaded thousands of times.",
    ],
  },
] satisfies AboutBullet[];

export const ABOUT_DETAILED = `
I’ve always been curious about the mechanics behind things. I like digging into the logic, understanding the structure, and seeing how all the pieces fit together. That curiosity naturally pulled me toward software, systems, and building products. And it still drives how I learn today.

Since then, I’ve built and shipped products that people actually use — products that have reached hundreds of thousands of users and added real value to their lives, systems that have scaled to massive workloads, and apps that have snuck their way into thousands of phones.

I’m equally obsessed with both sides of the product. The engineer — or maybe the perfectionist — in me cares about architecture, performance, and optimizing that 1.5-second API call down to one second if I know it can be done, because that half-second matters to the system and, eventually, the user. Then there’s the product side of me, which can probably get a little annoying. I notice the unnecessary step, the confusing flow, the weird interaction, or that tiny detail nobody really points out, but somehow makes the whole thing feel slightly off. And once I notice it, I’ll probably fix it even if nobody asked me to.
`;
