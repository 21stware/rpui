export type IconName =
  | "search"
  | "bell"
  | "user"
  | "inbox"
  | "archive"
  | "at-sign"
  | "check"
  | "trash-2"
  | "x"
  | "loader"
  | "image"
  | "circle-alert"
  | "chevron-down"
  | "layout-dashboard"
  | "message-square"
  | "settings"
  | "plus"
  | "file"
  | "users"
  | "shield"
  | "calendar"
  | "upload"
  | "empty"
  | "chevron-left"
  | "chevron-right"
  | "minus"
  | "alert-triangle"
  | "info"
  | "circle-check"
  | "circle"
  | "chevron-up"
  | "star"
  | "copy"
  | "lock"
  | "circle-x"
  | "more-horizontal"
  | "more-vertical"
  | "grip"
  | "folder"
  | "file-code"
  | "git-branch"
  | "clock"
  | "key"
  | "zap"
  | "home"
  | "heart"
  | "bookmark"
  | "download"
  | "edit"
  | "eye"
  | "filter"
  | "refresh"
  | "sparkles"
  | "bot"
  | "wrench"
  | "terminal"
  | "thumbs-up"
  | "thumbs-down"
  | "send"
  | "stop"
  | "paperclip"
  | "globe"
  | "credit-card"
  | "panel-right"
  | "panel-left"
  | "image-off";

const iconPaths: Record<IconName, string> = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  bell: '<path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/>',
  user: '<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>',
  inbox:
    '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.5 5h13L22 12v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z"/>',
  archive:
    '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  "at-sign":
    '<circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  "trash-2":
    '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  loader: '<path d="M21 12a9 9 0 1 1-6.2-8.6"/>',
  image:
    '<rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/>',
  "circle-alert":
    '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  "chevron-down": '<path d="m6 9 6 6 6-6"/>',
  "layout-dashboard":
    '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  "message-square":
    '<path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
  settings:
    '<path d="M12.2 2h-.4l-1 3a7 7 0 0 0-1.6.7l-3-1.4-.3.3-2 3 .2.4 2.6 2a7 7 0 0 0 0 2l-2.6 2-.2.4 2 3 .3.3 3-1.4a7 7 0 0 0 1.6.7l1 3h.4l1-3a7 7 0 0 0 1.6-.7l3 1.4.3-.3 2-3-.2-.4-2.6-2a7 7 0 0 0 0-2l2.6-2 .2-.4-2-3-.3-.3-3 1.4a7 7 0 0 0-1.6-.7z"/><circle cx="12" cy="12" r="3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  users:
    '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3z"/>',
  calendar:
    '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
  upload:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  empty:
    '<path d="M4 7h16"/><path d="M5 7l1.5 13h11L19 7"/><path d="M9 11h6"/>',
  "chevron-left": '<path d="m15 18-6-6 6-6"/>',
  "chevron-right": '<path d="m9 18 6-6-6-6"/>',
  minus: '<path d="M5 12h14"/>',
  "alert-triangle":
    '<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
  "circle-check": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  "chevron-up": '<path d="m18 15-6-6-6 6"/>',
  star: '<path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8-6.1-3.2-6.1 3.2 1.2-6.8-5-4.9 6.9-1z"/>',
  copy: '<rect width="13" height="13" x="9" y="9" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  "circle-x":
    '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',
  "more-horizontal":
    '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  "more-vertical":
    '<circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/>',
  grip: '<circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/>',
  folder:
    '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z"/>',
  "file-code":
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="m9 13-2 2 2 2"/><path d="m15 13 2 2-2 2"/>',
  "git-branch":
    '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
  clock:
    '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  heart:
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  download:
    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  edit: '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z"/>',
  eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  refresh:
    '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/>',
  sparkles:
    '<path d="M9.9 2.5 12 8l5.5 2.1L12 12l-2.1 5.5L7.8 12 2.3 9.9 7.8 8z"/><path d="M18 5l.9 2.1L21 8l-2.1.9L18 11l-.9-2.1L15 8l2.1-.9z"/>',
  bot: '<rect width="16" height="11" x="4" y="9" rx="2"/><path d="M12 5v4"/><circle cx="12" cy="4" r="1"/><path d="M9 13v1.5"/><path d="M15 13v1.5"/>',
  wrench:
    '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  terminal:
    '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
  "thumbs-up":
    '<path d="M7 10v11"/><path d="M15 5.9 14 10h5.5a2 2 0 0 1 2 2.4l-1.4 7A2 2 0 0 1 18 21H7V10l4-8a2 2 0 0 1 3 1.7z"/>',
  "thumbs-down":
    '<path d="M17 14V3"/><path d="M9 18.1 10 14H4.5a2 2 0 0 1-2-2.4l1.4-7A2 2 0 0 1 6 3h11v11l-4 8a2 2 0 0 1-3-1.7z"/>',
  send: '<path d="M14.5 9.5 21 3l-6.5 18-2.5-7-7-2.5z"/>',
  stop: '<rect width="14" height="14" x="5" y="5" rx="2"/>',
  paperclip:
    '<path d="m21 8-9.5 9.5a4 4 0 0 1-5.7-5.7L13 4.6a2.7 2.7 0 0 1 3.8 3.8L9.5 15.7a1.3 1.3 0 0 1-1.9-1.9l7.4-7.4"/>',
  globe:
    '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/>',
  "credit-card":
    '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
  "panel-right":
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/>',
  "panel-left":
    '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  "image-off":
    '<path d="M3 3 21 21"/><path d="M21 9V5a2 2 0 0 0-2-2h-4"/><path d="M3 5v14a2 2 0 0 0 2 2h14"/><path d="m9 9 3 3 2-2"/>',
};

export function icon(name?: string, size = 16): string {
  const key = (name || "file") as IconName;
  const paths = iconPaths[key] || iconPaths.file;
  return `<svg class="rp-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}
