"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenCheck,
  ClipboardList,
  FileText,
  Home,
  Info,
  Menu,
  MessageSquareText,
  MonitorPlay,
  Scale,
  X
} from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  { href: "/", label: "Acasă", icon: Home },
  { href: "/recovery-map", label: "Recovery Map", icon: BookOpenCheck },
  { href: "/journal", label: "Jurnal", icon: ClipboardList },
  { href: "/teach-back", label: "Teach-back", icon: MessageSquareText },
  { href: "/work-vs-sport", label: "Muncă vs sport", icon: Scale },
  { href: "/brief", label: "Brief", icon: FileText },
  { href: "/about", label: "Despre", icon: Info },
  { href: "/jury", label: "Jury Mode", icon: MonitorPlay }
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="no-print sticky top-0 z-40 max-w-full border-b border-ink/10 bg-surface/92 shadow-inset backdrop-blur-xl">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 min-w-0 items-center justify-between gap-3">
          <Link
            className="focus-ring premium-transition group flex min-w-0 flex-1 items-center gap-3 rounded-panel px-1 py-2 text-ink"
            href="/"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-panel bg-ink text-white shadow-panel group-hover:bg-clinical-deep">
              <BookOpenCheck aria-hidden="true" size={21} />
            </span>
            <span className="min-w-0 overflow-hidden">
              <span className="block truncate text-base font-black leading-5">
                SpineBridge Live
              </span>
              <span className="block truncate text-xs font-bold uppercase text-muted">
                educație și dialog clinic
              </span>
            </span>
          </Link>

          <nav aria-label="Navigație principală" className="hidden items-center gap-1 xl:flex">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  className={cn(
                    "focus-ring premium-transition inline-flex min-h-10 items-center gap-2 rounded-panel border px-3 py-2 text-sm font-black",
                    active
                      ? "border-clinical/25 bg-clinical/10 text-clinical"
                      : "border-transparent text-muted hover:border-ink/10 hover:bg-white hover:text-ink"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <Icon aria-hidden="true" size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            aria-expanded={open}
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            className="focus-ring premium-transition inline-flex min-h-11 shrink-0 items-center justify-center rounded-panel border border-ink/10 bg-white px-3 text-ink shadow-panel hover:border-clinical/30 xl:hidden"
            onClick={() => setOpen((current) => !current)}
            type="button"
          >
            {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
          </button>
        </div>

        {open ? (
          <nav aria-label="Navigație mobilă" className="grid gap-2 border-t border-ink/10 py-3 xl:hidden">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  className={cn(
                    "focus-ring premium-transition flex min-h-12 items-center gap-3 rounded-panel border px-3 py-2 text-sm font-black",
                    active
                      ? "border-clinical/30 bg-clinical/10 text-clinical"
                      : "border-ink/10 bg-white text-ink hover:border-clinical/30"
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-panel",
                      active ? "bg-clinical text-white" : "bg-paper text-muted"
                    )}
                  >
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
