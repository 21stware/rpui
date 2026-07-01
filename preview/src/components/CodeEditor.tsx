import { memo, useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  indentOnInput,
} from "@codemirror/language";
import { autocompletion, closeBrackets } from "@codemirror/autocomplete";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { xml } from "@codemirror/lang-xml";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const extensions = [
  lineNumbers(),
  EditorView.lineWrapping,
  history(),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  indentOnInput(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  xml(),
  keymap.of([...defaultKeymap, ...historyKeymap, ...searchKeymap]),
  EditorView.theme({
    "&": {
      background: "#ffffff",
      color: "#24292f",
    },
    ".cm-scroller": {
      background: "#ffffff",
    },
    ".cm-gutters": {
      border: "none",
      borderRight: "1px solid #e1e4e8",
      background: "#f6f8fa",
      color: "#636e7b",
    },
    ".cm-activeLineGutter": {
      background: "#f0f3f6",
    },
    ".cm-activeLine": {
      background: "#f0f3f680",
    },
    ".cm-content": {
      padding: "16px 0",
      caretColor: "#24292f",
    },
    ".cm-cursor": {
      borderLeftColor: "#24292f",
    },
    ".cm-selectionBackground": {
      background: "#b3d7ff !important",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 12px 0 8px",
      minWidth: "40px",
    },
  }),
];

export const CodeEditor = memo(function CodeEditor({ value, onChange }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!hostRef.current) return;
    const state = EditorState.create({
      doc: value,
      extensions: [
        ...extensions,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });
    const view = new EditorView({ state, parent: hostRef.current });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div ref={hostRef} className="min-h-0 flex-1 overflow-hidden" />;
});
