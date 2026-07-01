import { COMPONENTS } from "../../components.js";
import { SHADCN } from "../../shadcn.js";

export interface CatalogItem {
  name: string;
  description?: string;
  html: string;
  attrs?: [string, string][];
  subGroup?: string;
}

export interface CatalogCategory {
  name: string;
  items: CatalogItem[];
}

const CANVAS_ITEMS: CatalogItem[] = [
  {
    name: "annotation",
    subGroup: "Canvas / Annotation",
    description: "Numbered annotation block linked to a pin on the canvas.",
    html: '<annotation id="1" label="Auto-save Strategy"><doc-paragraph>To prevent data loss, the system deploys the following background save mechanisms:</doc-paragraph><doc-unordered-list><doc-list-item><bold>Save frequency:</bold> Every <code-inline>30s</code-inline> after content changes, a silent background save is triggered.</doc-list-item><doc-list-item><bold>Exit interception:</bold> Detecting tab close or page switch triggers a forced local save.</doc-list-item><doc-list-item><bold>Network error handling:</bold> Falls back to <code-inline>LocalStorage</code-inline> when offline, auto-syncs when reconnected.</doc-list-item></doc-unordered-list></annotation>',
    attrs: [
      ["id", "Pin number, corresponds to data-pin"],
      ["label", "Title"],
    ],
  },
  {
    name: "annotation-global",
    subGroup: "Canvas / Annotation",
    description: "Global annotation without a pin number.",
    html: '<annotation-global label="Global Permission Matrix"><doc-unordered-list><doc-list-item><bold>Visitor:</bold> Read-only, all write actions hidden.</doc-list-item><doc-list-item><bold>Member:</bold> Can create and edit, cannot delete.</doc-list-item><doc-list-item><bold>Admin:</bold> Full permissions, including delete and member management.</doc-list-item></doc-unordered-list></annotation-global>',
    attrs: [["label", "Title (no number, no pin)"]],
  },
  {
    name: "enum",
    subGroup: "Canvas / Annotation",
    description: "Enumeration of states for a field or element.",
    html: '<annotation id="3" label="Username Field States"><enum><enum-item label="Default" description="Empty input, placeholder visible"></enum-item><enum-item label="Typing" description="1-2 chars, no validation triggered"></enum-item><enum-item label="Valid" description="Green checkmark icon"></enum-item><enum-item label="Taken" description="Server 409, red error message"></enum-item></enum></annotation>',
    attrs: [["(child) enum-item", "label / description"]],
  },
];

const BASIC_ITEMS: CatalogItem[] = [
  ...COMPONENTS.map((c) => ({
    name: c.name,
    html: c.html,
    attrs: c.attrs,
    subGroup: c.group,
  })),
  ...CANVAS_ITEMS,
];

const SHADCN_ITEMS: CatalogItem[] = SHADCN.map((s) => ({
  name: s.title,
  html: s.description
    ? `<col><doc-paragraph>${s.description}</doc-paragraph>${s.html}</col>`
    : s.html,
  subGroup: "Composed",
}));

export const CATEGORIES: CatalogCategory[] = [
  { name: "Primitives", items: BASIC_ITEMS },
  { name: "ShadCN", items: SHADCN_ITEMS },
];

/** Pretty-print a single-line HTML/RPML string with indentation. */
export function formatHtml(html: string): string {
  const INDENT = "  ";
  const voidTags = new Set(["br", "hr", "img", "input", "meta", "link"]);
  let depth = 0;
  let result = "";

  const tokenRe = /(<\/?[a-zA-Z][^>]*\/?>|[^<]+)/g;
  let m: RegExpExecArray | null;

  while ((m = tokenRe.exec(html)) !== null) {
    const tok = m[0].trim();
    if (!tok) continue;

    if (tok.startsWith("</")) {
      // closing tag
      depth = Math.max(0, depth - 1);
      result += INDENT.repeat(depth) + tok + "\n";
    } else if (tok.startsWith("<")) {
      const tagMatch = tok.match(/^<([a-zA-Z][^\s/>]*)/);
      const tag = tagMatch ? tagMatch[1].toLowerCase() : "";
      const selfClosing = tok.endsWith("/>") || voidTags.has(tag);
      result += INDENT.repeat(depth) + tok + "\n";
      if (!selfClosing) depth++;
    } else {
      // text node
      result += INDENT.repeat(depth) + tok + "\n";
    }
  }

  return result.trimEnd();
}

export function buildDocRpml(item: CatalogItem, categoryName: string): string {
  const lines: string[] = ["<div>"];

  // ── header ──
  lines.push(`  <doc-heading>${item.name}</doc-heading>`);
  lines.push(`  <tag>${categoryName}</tag>`);
  if (item.subGroup) {
    lines.push(`  <tag>${item.subGroup}</tag>`);
  }
  lines.push(`  <space></space>`);

  if (item.description) {
    lines.push(`  <doc-paragraph>${item.description}</doc-paragraph>`);
  }

  // ── horizontal body: left col (attrs) | divider | right col (UI) ──
  lines.push(`  <row>`);

  // left: attributes
  lines.push(`    <col gap="8" padding="0">`);
  if (item.attrs && item.attrs.length > 0) {
    lines.push(`      <doc-heading level="2">Attributes</doc-heading>`);
    lines.push(`      <key-value>`);
    for (const [k, v] of item.attrs) {
      lines.push(`        <kv-row label="${k}" value="${v}"></kv-row>`);
    }
    lines.push(`      </key-value>`);
  } else {
    lines.push(`      <doc-paragraph>No attributes.</doc-paragraph>`);
  }
  lines.push(`    </col>`);

  // vertical divider
  lines.push(`    <divider vertical></divider>`);

  // right: UI preview
  lines.push(`    <col>`);
  const indentedHtml = item.html
    .split("\n")
    .map((l) => `      ${l}`)
    .join("\n");
  lines.push(indentedHtml);
  lines.push(`    </col>`);

  lines.push(`  </row>`);

  lines.push("</div>");
  return lines.join("\n");
}
