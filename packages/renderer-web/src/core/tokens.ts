// RPUI design tokens — the foundation of a three-layer design system.
//
//   Layer 1  DESIGN TOKENS    primitive palette values (this file, :root #1)
//   Layer 2  SEMANTIC TOKENS  role → primitive mapping  (this file, :root #2)
//   Layer 3  COMPONENT STYLES each component module references the tokens via
//                             var(--rp-*); see core/style.ts for assembly.
//
// Components never hard-code a color: they reference a semantic token where a
// role exists (--rp-text, --rp-primary, --rp-danger, …) or a primitive token
// otherwise (--rp-c-*, --rp-a-*). Primitives are the single source of color
// truth — change a value here and it propagates everywhere. New semantic roles
// can be added to Layer 2 over time without touching primitives.
export const tokens = `
:root {
  /* base */
  --rp-c-white: #fff;
  --rp-c-black: #000;

  /* zinc ramp */
  --rp-c-zinc-50: #fafafa;
  --rp-c-zinc-100: #f4f4f5;
  --rp-c-zinc-200: #e4e4e7;
  --rp-c-zinc-300: #d4d4d8;
  --rp-c-zinc-400: #a1a1aa;
  --rp-c-zinc-500: #71717a;
  --rp-c-zinc-900: #18181b;
  --rp-c-zinc-950: #09090b;

  /* gray ramp */
  --rp-c-gray-50: #f9fafb;
  --rp-c-gray-100: #f3f4f6;
  --rp-c-gray-200: #e5e7eb;
  --rp-c-gray-300: #d1d5db;
  --rp-c-gray-400: #9ca3af;
  --rp-c-gray-500: #6b7280;
  --rp-c-gray-600: #4b5563;
  --rp-c-gray-700: #374151;
  --rp-c-gray-800: #1f2937;
  --rp-c-gray-900: #111827;
  --rp-c-neutral-100: #f0f0f0;

  /* slate ramp */
  --rp-c-slate-50: #f8fafc;
  --rp-c-slate-400: #94a3b8;
  --rp-c-slate-600: #475569;
  --rp-c-slate-700: #334155;
  --rp-c-slate-800: #1e293b;
  --rp-c-slate-900: #0f172a;

  /* green / emerald */
  --rp-c-green-50: #f0fdf4;
  --rp-c-green-100: #dcfce7;
  --rp-c-green-200: #bbf7d0;
  --rp-c-green-300: #86efac;
  --rp-c-emerald-500: #10b981;
  --rp-c-emerald-600: #059669;
  --rp-c-green-800: #166534;

  /* amber / orange */
  --rp-c-amber-50: #fffbeb;
  --rp-c-amber-200: #fde68a;
  --rp-c-amber-500: #f59e0b;
  --rp-c-amber-600: #d97706;
  --rp-c-amber-800: #92400e;
  --rp-c-orange-100: #ffedd5;
  --rp-c-orange-800: #9a3412;

  /* red */
  --rp-c-red-50: #fef2f2;
  --rp-c-red-100: #fee2e2;
  --rp-c-red-200: #fecaca;
  --rp-c-red-300: #fca5a5;
  --rp-c-red-600: #dc2626;
  --rp-c-red-800: #991b1b;

  /* violet / pink */
  --rp-c-violet-500: #8b5cf6;
  --rp-c-violet-600: #7c3aed;
  --rp-c-pink-500: #ec4899;

  /* iOS system palette */
  --rp-c-ios-blue: #007aff;
  --rp-c-ios-green: #34c759;
  --rp-c-ios-red: #ff3b30;
  --rp-c-ios-gray: #8e8e93;
  --rp-c-ios-gray-3: #c7c7cc;
  --rp-c-ios-gray-4: #d8d8dc;
  --rp-c-ios-gray-5: #e5e5ea;
  --rp-c-ios-gray-6: #f2f2f7;
  --rp-c-ios-gray-label: #6d6d72;
  --rp-c-ios-fill: #767680;

  /* alpha / effect */
  --rp-a-black-05: rgba(0,0,0,.05);
  --rp-a-black-06: rgba(0,0,0,.06);
  --rp-a-black-08: rgba(0,0,0,.08);
  --rp-a-black-10: rgba(0,0,0,.1);
  --rp-a-black-12: rgba(0,0,0,.12);
  --rp-a-black-14: rgba(0,0,0,.14);
  --rp-a-black-15: rgba(0,0,0,.15);
  --rp-a-black-18: rgba(0,0,0,.18);
  --rp-a-black-20: rgba(0,0,0,.2);
  --rp-a-black-30: rgba(0,0,0,.3);
  --rp-a-white-60: rgba(255,255,255,.6);
  --rp-a-white-70: rgba(255,255,255,.7);
  --rp-a-white-82: rgba(255,255,255,.82);
  --rp-a-white-92: rgba(255,255,255,.92);
  --rp-a-slate-06: rgba(15,23,42,.06);
  --rp-a-slate-08: rgba(15,23,42,.08);
  --rp-a-slate-10: rgba(15,23,42,.1);
  --rp-a-slate-14: rgba(15,23,42,.14);
  --rp-a-slate-18: rgba(15,23,42,.18);
  --rp-a-red-10: rgba(220,38,38,.1);
  --rp-a-red-18: rgba(220,38,38,.18);
  --rp-a-ios-fill-12: rgba(118,118,128,.12);
  --rp-a-ios-blue-15: rgba(0,122,255,.15);
  --rp-a-ios-bar-94: rgba(249,249,249,.94);
  --rp-a-mac-bar-90: rgba(246,246,246,.9);
  --rp-a-mac-bar-85: rgba(246,246,246,.85);
}
:root {
  /* Layer 2 — semantic tokens (role → primitive) + scale tokens */
  --rp-bg:var(--rp-c-zinc-100); --rp-surface:var(--rp-c-white); --rp-surface-soft:var(--rp-c-zinc-50); --rp-text:var(--rp-c-zinc-950); --rp-muted:var(--rp-c-zinc-500); --rp-border:var(--rp-c-zinc-200); --rp-border-strong:var(--rp-c-zinc-300); --rp-primary:var(--rp-c-zinc-950); --rp-success:var(--rp-c-emerald-600); --rp-warning:var(--rp-c-amber-600); --rp-danger:var(--rp-c-red-600); --rp-purple:var(--rp-c-violet-600); --rp-radius-sm:4px; --rp-radius-md:8px; --rp-radius-lg:16px; --rp-shadow:0 8px 28px var(--rp-a-slate-08); --rp-font:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}`;
