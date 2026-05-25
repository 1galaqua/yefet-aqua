"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const TABS = [
  { id: "what", label: "מה זה?" },
  { id: "supplementalVsPrivate", label: 'שב"ן vs פרטי' },
  { id: "waitingPeriod", label: "אכשרה" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type HealthInsuranceDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function HealthInsuranceDialog({
  open,
  onClose,
}: HealthInsuranceDialogProps) {
  const titleId = useId();
  const [tabId, setTabId] = useState<TabId>("what");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-4 pb-[env(safe-area-inset-bottom,16px)] sm:items-center"
      aria-hidden={!open}
    >
      <button
        type="button"
        className="absolute inset-0 bg-foreground/40 backdrop-blur-[1px]"
        aria-label="סגירת החלון"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-[101] flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-border-soft bg-surface shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-border-soft px-4 py-4 sm:px-5">
          <h2 id={titleId} className="text-lg font-bold text-foreground">
            ביטוח בריאות
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-transparent px-2 py-1 text-sm font-medium text-muted transition-colors hover:border-border-soft hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            סגור
          </button>
        </div>

        <div className="border-b border-border-soft bg-background/60 px-2 py-3 sm:px-4">
          <div
            role="tablist"
            aria-label="נושאים בביטוח בריאות"
            className="-mx-1 flex gap-1 overflow-x-auto whitespace-nowrap px-1"
          >
            {TABS.map((t) => {
              const sel = tabId === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={sel}
                  id={`tab-health-${t.id}`}
                  aria-controls={`panel-health-${t.id}`}
                  className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
                    sel
                      ? "bg-brand text-brand-foreground"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  }`}
                  onClick={() => setTabId(t.id)}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          {tabId === "what" && (
            <TabPanel id="what" labelledBy="tab-health-what">
              <p className="text-pretty leading-relaxed text-foreground">
                כל אזרחי ישראל מבוטחים בביטוח הבריאות הממלכתי ויכולים להרחיבו
                לתוכניות המשלים של קופות החולים (שב&quot;ן). כיסויים אלה מספיקים
                לנו ביומיום, אך אם אנו מתמודדים עם אירוע רפואי מורכב — ניתוח,
                השתלה או טיפול מיוחד — המענה לא תמיד מספיק.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-foreground">
                ביטוח בריאות פרטי מבטיח לכם כיסוי רחב ומקיף לטיפולים רפואיים
                במסגרת פרטית, שאינה תלויה במערכת הבריאות הציבורית.
              </p>
              <ul className="mt-6 space-y-6">
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🏥</span>
                    <span>ניתוח בישראל</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    בחירת מנתח ומוסד רפואי ללא תלות בקופה
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>💊</span>
                    <span>תרופות יקרות</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    כיסוי לתרופות שאינן בסל הבריאות
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🔬</span>
                    <span>בדיקות אבחנה</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    MRI, CT ובדיקות מומחים ללא המתנה
                  </p>
                </li>
              </ul>
            </TabPanel>
          )}
          {tabId === "supplementalVsPrivate" && (
            <TabPanel
              id="supplementalVsPrivate"
              labelledBy="tab-health-supplementalVsPrivate"
            >
              <ul className="space-y-6">
                <li>
                  <h3 className="text-lg font-bold text-foreground">
                    תקנון מול חוזה
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    השב&quot;ן הוא תקנון אחיד שהקופה רשאית לשנות. פוליסה פרטית
                    היא חוזה מחייב — החברה לא יכולה לשנות תנאים לרעת המבוטח.
                  </p>
                </li>
                <li>
                  <h3 className="text-lg font-bold text-foreground">
                    חיתום רפואי
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    שב&quot;ן — ללא מגבלת מצב בריאותי. פוליסה פרטית — חיתום לפי
                    גיל ומצב בריאותי. בפוליסות קבוצתיות ניתן לקבל ללא הצהרות.
                  </p>
                </li>
                <li>
                  <h3 className="text-lg font-bold text-foreground">מחיר</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    שב&quot;ן — מחיר אחיד לפי קבוצות גיל. פרטי — לפי חיתום.
                    פוליסות קבוצתיות לרוב במחיר אחיד לכל הגילאים.
                  </p>
                </li>
              </ul>
            </TabPanel>
          )}
          {tabId === "waitingPeriod" && (
            <TabPanel
              id="waitingPeriod"
              labelledBy="tab-health-waitingPeriod"
            >
              <ul className="space-y-6">
                <li>
                  <h3 className="text-lg font-bold text-foreground">
                    תקופת אכשרה / המתנה
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    הן מבוטחי השב&quot;ן והן מבוטחי חברות הביטוח מתנים את הזכות
                    לפיצוי בתקופת אכשרה, בה המבוטח משלם דמי ביטוח אך אינו זכאי
                    לפיצוי בקרות מקרה הביטוח.
                  </p>
                </li>
                <li>
                  <h3 className="text-lg font-bold text-foreground">
                    משך תקופות האכשרה
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    תקופות האכשרה נעות בין כ-3 חודשים ל-24 חודשים לסעיפים
                    השונים. במקרים מסוימים ניתן לעבור מקופה לקופה ללא צורך
                    בתקופת אכשרה נוספת.
                  </p>
                </li>
                <li>
                  <h3 className="text-lg font-bold text-foreground">
                    השתתפות עצמית
                  </h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    שב&quot;ן — גבוהה יחסית, עד 50% לתרופות יקרות. פרטי — נמוכה
                    ברוב הסעיפים.
                  </p>
                </li>
              </ul>
            </TabPanel>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function TabPanel({
  id,
  labelledBy,
  children,
}: {
  id: TabId;
  labelledBy: string;
  children: ReactNode;
}) {
  return (
    <div
      role="tabpanel"
      id={`panel-health-${id}`}
      aria-labelledby={labelledBy}
      className="outline-none"
    >
      {children}
    </div>
  );
}
