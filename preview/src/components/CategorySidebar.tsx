import { memo } from "react";
import type { CatalogCategory } from "../data/catalog";

interface Props {
  categories: CatalogCategory[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}

export const CategorySidebar = memo(function CategorySidebar({
  categories,
  activeIdx,
  onSelect,
}: Props) {
  return (
    <aside className="cat-sidebar">
      <nav className="cat-nav">
        {categories.map((cat, idx) => (
          <button
            key={cat.name}
            className={`cat-item${idx === activeIdx ? " active" : ""}`}
            onClick={() => onSelect(idx)}
          >
            <span className="cat-name">{cat.name}</span>
            <span className="cat-count">{cat.items.length}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
});
