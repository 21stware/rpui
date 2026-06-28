import { injectStyle } from '../core/style';
import { attr, csv, escapeHtml, intAttr } from '../core/dom';
import { icon } from '../core/icons';

// agent / conversational: component styles, assembled into the global runtime
// stylesheet by core/style.ts. References design tokens via var(--rp-*).
export const agentStyle = `
/* --- agent / conversational UI (Codex-style: single column, de-bubbled) --- */
chat-el, chat-el { display:flex; flex-direction:column; gap:24px; width:fit-content; min-width:520px; max-width:680px; }
user-message, user-message, agent-message, agent-message { display:block; }
.rp-msg-role { font-size:12px; font-weight:700; color:var(--rp-c-gray-400); letter-spacing:.02em; margin:0 0 6px; }
.rp-msg-content { display:flex; flex-direction:column; gap:12px; font-size:14px; line-height:1.7; color:var(--rp-c-gray-800); }
user-message .rp-msg-content, user-message .rp-msg-content { color:var(--rp-c-gray-900); }
system-message, system-message { display:flex; justify-content:center; }
.rp-sysmsg-line { padding:3px 12px; border-radius:999px; background:var(--rp-c-gray-100); color:var(--rp-c-gray-500); font-size:12px; }
tool-call, tool-call { display:block; width:fit-content; min-width:280px; max-width:600px; }
.rp-tool-head { display:flex; align-items:center; gap:8px; font-size:13px; color:var(--rp-c-gray-500); }
.rp-tool-glyph { display:inline-flex; }
.rp-tool-glyph.done { color:var(--rp-success); }
.rp-tool-glyph.running { color:var(--rp-primary); }
.rp-tool-glyph.error { color:var(--rp-danger); }
.rp-tool-name { font-family:ui-monospace,Menlo,monospace; font-weight:650; color:var(--rp-c-gray-700); }
.rp-tool-tag { padding:1px 6px; border-radius:4px; background:var(--rp-c-zinc-100); color:var(--rp-c-gray-700); font-size:10px; font-weight:700; }
.rp-tool-state { margin-left:auto; font-size:11px; color:var(--rp-c-gray-400); }
.rp-tool-state.running { color:var(--rp-primary); }
.rp-tool-state.error { color:var(--rp-danger); }
.rp-tool-state.done { color:var(--rp-success); }
.rp-tool-args { margin-top:4px; padding-left:21px; font-family:ui-monospace,Menlo,monospace; font-size:12px; color:var(--rp-c-gray-400); white-space:pre-wrap; word-break:break-all; }
.rp-tool-body { margin-top:8px; padding-left:21px; }
agent-output, agent-output { display:block; width:fit-content; min-width:280px; max-width:600px; border:1px solid var(--rp-border); border-radius:8px; overflow:hidden; background:var(--rp-c-slate-50); }
.rp-output-head { padding:6px 12px; font-size:12px; color:var(--rp-c-gray-500); border-bottom:1px solid var(--rp-border); font-family:ui-monospace,Menlo,monospace; }
.rp-output-body { padding:12px; font-family:ui-monospace,Menlo,monospace; font-size:12.5px; line-height:1.6; color:var(--rp-c-slate-700); white-space:pre-wrap; }
reasoning-el, reasoning-el { display:block; width:fit-content; min-width:280px; max-width:600px; }
.rp-reason-head { display:flex; align-items:center; gap:6px; font-size:13px; color:var(--rp-c-gray-400); }
.rp-reason-body { margin-top:8px; padding-left:19px; border-left:2px solid var(--rp-border); font-size:13px; line-height:1.7; color:var(--rp-c-gray-500); }
message-actions, message-actions { display:inline-flex; gap:2px; }
.rp-msg-action { display:grid; place-items:center; width:28px; height:28px; border-radius:6px; color:var(--rp-c-gray-400); cursor:pointer; }
.rp-msg-action:hover { background:var(--rp-c-gray-100); color:var(--rp-c-gray-700); }
suggestions-el, suggestions-el { display:flex; flex-wrap:wrap; gap:8px; }
.rp-suggestion { padding:7px 13px; border:1px solid var(--rp-border); border-radius:8px; font-size:13px; color:var(--rp-c-gray-700); background:var(--rp-c-white); cursor:pointer; }
.rp-suggestion:hover { border-color:var(--rp-border-strong); background:var(--rp-c-gray-50); }
typing-el, typing-el { display:flex; align-items:center; }
.typing-el-dots { display:inline-flex; gap:4px; }
.typing-el-dots > span { width:7px; height:7px; border-radius:50%; background:var(--rp-c-ios-gray-3); }
composer-el, composer-el { display:flex; flex-direction:column; gap:8px; width:fit-content; min-width:520px; max-width:680px; padding:9px 9px 9px 14px; border:1px solid var(--rp-border-strong); border-radius:14px; background:var(--rp-c-white); }
composer-el.composer-el-disabled, composer-el.composer-el-disabled { opacity:.55; }
.composer-el-files { display:flex; flex-wrap:wrap; gap:6px; }
.composer-el-file { display:inline-flex; align-items:center; gap:5px; padding:4px 8px; border:1px solid var(--rp-border); border-radius:8px; background:var(--rp-c-gray-50); font-size:12px; color:var(--rp-c-gray-700); }
.composer-el-row { display:flex; align-items:center; gap:8px; }
.composer-el-attach { display:inline-flex; color:var(--rp-c-gray-400); flex:0 0 auto; }
.composer-el-input { flex:1; font-size:14px; min-width:0; }
.composer-el-modes { display:inline-flex; gap:4px; flex:0 0 auto; }
.composer-el-mode { display:inline-flex; align-items:center; gap:4px; padding:4px 8px; border:1px solid var(--rp-border); border-radius:999px; font-size:12px; color:var(--rp-c-gray-500); background:var(--rp-c-white); }
.composer-el-mode.active { border-color:var(--rp-primary); background:var(--rp-c-zinc-100); color:var(--rp-c-zinc-950); }
.composer-el-model { padding:4px 9px; border:1px solid var(--rp-border); border-radius:999px; font-size:12px; color:var(--rp-c-gray-700); background:var(--rp-c-gray-50); flex:0 0 auto; }
.composer-el-send { display:grid; place-items:center; width:32px; height:32px; flex:0 0 auto; border-radius:8px; background:var(--rp-c-gray-900); color:var(--rp-c-white); }
.composer-el-send.streaming { background:var(--rp-danger); }
citation-el, citation-el { display:inline-flex; align-items:center; gap:6px; max-width:280px; padding:3px 9px 3px 3px; border:1px solid var(--rp-border); border-radius:6px; background:var(--rp-c-gray-50); font-size:12px; color:var(--rp-c-gray-700); }
.rp-cite-idx { display:grid; place-items:center; width:17px; height:17px; border-radius:4px; background:var(--rp-c-gray-200); color:var(--rp-c-gray-700); font-size:11px; font-weight:700; }
.rp-cite-title { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
token-usage, token-usage { display:inline-flex; align-items:center; gap:7px; font-size:12px; color:var(--rp-c-gray-400); }
.rp-token-track { width:90px; height:5px; border-radius:999px; background:var(--rp-c-gray-200); overflow:hidden; }
.rp-token-fill { display:block; height:100%; background:var(--rp-c-gray-400); }
anchor-el, anchor-el { display:inline-flex; align-items:center; gap:6px; padding:4px 11px; font-size:13px; font-weight:600; color:var(--rp-primary); background:var(--rp-a-black-05); border:1px solid var(--rp-a-black-14); border-radius:999px; cursor:pointer; text-decoration:none; vertical-align:middle; }
anchor-el:hover, anchor-el:hover { background:var(--rp-a-black-08); }
.anchor-el-label { line-height:1; }
`;

