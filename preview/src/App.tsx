import { useState, useMemo, useCallback, useEffect } from "react";
import {
  CATEGORIES,
  type CatalogCategory,
  type CatalogItem,
} from "./data/catalog";
import { ItemList } from "./components/ItemList";
import { EditorView } from "./components/EditorView";
import { TooltipProvider } from "./components/ui/tooltip";

function readURL() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get("cat");
  const item = params.get("item");
  const code = params.get("code");
  return {
    cat: cat
      ? Math.max(0, Math.min(CATEGORIES.length - 1, Number(cat) || 0))
      : 0,
    item: item || null,
    code: code === "1",
  };
}

function writeURL(cat: number, item: string | null, code: boolean) {
  const params = new URLSearchParams();
  params.set("cat", String(cat));
  if (item) params.set("item", item);
  if (code) params.set("code", "1");
  const url = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState(null, "", url);
}

export function App() {
  const initial = useMemo(readURL, []);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(initial.cat);
  const [activeItemName, setActiveItemName] = useState<string | null>(
    initial.item,
  );
  const [codeOpen, setCodeOpen] = useState(initial.code);
  const [search, setSearch] = useState("");

  const activeCategory: CatalogCategory = CATEGORIES[activeCategoryIdx];

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return activeCategory.items;
    return activeCategory.items.filter((item) =>
      item.name.toLowerCase().includes(q),
    );
  }, [activeCategory, search]);

  const activeItem: CatalogItem | null = useMemo(() => {
    if (activeItemName) {
      const found = activeCategory.items.find((i) => i.name === activeItemName);
      if (found) return found;
    }
    return filteredItems[0] ?? activeCategory.items[0] ?? null;
  }, [activeItemName, activeCategory, filteredItems]);

  // Persist to URL whenever state changes
  useEffect(() => {
    writeURL(activeCategoryIdx, activeItem?.name ?? null, codeOpen);
  }, [activeCategoryIdx, activeItem?.name, codeOpen]);

  const handleSelectCategory = useCallback((idx: number) => {
    setActiveCategoryIdx(idx);
    setActiveItemName(null);
    setSearch("");
  }, []);

  const handleSelectItem = useCallback((name: string) => {
    setActiveItemName(name);
  }, []);

  const handleCodeOpenChange = useCallback((open: boolean) => {
    setCodeOpen(open);
  }, []);

  return (
    <TooltipProvider delayDuration={400}>
      <div
        className="grid h-screen bg-slate-50"
        style={{ gridTemplateColumns: "240px 1fr" }}
      >
        <ItemList
          categories={CATEGORIES}
          activeCategoryIdx={activeCategoryIdx}
          onSelectCategory={handleSelectCategory}
          items={filteredItems}
          activeName={activeItem?.name ?? null}
          onSelect={handleSelectItem}
          search={search}
          onSearchChange={setSearch}
        />
        <EditorView
          item={activeItem}
          categoryName={activeCategory.name}
          codeOpen={codeOpen}
          onCodeOpenChange={handleCodeOpenChange}
        />
      </div>
    </TooltipProvider>
  );
}
