// Runtime stylesheet assembler.
//
// RPUI follows a three-layer design system, and this file is the seam that
// assembles all three into the single global stylesheet the runtime injects:
//
//   1. design + semantic tokens  → core/tokens.ts        (`var(--rp-*)` values)
//   2. component styles          → each component module  (co-located with its
//                                   custom-element class, e.g. controlsStyle in
//                                   primitives/controls.ts)
//   3. integration rules         → core/integration.ts    (cross-component
//                                   relationships owned by no single component)
//
// Each component module owns its own CSS next to its behavior, so a component
// can be read, edited, and reasoned about in one place. This file only decides
// ORDER — which matters because the runtime uses light DOM with global
// selectors, so cascade position is significant (see core/integration.ts for
// why reset/early rules precede components and late overrides follow them).
//
// Assembly is LAZY (inside injectStyle, on first call) on purpose: component
// modules import injectStyle from here while this file imports their style
// consts back. Assembling at module-eval time would read a not-yet-initialized
// segment during that import cycle; deferring to first connectedCallback —
// long after every module has finished loading — avoids it entirely.

import { tokens } from "./tokens";
import {
  resetStyle,
  integrationEarlyStyle,
  integrationLateStyle,
} from "./integration";
import { pageStyle } from "../canvas/page";
import { mainViewStyle } from "../canvas/main-view";
import { annotationStyle } from "../canvas/annotation";
import { layoutStyle } from "../primitives/layout";
import { controlsStyle } from "../primitives/controls";
import { navigationStyle } from "../primitives/navigation";
import { dataDisplayStyle } from "../primitives/data-display";
import { iosStyle } from "../primitives/ios";
import { agentStyle } from "../primitives/agent";
import { chartStyle } from "../primitives/chart";
import { diagramStyle } from "../primitives/diagram";
import { docStyle } from "../primitives/doc";
import { shadcnStyle } from "../primitives/shadcn";

export const RPUI_STYLE_ID = "rpui-runtime-style";

// Emission order. Tokens first (so every `var(--rp-*)` resolves), then reset and
// the low-specificity early base, then component segments in the original
// top-to-bottom flow, then the late container→child overrides last so they win.
function assemble(): string {
  return [
    tokens,
    resetStyle,
    integrationEarlyStyle,
    pageStyle,
    annotationStyle,
    mainViewStyle,
    layoutStyle,
    controlsStyle,
    navigationStyle,
    dataDisplayStyle,
    iosStyle,
    agentStyle,
    chartStyle,
    diagramStyle,
    docStyle,
    shadcnStyle,
    integrationLateStyle,
  ].join("\n");
}

let assembled: string | null = null;
/** The fully assembled runtime CSS. Memoized; safe to call repeatedly. */
export function assembleStyle(): string {
  if (assembled === null) assembled = assemble();
  return assembled;
}

export function injectStyle() {
  if (document.getElementById(RPUI_STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = RPUI_STYLE_ID;
  el.textContent = assembleStyle();
  document.head.appendChild(el);
}
