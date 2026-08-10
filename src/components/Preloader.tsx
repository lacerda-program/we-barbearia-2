import { useEffect, useState } from "react";

export function Preloader({ onDone }: { onDone: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 500);
    }, 700);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--onyx)] transition-opacity duration-500"
      style={{ opacity: exiting ? 0 : 1, pointerEvents: exiting ? "none" : "auto" }}
    >
      <div className="font-display text-2xl font-light tracking-[0.5em] text-[var(--ivory)]">
        WE
      </div>
    </div>
  );
}
