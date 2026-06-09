"use client";

import {
  useMemo,
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  amount?: number; 
}

export default function TextScramble({
  text,
  className = "",
  amount = 0.5,
}: TextScrambleProps) {
  const finalChars = useMemo(
    () => text.split("").map((c) => (c === " " ? "\u00A0" : c)),
    [text],
  );

  const finalCharsRef = useRef<string[]>([]);
  useEffect(() => {
    finalCharsRef.current = finalChars;
  }, [finalChars]);

  const [display, setDisplay] = useState<string[]>(finalChars);
  const [widths, setWidths] = useState<number[]>([]);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  /* ───────── “in-view” detection ───────── */
  const isInView = useInView(h1Ref, { once: true, amount });

  /* ───────── scramble logic ───────── */
  const intervalRef = useRef<number | null>(null);
  const iterationRef = useRef(0);
  const letters = useMemo(
    () => "XYZ{!@#$%^&*(01)}".split(""),
    [],
  );

  const scramble = useCallback(() => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
    iterationRef.current = -7;
    const hiddenCount = 1;

    intervalRef.current = window.setInterval(() => {
      setDisplay(() =>
        finalCharsRef.current.map((orig, i) => {
          if (orig === "\u00A0") return "\u00A0";
          if (
            i >= text.length - hiddenCount &&
            iterationRef.current < text.length
          ) {
            return "\u00A0";
          }
          if (i < iterationRef.current) return finalCharsRef.current[i];
          return letters[Math.floor(Math.random() * letters.length)];
        }),
      );

      iterationRef.current++;
      if (iterationRef.current >= text.length) {
        clearInterval(intervalRef.current!);
        setDisplay(finalCharsRef.current);
      }
    }, 40);
  }, [text, letters]);


  useLayoutEffect(() => {
    if (!h1Ref.current) return;
    const spans = Array.from(
      h1Ref.current.querySelectorAll("span"),
    ) as HTMLElement[];
    setWidths(spans.map((span) => span.offsetWidth));
  }, [text]);


  useEffect(() => {
    if (isInView) scramble();
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [isInView, scramble]);

  return (
    <h1 ref={h1Ref} className={className} suppressHydrationWarning>
      {display.map((char, i) => (
        <span
          key={i}
          className="inline-block"
          onMouseEnter={finalChars[i] !== "\u00A0" ? scramble : undefined}
          style={{
            width: widths[i] ? `${widths[i]}px` : undefined,
            color: char === finalChars[i] ? "#ffffff" : "#ED1B2F",
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
