/** Site-wide CSS — Claude-inspired editorial aesthetic.
 *  Warm paper background, terracotta accent, serif display headings,
 *  generous whitespace. Styreners (Inter) for UI/body, serif for display,
 *  JetBrains Mono for code. Loaded as docs/site.css. */
export const SITE_CSS = `
:root{
  --bg:#faf9f5; --bg-2:#f3f1ea; --surface:#ffffff; --surface-warm:#fdfcf9;
  --ink:#28261f; --ink-2:#5e5a50; --muted:#948f81;
  --line:#e8e3d8; --line-2:#f0ece2;
  --brand:#c96442; --brand-ink:#b04e30; --brand-wash:#f6ece5;
  --code-bg:#2b2924; --code-ink:#e8e3d8;
  --radius:16px; --maxw:1180px;
  --serif:"Newsreader","Iowan Old Style","Apple Garamond",Georgia,"Times New Roman",serif;
  --mono:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
  --sans:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;font-family:var(--sans);color:var(--ink);background:var(--bg);
  font-size:15.5px;line-height:1.7;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
a{color:var(--brand-ink);text-decoration:none}
a:hover{text-decoration:underline;text-underline-offset:2px}
code{font-family:var(--mono);font-size:.86em}
::selection{background:var(--brand-wash)}

/* ── header ── */
.nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:24px;height:64px;
  padding:0 32px;background:rgba(250,249,245,.85);backdrop-filter:saturate(180%) blur(14px);
  border-bottom:1px solid var(--line);}
.brand{display:flex;align-items:center;gap:10px;font-weight:600;font-size:18px;letter-spacing:-.02em;color:var(--ink);font-family:var(--serif)}
.brand:hover{text-decoration:none}
.brand .mark{display:grid;place-items:center;width:28px;height:28px;border-radius:8px;
  background:var(--brand);color:#fff;font-size:14px;font-weight:700;font-family:var(--sans)}
.brand .ver{font-family:var(--mono);font-size:11px;font-weight:500;color:var(--muted);
  padding:2px 8px;border:1px solid var(--line);border-radius:999px;letter-spacing:0}
.nav-links{display:flex;gap:2px;margin-left:10px}
.nav-links a{font-size:14.5px;font-weight:500;color:var(--ink-2);padding:7px 14px;border-radius:9px}
.nav-links a:hover{background:var(--bg-2);color:var(--ink);text-decoration:none}
.nav-links a.active{color:var(--brand-ink);background:var(--brand-wash);font-weight:600}
.nav-right{margin-left:auto;display:flex;align-items:center;gap:8px}
.nav-right a{display:flex;align-items:center;gap:6px;font-size:14.5px;font-weight:500;color:var(--ink-2);padding:7px 13px;border-radius:9px}
.nav-right a:hover{background:var(--bg-2);color:var(--ink);text-decoration:none}
.nav-cta{background:var(--ink)!important;color:#fff!important}
.nav-cta:hover{background:var(--brand-ink)!important}

/* ── footer ── */
.foot{border-top:1px solid var(--line);background:var(--surface-warm);margin-top:96px}
.foot-in{max-width:var(--maxw);margin:0 auto;padding:48px 32px;display:flex;flex-wrap:wrap;gap:48px;justify-content:space-between}
.foot h4{margin:0 0 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)}
.foot ul{list-style:none;margin:0;padding:0;display:grid;gap:9px}
.foot a{font-size:14.5px;color:var(--ink-2)}
.foot a:hover{color:var(--brand-ink)}
.foot .copy{font-size:13px;color:var(--muted);width:100%;border-top:1px solid var(--line-2);padding-top:28px;margin-top:8px}

/* ── generic page container ── */
.wrap{max-width:var(--maxw);margin:0 auto;padding:64px 32px}

/* ── hero ── */
.hero{position:relative;overflow:hidden;background:
  radial-gradient(1100px 480px at 72% -8%,rgba(201,100,66,.10),transparent 62%),
  radial-gradient(820px 460px at 8% 4%,rgba(201,100,66,.05),transparent 58%);}
.hero-in{max-width:920px;margin:0 auto;padding:104px 32px 80px;text-align:center}
.hero .eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:var(--brand-ink);
  background:var(--brand-wash);border:1px solid #ecd9cd;padding:6px 15px;border-radius:999px;margin-bottom:30px}
.hero h1{margin:0 0 22px;font-family:var(--serif);font-weight:500;font-size:clamp(40px,6.4vw,68px);line-height:1.08;letter-spacing:-.02em}
.hero h1 .grad{font-style:italic;color:var(--brand)}
.hero p{max-width:600px;margin:0 auto 36px;font-size:19px;line-height:1.65;color:var(--ink-2)}
.hero-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;padding:12px 24px;border-radius:12px;border:1px solid transparent;cursor:pointer;transition:background .15s,border-color .15s}
.btn-primary{background:var(--brand);color:#fff}
.btn-primary:hover{background:var(--brand-ink);text-decoration:none}
.btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--line)}
.btn-ghost:hover{border-color:var(--brand);color:var(--brand-ink);text-decoration:none}

/* code window */
.codewin{max-width:720px;margin:60px auto 0;text-align:left;border:1px solid var(--line);border-radius:var(--radius);
  background:var(--code-bg);box-shadow:0 30px 70px -28px rgba(40,38,31,.45);overflow:hidden}
.codewin-bar{display:flex;align-items:center;gap:7px;padding:13px 18px;border-bottom:1px solid #3a3730}
.codewin-bar i{width:11px;height:11px;border-radius:50%;display:inline-block}
.codewin-bar i:nth-child(1){background:#e0a899}.codewin-bar i:nth-child(2){background:#d9c89a}.codewin-bar i:nth-child(3){background:#a9bd9a}
.codewin-bar span{margin-left:8px;font-family:var(--mono);font-size:12px;color:#8c8578}
.codewin pre{margin:0;padding:22px 24px;overflow:auto;font-family:var(--mono);font-size:13px;line-height:1.8;color:var(--code-ink)}
.codewin .t{color:#d99a7c}.codewin .a{color:#cbb994}.codewin .v{color:#a9bd9a}.codewin .c{color:#8c8578;font-style:italic}

/* feature grid */
.features{max-width:var(--maxw);margin:0 auto;padding:24px 32px 10px;display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.feat{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:28px}
.feat .ic{width:42px;height:42px;border-radius:11px;display:grid;place-items:center;background:var(--brand-wash);color:var(--brand-ink);margin-bottom:16px}
.feat h3{margin:0 0 8px;font-size:18px;font-weight:650;letter-spacing:-.01em}
.feat p{margin:0;font-size:15px;color:var(--ink-2);line-height:1.65}
.section-head{max-width:var(--maxw);margin:80px auto 0;padding:0 32px;text-align:center}
.section-head h2{font-family:var(--serif);font-weight:500;font-size:36px;letter-spacing:-.01em;margin:0 0 10px}
.section-head p{color:var(--ink-2);font-size:17px;margin:0}

/* ── docs layout (guide) ── */
.doc{display:grid;grid-template-columns:256px minmax(0,1fr) 208px;gap:0;max-width:var(--maxw);margin:0 auto;align-items:start}
.doc-side{position:sticky;top:64px;align-self:start;height:calc(100vh - 64px);overflow-y:auto;padding:32px 18px 48px;border-right:1px solid var(--line)}
.doc-side .grp{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);padding:18px 10px 7px}
.doc-side a{display:block;font-size:14.5px;color:var(--ink-2);padding:6px 11px;border-radius:8px;line-height:1.45}
.doc-side a:hover{background:var(--bg-2);color:var(--ink);text-decoration:none}
.doc-side a.active{background:var(--brand-wash);color:var(--brand-ink);font-weight:600}
.doc-main{padding:52px 56px;min-width:0}
.doc-toc{position:sticky;top:64px;align-self:start;padding:52px 22px;font-size:13px}
.doc-toc .lbl{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);margin-bottom:12px}
.doc-toc a{display:block;color:var(--muted);padding:5px 0 5px 14px;border-left:2px solid var(--line);line-height:1.45}
.doc-toc a:hover{color:var(--brand-ink);border-left-color:var(--brand);text-decoration:none}
.doc-toc a.lvl3{padding-left:26px}

/* prose */
.prose{max-width:740px}
.prose h1{font-family:var(--serif);font-size:40px;font-weight:500;letter-spacing:-.02em;margin:0 0 10px;line-height:1.15}
.prose h2{font-family:var(--serif);font-size:28px;font-weight:500;letter-spacing:-.01em;margin:48px 0 16px;padding-top:14px}
.prose h3{font-size:19px;font-weight:650;margin:34px 0 12px;letter-spacing:-.01em}
.prose h4{font-size:15.5px;font-weight:700;margin:24px 0 8px}
.prose p{margin:0 0 18px;color:var(--ink)}
.prose ul,.prose ol{margin:0 0 18px;padding-left:26px}
.prose li{margin:6px 0}
.prose li::marker{color:var(--muted)}
.prose a{font-weight:500;text-decoration:underline;text-underline-offset:2px;text-decoration-color:#e2cdbf}
.prose a:hover{text-decoration-color:var(--brand)}
.prose code{background:var(--bg-2);padding:2px 6px;border-radius:5px;color:var(--brand-ink);font-size:.85em}
.prose pre.code{background:var(--code-bg);color:var(--code-ink);padding:20px 22px;border-radius:13px;overflow:auto;margin:0 0 20px;position:relative;border:1px solid #3a3730}
.prose pre.code code{background:none;color:inherit;padding:0;font-size:13px;line-height:1.8}
.prose pre.code[data-lang]::before{content:attr(data-lang);position:absolute;top:9px;right:14px;font-family:var(--mono);font-size:10px;color:#8c8578;text-transform:uppercase;letter-spacing:.06em}
.prose blockquote{margin:0 0 20px;padding:14px 20px;border-left:3px solid var(--brand);background:var(--brand-wash);border-radius:0 10px 10px 0;color:var(--ink-2)}
.prose table{width:100%;border-collapse:collapse;margin:0 0 22px;font-size:14.5px}
.prose th,.prose td{text-align:left;padding:10px 15px;border-bottom:1px solid var(--line)}
.prose th{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);background:var(--bg-2)}
.prose tr:last-child td{border-bottom:0}
.prose td:first-child code{color:var(--brand-ink)}
.prose hr{border:0;border-top:1px solid var(--line);margin:36px 0}
.doc-foot{max-width:740px;margin:56px 0 0;padding-top:24px;border-top:1px solid var(--line);display:flex;justify-content:space-between;font-size:14.5px}

/* page intro (components/examples/api shared) */
.page-intro{max-width:var(--maxw);margin:0 auto;padding:56px 32px 0}
.page-intro h1{font-family:var(--serif);font-size:42px;font-weight:500;letter-spacing:-.02em;margin:0 0 10px}
.page-intro p{font-size:17px;color:var(--ink-2);margin:0;max-width:660px;line-height:1.65}

/* example gallery cards */
.ex-grid{max-width:var(--maxw);margin:0 auto;padding:36px 32px 0;display:grid;grid-template-columns:repeat(auto-fill,minmax(322px,1fr));gap:24px}
.ex-card{display:flex;flex-direction:column;border:1px solid var(--line);border-radius:var(--radius);background:var(--surface);overflow:hidden;text-decoration:none;color:inherit;transition:box-shadow .18s,transform .18s,border-color .18s}
.ex-card:hover{box-shadow:0 22px 48px -24px rgba(40,38,31,.3);transform:translateY(-3px);border-color:#ddd3c4;text-decoration:none}
.ex-thumb{height:188px;overflow:hidden;background:var(--bg-2);border-bottom:1px solid var(--line);position:relative}
.ex-thumb iframe{width:1440px;height:900px;border:0;transform-origin:top left;pointer-events:none}
.ex-body{padding:18px 20px}
.ex-body .tag{font-family:var(--mono);font-size:11px;color:var(--muted)}
.ex-body h3{margin:5px 0 6px;font-size:17px;font-weight:650}
.ex-body p{margin:0;font-size:14px;color:var(--ink-2);line-height:1.6}

@media(max-width:1000px){
  .doc{grid-template-columns:1fr}.doc-side,.doc-toc{display:none}.doc-main{padding:36px 24px}
  .features{grid-template-columns:1fr}.foot-in{gap:32px}
}
`;

