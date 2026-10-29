import banner from "@/src/assets/banners/sit-lms.jpg";
import logo from "@/src/assets/logos/sit-lms.png";

import type { Product } from "./types";

export const sitLms = {
  slug: "sit-lms",
  name: "Saylani IT LMS",
  company: "Saylani Welfare International Trust",
  period: "February 2025 – Present",
  summary:
    "A learning ecosystem built for Saylani IT, connecting over 600K students across web and mobile. Shaped around what it actually feels like to be a student, from the excitement of starting something new to the discipline of showing up, the frustration of getting stuck, and the small wins that make it worthwhile. A place to learn from home, find answers when things don't make sense, build something with classmates, or put months of learning to the test at a hackathon. With mentors to learn from and people to turn to when things get difficult, from the first day to graduation.",
  banner,
  logo,
  goal: [
    "When I joined Saylani IT, they were already teaching thousands of students across Pakistan. Their courses were getting plenty of attention on social media, and people genuinely wanted to learn. But scrolling through the comments, you'd see the same questions again and again. Where can I apply? Which courses are available? Who do I contact? People were interested, but getting even the most basic information was unnecessarily difficult.",
    "Almost everything happened offline. Students had to visit campuses, fill out forms, get documents printed and verified, and depend on staff for guidance. With thousands of people trying to enroll, there was only so much the staff could handle. And once someone got admitted, keeping track of their attendance, progress, or even whether they completed the course was another challenge. Most of it lived on paper or in spreadsheets, with no reliable way to follow a student's journey.",
    "We started with something fairly simple: a website where students could explore courses, get the information they needed, and enroll without visiting a campus. It removed a lot of the friction that had been keeping interested students from taking that first step.",
    "The response was far bigger than we expected. Thousands of students started enrolling online, and it became clear that there was a much bigger opportunity here.",
    "Getting students enrolled was only the beginning. What happened after that? How would they keep up with their classes, know where they stood, practice what they learned, or find help when they got stuck? And how could we give students outside our campuses the same opportunities as those attending in person?",
    "Those questions gradually shaped what we built next.",
    "We introduced online cohorts so students could complete entire courses from home. We brought their learning activities, progress, and classmates into one place, giving them a way to stay involved with their education even outside the classroom.",
    "The idea was to make the experience feel less isolated. Whether a student was attending a physical campus or learning from a small town hundreds of kilometers away, they should have somewhere to ask questions, see how far they've come, and feel connected to the people learning alongside them.",
  ],
  stack: [
    { name: "React", src: "/icons/react.svg" },
    { name: "React Native", src: "/icons/react.svg" },
    { name: "Node.js", src: "/icons/nodedotjs.svg" },
    { name: "Express.js", src: "/icons/express.svg" },
    { name: "MongoDB", src: "/icons/mongodb.svg" },
    { name: "Docker", src: "/icons/docker.svg" },
    { name: "AWS Lambda", src: "/images/tech/aws.svg" },
    { name: "AWS S3", src: "/images/tech/aws.svg" },
    { name: "AWS CloudFront", src: "/images/tech/aws.svg" },
    { name: "Google Cloud Run" },
    { name: "Cloudflare" },
    { name: "Prometheus", src: "/icons/prometheus.svg" },
    { name: "Grafana", src: "/icons/grafana.svg" },
    { name: "Sentry", src: "/icons/sentry.svg" },
    { name: "PostHog", src: "/icons/posthog.svg" },
    { name: "Firebase Analytics", src: "/icons/firebase.svg" },
    { name: "Firebase Crashlytics", src: "/icons/firebase.svg" },
  ],
  contribution: [
    {
      title: "Growing Into the Role",
      paragraphs: [
        "I joined as a software engineer, working alongside our tech lead and other developers. But this product became personal to me rather quickly.",
        "I had been a Saylani IT student myself, so I knew what it felt like to be on the other side. Seeing students use something I had worked on, hearing what they liked, what frustrated them, and what they wished existed, made me look at the product differently.",
        "I found myself thinking about it even when I wasn't working on an assigned task. I'd suggest features, question an existing approach, improve something that felt unnecessarily complicated, or sit with the designer to figure out how we could make an interaction feel better. Sometimes that meant writing code, sometimes it meant spending an afternoon understanding a problem before deciding what to build.",
        "When our tech lead eventually left, he recommended me to take over. I became the engineering lead, responsible for the technical direction of the product and a team of two developers and a designer.",
        "My day-to-day changed, but I stayed close to the code. Alongside building features, I was now reviewing implementations, discussing architecture, helping teammates work through decisions, and figuring out what we should tackle next.",
      ],
    },
    {
      title: "Building With What We Had",
      paragraphs: [
        "I built the React frontend and owned most of the backend development and architecture, which now supports over a million API requests every day.",
        "One of the more interesting parts of working on this product was how little infrastructure we had in the beginning.",
        "At one point, we were running the backend on a small cloud instance with roughly 512 MB of RAM and a single CPU core. Thousands of students were using the platform, but we didn't have the budget to keep adding compute whenever things got slow.",
        "So we had to be careful about what we asked the server to do.",
        "I spent time optimizing endpoints, reducing unnecessary requests, and adding caching where it made sense. We tried to get as much as possible out of the resources we already had before thinking about increasing them.",
        "As more students joined, the database brought its own set of problems. Some administrative queries became painfully slow as collections grew. I worked on improving query patterns, adding appropriate MongoDB indexes, and making frequently accessed data easier to retrieve.",
        "We also had to revisit decisions we'd made much earlier, when the system was smaller and we were moving quickly. Some of those shortcuts eventually became bottlenecks. Fixing them meant changing parts of the architecture and migrating millions of database records while keeping the platform available to students.",
        "It taught me that shipping quickly and building something maintainable aren't always competing goals, but you do have to know when a shortcut has stopped being useful.",
      ],
    },
    {
      title: "Infrastructure & Observability",
      paragraphs: [
        "Our deployment setup evolved quite a bit as the product grew.",
        "We initially used Vercel for deployment, then moved workloads to Google Cloud Run. I worked on that migration and established CI/CD workflows with OpenID Connect authentication to automate deployments.",
        "Eventually, course-fee collections made it possible for us to afford dedicated hosting. We moved to VPS-based infrastructure, where I introduced Docker-based blue-green deployments so we could release changes without taking the application offline.",
        "Having our own infrastructure also gave me the opportunity to improve something I'd wanted for a while: understanding what was happening inside our systems.",
        "I decided to self-host Prometheus and Grafana instead of depending entirely on managed monitoring services. We could now observe server resource usage, track application behavior, and investigate performance issues without adding substantial recurring monitoring costs.",
        "Alongside that, I integrated tools such as Sentry and PostHog to better understand production errors and how people were interacting with the product.",
        "I also used AWS Lambda for occasional jobs that didn't need to consume resources on our main application server.",
        "None of these decisions were about making the architecture more complicated. We had a real product, a limited budget, and thousands of people depending on it. I wanted an infrastructure setup we could understand, maintain, and afford.",
      ],
    },
    {
      title: "Taking the Experience to Mobile",
      paragraphs: [
        "As the platform grew, one request kept coming up in student feedback: they wanted an app.",
        "It made sense. Students were already using the LMS regularly, and opening a browser every time they wanted to check something wasn't the experience they were looking for. They wanted their learning space right on their phones.",
        "The interesting part was that I had never built a mobile application before.",
        "I knew React, but React Native was new to me. So I started learning it and built the mobile application from scratch, figuring things out as I went.",
        "Three months after launch, the app crossed 10,000 downloads.",
        "I'm still working on it, improving performance, refining interactions, and adding features that make the mobile experience feel like something built for a phone rather than a smaller version of the website.",
      ],
    },
    {
      title: "Staying Close to the Students",
      paragraphs: [
        "One decision I'm particularly glad I made was introducing feedback collection directly inside the LMS.",
        "I didn't want us to build features based only on what we thought students needed. I wanted to hear it from them.",
        "We began reviewing feedback regularly, looking for patterns in what students were asking for and where they were struggling. When the same request kept appearing, we'd discuss it, decide how to approach it, and work it into our development priorities.",
        "I also made a habit of visiting classrooms, talking to instructors, and attending hackathons where students were using the platform. Sometimes I'd simply ask someone to show me how they used a particular feature. Watching them navigate it often told me more than a bug report could.",
        "Those conversations influenced both the features we built and the smaller decisions we made about how the product should work.",
        "I worked closely with our designer, often going back and forth on interactions that technically worked but didn't feel quite right. I brought the same attention to code reviews, discussing not only whether something worked, but whether the approach would still make sense as the product grew.",
        "I liked being involved in both sides of the work. Understanding how the backend behaved under load mattered to me just as much as understanding why a student was struggling with something on the screen.",
      ],
    },
  ],
  impact: [
    {
      highlight: "600K+ users",
      text: "have joined the platform across web and mobile.",
    },
    {
      highlight: "30K+ students actively learn every day",
      text: ", with their attendance, activities, and progress tracked digitally.",
    },
    {
      highlight: "5K–10K students learn entirely online",
      text: ", completing courses without needing to attend a physical campus.",
    },
    {
      highlight: "1M+ API requests daily",
      text: ", supported by an architecture that grew from resource-constrained cloud hosting to dedicated infrastructure.",
    },
    {
      highlight: "10K+ mobile app downloads",
      text: "within three months of launch.",
    },
    {
      highlight: "Approximately $2M in annualized course-fee collections",
      text: "processed through the platform.",
    },
    {
      highlight: "Millions of database records migrated",
      text: ", addressing earlier architectural limitations without noticeable disruption to students.",
    },
    {
      highlight: "Automated deployments and self-hosted observability",
      text: ", making releases more predictable and production systems easier to monitor without relying on expensive managed services.",
    },
  ],
  reflection: [
    "The part that stays with me isn't any single number. It's knowing that somewhere, a student is checking how far they've come, submitting something they've spent hours building, or getting help from a classmate they've never met in person.",
    "I used to be one of those students. Now I get to help build the experience they learn through.",
  ],
} satisfies Product;
