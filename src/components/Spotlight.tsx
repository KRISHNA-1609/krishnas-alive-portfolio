import { useEffect, useRef } from "react";

/** Drop inside any container with `group` + `relative` to add a soft cursor spotlight. */
const Spotlight = ({ color = "180 100% 50%" }: { color?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--x", `${e.clientX - r.left}px`);
      el.style.setProperty("--y", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      style={{
        background: `radial-gradient(280px circle at var(--x, 50%) var(--y, 50%), hsl(${color} / 0.15), transparent 60%)`,
      }}
    />
  );
};

export default Spotlight;
