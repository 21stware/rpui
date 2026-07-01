import { memo, useMemo } from "react";
import type { CatalogCategory, CatalogItem } from "../data/catalog";
import { Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  categories: CatalogCategory[];
  activeCategoryIdx: number;
  onSelectCategory: (idx: number) => void;
  items: CatalogItem[];
  activeName: string | null;
  onSelect: (name: string) => void;
  search: string;
  onSearchChange: (v: string) => void;
}

export const ItemList = memo(function ItemList({
  categories,
  activeCategoryIdx,
  onSelectCategory,
  items,
  activeName,
  onSelect,
  search,
  onSearchChange,
}: Props) {
  const grouped = useMemo(() => {
    const map = new Map<string, CatalogItem[]>();
    for (const item of items) {
      const sg = item.subGroup ?? "Other";
      if (!map.has(sg)) map.set(sg, []);
      map.get(sg)!.push(item);
    }
    return [...map.entries()];
  }, [items]);

  return (
    <aside className="flex min-h-0 flex-col border-r border-slate-200 bg-white">
      {/* ── Category select ── */}
      <div className="shrink-0 border-b border-slate-100 p-3">
        <div className="relative">
          <select
            value={activeCategoryIdx}
            onChange={(e) => onSelectCategory(Number(e.target.value))}
            className="h-8 w-full cursor-pointer appearance-none rounded-md border border-slate-200 bg-white pl-3 pr-8 text-[13px] font-medium text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          >
            {categories.map((cat, idx) => (
              <option key={cat.name} value={idx}>
                {cat.name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* ── Search ── */}
      <div className="shrink-0 px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-[13px] text-slate-800 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      {/* ── Item list ── */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-2">
        {!items.length ? (
          <div className="py-10 text-center text-[13px] text-slate-400">
            No matching items
          </div>
        ) : (
          grouped.map(([groupName, groupItems]) => (
            <div key={groupName} className="mb-1">
              <div className="px-2 pb-1 pt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {groupName}
              </div>
              {groupItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onSelect(item.name)}
                  className={cn(
                    "w-full rounded-md px-2.5 py-1.5 text-left font-mono text-[12px] text-slate-600 transition-colors",
                    "hover:bg-slate-100",
                    item.name === activeName &&
                      "bg-indigo-50 font-semibold text-indigo-600 hover:bg-indigo-50",
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          ))
        )}
      </div>
    </aside>
  );
});
