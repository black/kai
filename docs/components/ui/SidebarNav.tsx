"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  items: { name: string; title: string }[];
  /** "vertical" for the desktop sidebar, "horizontal" for the mobile strip. */
  orientation?: "vertical" | "horizontal";
}

const pad = (n: number) => String(n).padStart(2, "0");

const SidebarNav = ({ items, orientation = "vertical" }: Props) => {
  // Strip the trailing slash added by `trailingSlash: true`.
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const isActive = (name: string) => pathname === `/components/${name}`;

  if (orientation === "horizontal") {
    return (
      <nav className="flex gap-1 overflow-x-auto px-4 py-2 sm:px-6">
        {items.map((item, i) => (
          <Link
            key={item.name}
            href={`/components/${item.name}`}
            className={`flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors ${
              isActive(item.name) ? "bg-night text-night-ink" : "text-ink hover:bg-card"
            }`}
          >
            <span className="font-mono text-xs opacity-60">{pad(i + 1)}</span>
            {item.title}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className="border-t border-ink pt-4">
      <p className="eyebrow mb-2 px-2.5">Components</p>
      <ul className="space-y-0.5">
        {items.map((item, i) => {
          const active = isActive(item.name);
          return (
            <li key={item.name}>
              <Link
                href={`/components/${item.name}`}
                className={`flex items-baseline gap-4 rounded-md px-2.5 py-2 text-[15px] leading-snug transition-colors ${
                  active ? "bg-night text-night-ink" : "text-ink hover:bg-card"
                }`}
              >
                <span
                  className={`font-mono text-xs ${active ? "text-night-muted" : "text-muted"}`}
                >
                  {pad(i + 1)}
                </span>
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SidebarNav;
