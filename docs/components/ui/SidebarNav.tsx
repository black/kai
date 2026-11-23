"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  items: { name: string; title: string }[];
}

const SidebarNav = ({ items }: Props) => {
  // Strip the trailing slash added by `trailingSlash: true`.
  const pathname = usePathname().replace(/(.)\/$/, "$1");

  return (
    <nav className="space-y-1">
      {items.map((item, index) => {
        const href = `/components/${item.name}`;
        const active = pathname === href || (pathname === "/" && index === 0);

        return (
          <Link
            key={item.name}
            href={href}
            className={`block w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
              active
                ? "bg-neutral-100 font-medium text-neutral-900"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default SidebarNav;
