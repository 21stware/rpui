/** Minimal, dependency-free Markdown → HTML converter for the RPML site.
 *  Supports: ATX headings, fenced code, tables, ordered/unordered lists,
 *  blockquotes, hr, inline code/bold/italic/links. Good enough for spec docs. */

function escapeHtml(s: string): string {
  return s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]!));
}

function inline(s: string): string {
  // escape first, then apply inline markup on the escaped text
  let t = escapeHtml(s);
  t = t.replace(/`([^`]+)`/g, (_m, c) => `<code>${c}</code>`);
  t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, txt, href) => `<a href="${href}">${txt}</a>`);
  t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  return t;
}

function slug(s: string): string {
  return s.toLowerCase().trim().replace(/[^\w一-龥]+/g, '-').replace(/^-+|-+$/g, '');
}

export interface Heading { level: number; text: string; id: string; }

/** Convert Markdown to HTML. Returns html + collected h2/h3 headings for a TOC. */
export function markdown(src: string): { html: string; headings: Heading[] } {
  const lines = src.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const headings: Heading[] = [];
  let i = 0;

  const flushPara = (buf: string[]) => {
    if (buf.length) { out.push(`<p>${inline(buf.join(' '))}</p>`); buf.length = 0; }
  };

  while (i < lines.length) {
    const line = lines[i];

    // fenced code
    const fence = line.match(/^```(\w*)/);
    if (fence) {
      const lang = fence[1];
      const code: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) { code.push(lines[i]); i++; }
      i++; // closing fence
      out.push(`<pre class="code"${lang ? ` data-lang="${lang}"` : ''}><code>${escapeHtml(code.join('\n'))}</code></pre>`);
      continue;
    }

    // heading
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      const id = slug(text);
      if (level === 2 || level === 3) headings.push({ level, text, id });
      out.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      i++;
      continue;
    }

    // table (header row + separator)
    if (/^\|/.test(line) && i + 1 < lines.length && /^\|[\s:|-]+\|?$/.test(lines[i + 1])) {
      const parseRow = (r: string) => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = parseRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && /^\|/.test(lines[i])) { rows.push(parseRow(lines[i])); i++; }
      const thead = `<thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join('')}</tr></thead>`;
      const tbody = `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
      out.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    // blockquote
    if (/^>\s?/.test(line)) {
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { quote.push(lines[i].replace(/^>\s?/, '')); i++; }
      out.push(`<blockquote>${inline(quote.join(' '))}</blockquote>`);
      continue;
    }

    // hr
    if (/^(-{3,}|\*{3,})$/.test(line.trim())) { out.push('<hr />'); i++; continue; }

    // lists
    if (/^\s*[-*+]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: string[] = [];
      const re = ordered ? /^\s*\d+\.\s+(.*)$/ : /^\s*[-*+]\s+(.*)$/;
      while (i < lines.length && re.test(lines[i])) { items.push(lines[i].match(re)![1]); i++; }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map(it => `<li>${inline(it)}</li>`).join('')}</${tag}>`);
      continue;
    }

    // blank line
    if (!line.trim()) { i++; continue; }

    // paragraph (gather until blank / block start)
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|\||>\s?|\s*[-*+]\s|\s*\d+\.\s|(-{3,}|\*{3,})$)/.test(lines[i])) {
      buf.push(lines[i]); i++;
    }
    flushPara(buf);
  }

  return { html: out.join('\n'), headings };
}

export { escapeHtml, slug };
