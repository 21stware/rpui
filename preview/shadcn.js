// shadcn/ui-style composed card showcase built with pure RPML primitives.
// No HTML elements or inline styles — only RPML vocabulary.

export const SHADCN = [
  {
    title: "Contribution History",
    description: "Last 6 months of activity",
    html: '<layout columns="1fr" gap="16"><chart kind="bar" data="32,44,36,52,30,56" labels="Dec,Jan,Feb,Mar,Apr,May" height="200"></chart><layout columns="1fr 1fr" gap="12"><key-value><kv-row label="Upcoming" value="May 25, 2024"></kv-row></key-value><key-value><kv-row label="Auto-Save" value="Accelerated"></kv-row></key-value></layout><button label="View Full Report" variant="primary" block></button></layout>',
  },
  {
    title: "Distribute Track",
    description: null,
    html: '<empty label="Distribute Track" description="Upload your first master to start reaching listeners on Spotify, Apple Music, and more." has-action></empty>',
  },
  {
    title: "Scan to Connect",
    description:
      "Open the Ledger mobile app and scan this code to link your device.",
    html: '<layout columns="1fr" gap="16" align="center"><image-placeholder width="160" height="160" label="QR"></image-placeholder><button label="Got it" variant="secondary" block></button></layout>',
  },
  {
    title: "Q2 Dividend Income",
    description: "Quarterly dividend payouts across your portfolio holdings.",
    html: '<list><list-item label="Vanguard VIG" badge="$1,842.10"></list-item><list-item label="S&P 500 VOO" badge="$928.40"></list-item><list-item label="Apple AAPL" badge="$340.00"></list-item><list-item label="Realty Income" badge="$1,139.50"></list-item></list>',
  },
  {
    title: "Dollar-Cost Averaging",
    description: "A strategy for building wealth over time.",
    html: "<doc-paragraph>Over time, this smooths out the average cost of your investments. When prices drop, your fixed amount buys more shares. When prices rise, you buy fewer. The result is a lower average cost per share compared to lump-sum investing during volatile periods.</doc-paragraph>",
  },
  {
    title: "Syncing Your Accounts",
    description: null,
    html: '<empty label="Syncing your accounts" description="We are pulling in your latest transactions. This usually takes a few seconds." has-action></empty>',
  },
  {
    title: "Payout Threshold",
    description:
      "Set the minimum balance required before a payout is triggered.",
    html: '<form><form-item label="Minimum Balance"><input state="filled" value="$50.00"></input><form-field-description>Minimum amount that must accumulate before triggering an automatic payout.</form-field-description></form-item><form-item label="Payout Method"><select value="Bank Transfer" options="Bank Transfer,PayPal,Stripe,Crypto"></select></form-item><form-item label="Frequency"><segmented options="Daily,Weekly,Monthly" active="1"></segmented></form-item></form>',
  },
  {
    title: "Stock Performance",
    description: "6-month price history.",
    html: '<layout columns="1fr" gap="16"><form-item label="Ticker"><input state="filled" value="VOO"></input></form-item><chart kind="area" data="68,64,60,74,56,66" labels="Dec,Jan,Feb,Mar,Apr,May" height="200"></chart></layout>',
  },
  {
    title: "Explore Catalog",
    description: null,
    html: '<empty label="Explore Catalog" description="Check your ISRC codes, metadata, and visual assets before going live." has-action></empty>',
  },
  {
    title: "Set a New Milestone",
    description:
      "Define your financial target and we will help you pace your savings.",
    html: '<form><form-item label="Goal Name"><input placeholder="e.g. New Car, Home Downpayment"></input></form-item><layout columns="1fr 1fr" gap="12"><form-item label="Target Amount"><input state="filled" value="$15,000"></input></form-item><form-item label="Target Date"><input state="filled" value="Dec 2025"></input></form-item></layout><layout columns="1fr" gap="8"><button label="Create Goal" variant="primary"></button><button label="Cancel" variant="secondary"></button></layout></form>',
  },
  {
    title: "Social Links",
    description: null,
    html: '<form><form-item label="Spotify Artist URL"><input state="filled" value="spotify.com/artist/3j...2k"></input></form-item><form-item label="Instagram Handle"><input state="filled" value="@julianduryea_music"></input></form-item><form-item label="SoundCloud URL"><input placeholder="soundcloud.com/username"></input></form-item><form-item label="Website"><input placeholder="https://yoursite.com"></input></form-item><layout columns="1fr 1fr" gap="8"><button label="Discard" variant="secondary"></button><button label="Save Changes" variant="primary"></button></layout></form>',
  },
  {
    title: "Notifications",
    description: "Choose what you want to be notified about.",
    html: '<layout columns="1fr" gap="12"><checkbox-group direction="vertical"><checkbox state="indeterminate" label="Select all"></checkbox><checkbox state="checked" label="Transaction alerts"></checkbox><checkbox state="checked" label="Security alerts"></checkbox><checkbox state="unchecked" label="Goal milestones"></checkbox><checkbox state="unchecked" label="Market updates"></checkbox></checkbox-group><button label="Save Preferences" variant="primary" block></button></layout>',
  },
  {
    title: "Upcoming Payments",
    description: "Scheduled transactions for the next 30 days.",
    html: '<layout columns="1fr" gap="12"><calendar month="2026-06" selected="8"></calendar><list><list-item label="Netflix Subscription" badge="$19.99"></list-item><list-item label="Rent Payment" badge="$2,400.00"></list-item><list-item label="Auto Insurance" badge="$186.00"></list-item></list></layout>',
  },
  {
    title: "Living Room",
    description: "Roller Shades",
    html: '<layout columns="1fr" gap="16"><progress value="50"></progress><layout columns="auto 1fr auto" gap="12"><tag label="Open"></tag><slider value="50"></slider><tag label="Close"></tag></layout><segmented options="Open,Half,Closed" active="1"></segmented></layout>',
  },
  {
    title: "Team Members",
    description: "Manage your team and their roles.",
    html: '<layout columns="1fr" gap="12"><list><list-item label="Sofia Davis" badge="Owner"></list-item><list-item label="Jackson Lee" badge="Admin"></list-item><list-item label="Isabella Nguyen" badge="Member"></list-item></list><button label="Invite Member" variant="primary" block></button></layout>',
  },
  {
    title: "Account Settings",
    description: "Update your account preferences.",
    html: '<layout columns="1fr" gap="12"><tabs active="0"><tab label="Account"></tab><tab label="Password"></tab><tab label="Team"></tab></tabs><form><form-item label="Name"><input state="filled" value="Pedro Duarte"></input></form-item><form-item label="Username"><input state="filled" value="@peduarte"></input></form-item><form-item label="Email"><input state="filled" value="pedro@example.com"></input></form-item><layout columns="1fr 1fr" gap="8"><button label="Cancel" variant="secondary"></button><button label="Save" variant="primary"></button></layout></form></layout>',
  },
  {
    title: "Recent Activity",
    description: "Your latest actions across the platform.",
    html: '<timeline><timeline-item label="Deployed v2.4.1" time="2h ago" state="done"></timeline-item><timeline-item label="Merged PR #142" time="5h ago" state="done"></timeline-item><timeline-item label="Created issue #156" time="1d ago" state="active"></timeline-item><timeline-item label="Updated dependencies" time="2d ago" state="default"></timeline-item></timeline>',
  },
  {
    title: "Storage Usage",
    description: "Your storage consumption breakdown.",
    html: '<layout columns="1fr" gap="16"><layout columns="1fr 1fr 1fr" gap="12"><stat-card label="Images" value="4.2 GB" trend="up" change="+12%"></stat-card><stat-card label="Videos" value="8.1 GB" trend="up" change="+5%"></stat-card><stat-card label="Documents" value="2.7 GB" trend="flat" change="0%"></stat-card></layout><progress value="68"></progress><kv-row label="Total" value="14.9 GB of 20 GB used"></kv-row></layout>',
  },
  {
    title: "API Keys",
    description: "Manage your application credentials.",
    html: '<layout columns="1fr" gap="12"><api-key value="sk_live_••••••••3f9a"></api-key><api-key value="sk_test_••••••••8b2c"></api-key><button label="Generate New Key" variant="primary" block></button></layout>',
  },
  {
    title: "Billing Plan",
    description: "Your current subscription details.",
    html: '<layout columns="1fr" gap="12"><layout columns="1fr 1fr 1fr" gap="8"><radio-card label="Free" description="$0/month" state="unchecked"></radio-card><radio-card label="Pro" description="$9/month" state="checked"></radio-card><radio-card label="Enterprise" description="Custom" state="unchecked"></radio-card></layout><key-value><kv-row label="Plan" value="Pro"></kv-row><kv-row label="Renews" value="Jun 20, 2026"></kv-row></key-value><button label="Upgrade Plan" variant="primary" block></button></layout>',
  },
  {
    title: "Security",
    description: "Manage your security settings.",
    html: '<layout columns="1fr" gap="16"><toggle state="on" label="Two-factor authentication"></toggle><toggle state="on" label="Login alerts"></toggle><toggle state="off" label="Biometric login"></toggle><divider></divider><list><list-item label="MacBook Pro · Chrome" badge="Current"></list-item><list-item label="iPhone 15 · Safari"></list-item></list><button label="Revoke All Sessions" variant="danger" block></button></layout>',
  },
  {
    title: "Product Gallery",
    description: "Featured items carousel",
    html: '<carousel><carousel-item><image-placeholder width="280" height="160" label="Product A"></image-placeholder></carousel-item><carousel-item><image-placeholder width="280" height="160" label="Product B"></image-placeholder></carousel-item><carousel-item><image-placeholder width="280" height="160" label="Product C"></image-placeholder></carousel-item></carousel>',
  },
  {
    title: "Select Framework",
    description: null,
    html: '<combobox placeholder="Select a framework..." options="Next.js,Remix,Astro,Vite,TanStack,Solid Start,Express,Nest.js" value="Next.js"></combobox>',
  },
  {
    title: "Recent Transactions",
    description: "Sortable transaction history",
    html: '<data-table columns="Date,Description,Category,Amount" rows="2024-01-15,Coffee Shop,Food,$4.50;2024-01-14,Gas Station,Transport,$52.00;2024-01-13,Grocery Store,Food,$128.30;2024-01-12,Electric Bill,Utilities,$89.00;2024-01-11,Online Subscription,Software,$12.99"></data-table>',
  },
  {
    title: "User Profile",
    description: null,
    html: '<layout columns="1fr" gap="8"><doc-paragraph>Posted by <hover-card trigger="@peduarte" title="Pedro Duarte" description="Software engineer & UI designer. Building things for the web."></hover-card> on Jan 12, 2024.</doc-paragraph></layout>',
  },
  {
    title: "Domain Settings",
    description: "Configure your custom domain",
    html: '<form><field label="Domain Name" description="Enter your domain name without https://"><input-group prefix="https://" placeholder="yoursite.com"></input-group></field><field label="SSL Certificate" description="We will automatically provision and renew your SSL certificate."><select value="Let\'s Encrypt" options="Let\'s Encrypt,Custom Certificate,None"></select></field><layout columns="1fr 1fr" gap="8"><button label="Cancel" variant="secondary"></button><button label="Save Domain" variant="primary"></button></layout></form>',
  },
  {
    title: "Editor Menu",
    description: null,
    html: '<menubar><menubar-item label="File"></menubar-item><menubar-item label="Edit"></menubar-item><menubar-item label="View"></menubar-item><menubar-item label="Insert"></menubar-item><menubar-item label="Format"></menubar-item><menubar-item label="Help"></menubar-item></menubar>',
  },
  {
    title: "Documentation",
    description: null,
    html: '<nav-menu><nav-menu-item label="Getting Started" active></nav-menu-item><nav-menu-item label="Installation"></nav-menu-item><nav-menu-item label="Components"></nav-menu-item><nav-menu-item label="Theming"></nav-menu-item><nav-menu-item label="CLI"></nav-menu-item></nav-menu>',
  },
  {
    title: "Notifications Log",
    description: "Recent system notifications",
    html: '<scroll-area height="180"><layout columns="1fr" gap="8"><sonner title="Deploy successful" description="v2.4.1 is now live" type="success"></sonner><sonner title="Build completed" description="All checks passed" type="info"></sonner><sonner title="Deprecated API" description="Update before July 1" type="warning"></sonner><sonner title="Build failed" description="Type error in src/index.ts" type="error"></sonner></layout></scroll-area>',
  },
  {
    title: "Text Formatting",
    description: null,
    html: '<toggle-group type="single" options="Bold,Italic,Underline,Strikethrough" active="0"></toggle-group>',
  },
  {
    title: "Advanced Settings",
    description: null,
    html: '<collapsible label="Advanced Configuration" expanded><layout columns="1fr" gap="12"><form-item label="API Endpoint"><input state="filled" value="https://api.example.com/v2"></input></form-item><form-item label="Timeout (ms)"><input state="filled" value="30000"></input></form-item><toggle state="on" label="Enable caching"></toggle><toggle state="off" label="Debug mode"></toggle></layout></collapsible>',
  },
  {
    title: "Media Preview",
    description: "16:9 aspect ratio container",
    html: '<aspect-ratio ratio="16/9"><image-placeholder width="100" height="100" label="Video Thumbnail"></image-placeholder></aspect-ratio>',
  },
];
