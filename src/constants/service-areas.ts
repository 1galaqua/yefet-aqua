/** קישור לרכישת ביטוח נסיעות (הראל דיגיטל), נפתח בכרטיסייה חדשה מהאתר. */
export const HAREL_TRAVEL_POLICY_URL =
  "https://digital.harel-group.co.il/travel-policy/?guid=bee1d408-c6a7-410e-b4ee-ac690224bdd3&an=73442";

/** פורטל תיק אישי (Roeto), נפתח בכרטיסייה חדשה. */
export const PERSONAL_FOLDER_PORTAL_URL =
  "https://portal.roeto.co.il/nova/login";

/** מחשבון חיסכון לילד (NOVA), נפתח בכרטיסייה חדשה. */
export const NOVASAVE_CHILD_SAVINGS_URL =
  "https://novasave-gbniyn27.manus.space/?agent=%D7%99%D7%A4%D7%AA%20%D7%90%D7%A7%D7%95%D7%A2&phone=504823319&email=yefet.smart%40gmail.com&agentId=4";

export const SERVICE_AREAS = [
  { emoji: "🏥", title: "ביטוח בריאות" },
  { emoji: "🏦", title: "תוכניות פנסיוניות" },
  { emoji: "📈", title: "פיננסים והשקעות" },
  { emoji: "✈️", title: "נסיעות לחול" },
  { emoji: "❤️", title: "ביטוח חיים" },
  { emoji: "📁", title: "תיק אישי" },
  { emoji: "🧮", title: "מחשבון חיסכון לילד" },
  { emoji: "🏠", title: "ביטוח אלמנטרי" },
] as const;

export type ServiceAreaTitle = (typeof SERVICE_AREAS)[number]["title"];
