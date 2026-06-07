import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function useScramble(target: string, trigger: boolean, duration = 900) {
  const [output, setOutput] = useState(target);
  const frame = useRef(0);
  const raf = useRef<number>();

  useEffect(() => {
    if (!trigger) return;
    cancelAnimationFrame(raf.current!);
    const startTime = performance.now();
    const from = output;
    const to = target;
    const length = Math.max(from.length, to.length);
    const queue = Array.from({ length }, (_, i) => {
      const fromChar = from[i] || "";
      const toChar = to[i] || "";
      const start = Math.floor(Math.random() * (duration * 0.4));
      const end = start + Math.floor(Math.random() * (duration * 0.6));
      return { fromChar, toChar, start, end, char: "" };
    });

    const update = (now: number) => {
      const elapsed = now - startTime;
      let complete = 0;
      const out = queue
        .map((q) => {
          if (elapsed >= q.end) { complete++; return q.toChar; }
          if (elapsed >= q.start) {
            if (!q.char || Math.random() < 0.28) q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
            return q.char;
          }
          return q.fromChar;
        })
        .join("");
      setOutput(out);
      if (complete < queue.length) raf.current = requestAnimationFrame(update);
    };
    raf.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, target]);

  return output;
}
