import { injectStyle } from '../core/style';
import { attr, csv, escapeHtml, intAttr } from '../core/dom';
import { icon } from '../core/icons';

// Agent / conversational UI primitives. Static, Codex-style: single column,
// de-bubbled, no assistant avatar, text + structure only (no markdown/highlight).

// Conversation container — vertical single-column stack.
export class ChatElement extends HTMLElement { connectedCallback() { injectStyle(); } }

// User message: a restrained light surface block, left-aligned, no avatar.
export class UserMessageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const text = attr(this,'text'); const content = document.createElement('div'); content.className = 'rp-msg-content'; if (text) content.textContent = text; else children.forEach(n=>content.appendChild(n)); this.innerHTML = `<div class="rp-msg-role">You</div>`; this.appendChild(content); } }

// Assistant message: plain flowing text, NO avatar, NO bubble.
export class AssistantMessageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const text = attr(this,'text'); const name = attr(this,'name','Assistant'); const content = document.createElement('div'); content.className = 'rp-msg-content'; if (text) content.textContent = text; else children.forEach(n=>content.appendChild(n)); this.innerHTML = `<div class="rp-msg-role">${escapeHtml(name)}</div>`; this.appendChild(content); } }

// System / context note line.
export class SystemMessageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const text = attr(this,'text', this.textContent?.trim() || '系统消息'); this.innerHTML = `<span class="rp-sysmsg-line">${escapeHtml(text)}</span>`; } }

// Tool/function call: compact inline row with a status glyph + optional args/output.
export class ToolCallElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const children = Array.from(this.childNodes); const name = attr(this,'name','tool'); const state = attr(this,'state','done'); const glyph = state==='running' ? icon('loader',13) : state==='error' ? icon('circle-x',13) : icon('check',13); const args = attr(this,'args'); const head = `<div class="rp-tool-head"><span class="rp-tool-glyph ${state}">${glyph}</span><span class="rp-tool-name">${escapeHtml(name)}</span>${args ? `<span class="rp-tool-args-inline">${escapeHtml(args)}</span>` : ''}</div>`; const body = document.createElement('div'); body.className = 'rp-tool-body'; children.forEach(n=>body.appendChild(n)); this.innerHTML = head; if (children.length) this.appendChild(body); } }

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

// Composer / prompt input.
export class ComposerElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const value = attr(this,'value'); const state = attr(this,'state','idle'); const sendIcon = state==='streaming' ? icon('stop',16) : icon('send',16); this.innerHTML = `<span class="composer-el-attach">${icon('paperclip',16)}</span><span class="composer-el-input ${value?'rp-value':'rp-placeholder'}">${escapeHtml(value || attr(this,'placeholder','给助手发消息…'))}</span><span class="composer-el-send ${state}">${sendIcon}</span>`; } }

// Citation / source reference chip.
export class CitationElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const index = attr(this,'index','1'); const title = attr(this,'title', this.textContent?.trim() || '来源'); this.innerHTML = `<span class="rp-cite-idx">${escapeHtml(index)}</span><span class="rp-cite-title">${escapeHtml(title)}</span>`; } }

// Token / usage meter.
export class TokenUsageElement extends HTMLElement { connectedCallback() { injectStyle(); if (this.dataset.rpReady) return; this.dataset.rpReady='true'; const used = intAttr(this,'used',1840); const limit = intAttr(this,'limit',8000); const pct = limit ? Math.min(100,(used/limit)*100) : 0; this.innerHTML = `<span>${used.toLocaleString()} / ${limit.toLocaleString()} tokens</span><span class="rp-token-track"><span class="rp-token-fill" style="width:${pct}%"></span></span>`; } }
