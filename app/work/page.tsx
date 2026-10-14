import type { Metadata } from "next";

import { Work } from "@/components/work";

export const metadata: Metadata = {
  title: "Work — Ahmed Raza",
};

export default function WorkPage() {
  return <Work />;
}
