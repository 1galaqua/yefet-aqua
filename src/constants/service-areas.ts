export const SERVICE_AREAS = [
  { emoji: "🏥", title: "ביטוח בריאות" },
  { emoji: "🏦", title: "תוכניות פנסיוניות" },
  { emoji: "📈", title: "פיננסים והשקעות" },
  { emoji: "✈️", title: "נסיעות לחול" },
  { emoji: "❤️", title: "ביטוח חיים" },
  { emoji: "🏠", title: "ביטוח אלמנטרי" },
  { emoji: "📁", title: "תיק אישי" },
  { emoji: "🧮", title: "מחשבון חיסכון לילד" },
  { emoji: "🌐", title: "רשתות חברתיות" },
] as const;

export type ServiceAreaTitle = (typeof SERVICE_AREAS)[number]["title"];
