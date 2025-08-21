"use client";

import Link from "next/link";

type Crumb = {
  label: string;
  href?: string; // optional for current page
};

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="text-sm text-gray-600" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center space-x-2">
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-[#063970] font-medium transition"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span className="text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