// Agent / conversational UI primitives. Static, Codex-style: single column,
// de-bubbled, no assistant avatar, text + structure only (no markdown/highlight).

// Conversation container — vertical single-column stack.
export class ChatElement extends HTMLElement { connectedCallback() { injectStyle(); } }

// User message: a restrained light surface block, left-aligned, no avatar.
export class UserMessageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const text = attr(this,'text'); const content = document.createElement('div'); content.className = 'rp-msg-content'; if (text) content.textContent = text; children.forEach(n=>content.appendChild(n)); this.innerHTML = `<div class="rp-msg-role">You</div>`; this.appendChild(content); } }

// Agent message: plain flowing text, NO avatar, NO bubble.
export class AgentMessageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const text = attr(this,'text'); const name = attr(this,'name','Agent'); const content = document.createElement('div'); content.className = 'rp-msg-content'; if (text) content.textContent = text; children.forEach(n=>content.appendChild(n)); this.innerHTML = `<div class="rp-msg-role">${escapeHtml(name)}</div>`; this.appendChild(content); } }

// System / context note line.
export class SystemMessageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const text = attr(this,'text', this.textContent?.trim() || '系统消息'); this.innerHTML = `<span class="rp-sysmsg-line">${escapeHtml(text)}</span>`; } }

// Tool/function call: states the tool NAME as the headline (with a "工具" tag),
// args on their own line — never formatted as a `name(args)` method invocation.
export class ToolCallElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const name = attr(this,'name','tool'); const state = attr(this,'state','done'); const glyph = state==='running' ? icon('loader',13) : state==='error' ? icon('circle-x',13) : icon('check',13); const stateLabel = state==='running' ? '运行中' : state==='error' ? '失败' : '已完成'; const args = attr(this,'args'); const head = `<div class="rp-tool-head"><span class="rp-tool-glyph ${state}">${glyph}</span><span class="rp-tool-tag">工具</span><span class="rp-tool-name">${escapeHtml(name)}</span><span class="rp-tool-state ${state}">${stateLabel}</span></div>`; this.innerHTML = head; if (args) this.insertAdjacentHTML('beforeend', `<div class="rp-tool-args">${escapeHtml(args)}</div>`); if (children.length) { const body = document.createElement('div'); body.className = 'rp-tool-body'; children.forEach(n=>body.appendChild(n)); this.appendChild(body); } } }

