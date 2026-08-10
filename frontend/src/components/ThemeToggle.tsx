import { useEffect, useState } from "react";

const KEY = "we-theme-day";

export function ThemeToggle() {
  const [day, setDay] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved === "1") setDay(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("day", day);
    localStorage.setItem(KEY, day ? "1" : "0");
  }, [day]);

  return (
    <button
      type="button"
      onClick={() => setDay((d) => !d)}
      className="fixed top-24 right-6 z-40 flex h-9 w-9 items-center justify-center border border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm transition-colors hover:border-[var(--gold)]/40 md:top-28 md:right-8"
      aria-label="Alternar tema"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
        {day ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        ) : (
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        )}
      </svg>
    </button>
  );
}
