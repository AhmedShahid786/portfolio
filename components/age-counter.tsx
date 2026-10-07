"use client";

import { useEffect, useState } from "react";

const BIRTHDATE = new Date("2007-01-18T00:00:00+05:00");
const MS_PER_YEAR = 365.25 * 24 * 60 * 60 * 1000;

export function AgeCounter() {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const updateAge = () => {
      setAge((Date.now() - BIRTHDATE.getTime()) / MS_PER_YEAR);
    };

    updateAge();
    const interval = setInterval(updateAge, 50);
    return () => clearInterval(interval);
  }, []);

  if (age === null) return null;

  return (
    <p className="text-secondary flex flex-col items-end font-mono text-sm tabular-nums">
      <span>
        <span className="text-muted">~ </span>
        {age.toFixed(8)}
      </span>
      <span className="text-muted">years</span>
    </p>
  );
}