// Command / output block — monospace, plain text (no syntax highlight).
export class AgentOutputElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const label = attr(this,'label'); const head = label ? `<div class="rp-output-head">${escapeHtml(label)}</div>` : ''; const body = document.createElement('div'); body.className = 'rp-output-body'; const text = attr(this,'text'); if (text) body.textContent = text; else children.forEach(n=>body.appendChild(n)); this.innerHTML = head; this.appendChild(body); } }

// Reasoning / thinking collapsible block.
export class ReasoningElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const expanded = this.hasAttribute('expanded'); const head = `<div class="rp-reason-head">${icon(expanded?'chevron-down':'chevron-right',13)}<span>Thought for a few seconds</span></div>`; this.innerHTML = head; if (expanded) { const body = document.createElement('div'); body.className='rp-reason-body'; children.forEach(n=>body.appendChild(n)); this.appendChild(body); } } }

// Message action buttons (copy / retry / thumbs).
export class MessageActionsElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady || this.children.length) return; this.dataset.rpReady='true'; const actions = csv(this,'actions','copy,retry,up,down'); const map: Record<string,[string,string]> = { copy:['copy','复制'], retry:['refresh','重试'], up:['thumbs-up','赞'], down:['thumbs-down','踩'], edit:['edit','编辑'], share:['send','分享'] }; this.innerHTML = actions.map(a=>{ const m = map[a] || ['circle', a]; return `<span class="rp-msg-action" title="${escapeHtml(m[1])}">${icon(m[0],14)}</span>`; }).join(''); } }

// Suggested reply / prompt chips.
export class SuggestionsElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const items = csv(this,'items','总结要点,继续,给个例子'); this.innerHTML = items.map(t=>`<span class="rp-suggestion">${escapeHtml(t)}</span>`).join(''); } }

// Streaming typing indicator (no avatar).
export class TypingElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; this.innerHTML = `<span class="typing-el-dots"><span></span><span></span><span></span></span>`; } }

// Composer / prompt input. Attachment chips, thinking/web/code mode toggles, an
// optional model pill, and a send button that becomes stop while streaming.
const COMPOSER_MODES: { key: string; ic: string; label: string }[] = [
  { key: 'thinking', ic: 'sparkles', label: '深度思考' },
  { key: 'web', ic: 'globe', label: '联网' },
  { key: 'code', ic: 'terminal', label: '代码' },
];
export class ComposerElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const value = attr(this,'value'); const placeholder = attr(this,'placeholder','给 Agent 发消息…'); const state = attr(this,'state','idle'); const files = csv(this,'files',''); const modes = csv(this,'modes',''); const model = attr(this,'model'); const sendIcon = state==='streaming' ? icon('stop',16) : icon('send',16); const fileChips = files.map(f => `<span class="composer-el-file">${icon('file',13)}<span>${escapeHtml(f)}</span>${icon('x',11)}</span>`).join(''); const modeChips = COMPOSER_MODES.map(m => `<span class="composer-el-mode${modes.includes(m.key) ? ' active' : ''}">${icon(m.ic,13)}<span>${m.label}</span></span>`).join(''); this.innerHTML = `${files.length ? `<div class="composer-el-files">${fileChips}</div>` : ''}<div class="composer-el-row"><span class="composer-el-attach">${icon('paperclip',16)}</span><span class="composer-el-input ${value ? 'rp-value' : 'rp-placeholder'}">${escapeHtml(value || placeholder)}</span><span class="composer-el-modes">${modeChips}</span>${model ? `<span class="composer-el-model">${escapeHtml(model)}</span>` : ''}<span class="composer-el-send ${state}">${sendIcon}</span></div>`; if (state === 'disabled') this.classList.add('composer-el-disabled'); } }

// Citation / source reference chip.
export class CitationElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const index = attr(this,'index','1'); const title = attr(this,'title', this.textContent?.trim() || '来源'); this.innerHTML = `<span class="rp-cite-idx">${escapeHtml(index)}</span><span class="rp-cite-title">${escapeHtml(title)}</span>`; } }

// Token / usage meter.
export class TokenUsageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const used = intAttr(this,'used',1840); const limit = intAttr(this,'limit',8000); const pct = limit ? Math.min(100,(used/limit)*100) : 0; this.innerHTML = `<span>${used.toLocaleString()} / ${limit.toLocaleString()} tokens</span><span class="rp-token-track"><span class="rp-token-fill" style="width:${pct}%"></span></span>`; } }
