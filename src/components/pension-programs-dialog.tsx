"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const TABS = [
  { id: "general", label: "כללי" },
  { id: "pensionFund", label: "קרן פנסיה" },
  { id: "managers", label: "ביטוח מנהלים" },
  { id: "disability", label: "אובדן כושר" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type PensionProgramsDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function PensionProgramsDialog({
  open,
  onClose,
}: PensionProgramsDialogProps) {
  const titleId = useId();
  const [tabId, setTabId] = useState<TabId>("general");

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
            תוכניות פנסיוניות
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
            aria-label="נושאים בתוכניות פנסיוניות"
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
                  id={`tab-${t.id}`}
                  aria-controls={`panel-${t.id}`}
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
          {tabId === "general" && (
            <TabPanel id="general" labelledBy={`tab-general`}>
              <p className="text-pretty leading-relaxed text-foreground">
                גם אם זה נראה רחוק, החיסכון שלכם לקראת פרישה משוק העבודה מתחיל
                כבר עכשיו. החיסכון הפנסיוני הוא אחד הפרמטרים החשובים ביותר
                להבטחת העתיד הכלכלי שלכם ושל משפחתכם, ולכן חשוב ביותר שתדעו
                לקבל את ההחלטות הנכונות ותכירו את הכיסויים ואת הזכויות שלכם.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex gap-3 text-pretty leading-relaxed text-muted">
                  <span className="text-xl shrink-0" aria-hidden>
                    💰
                  </span>
                  <span className="min-w-0">
                    מהו גובה הקצבה שאקבל בגיל פרישה?
                  </span>
                </li>
                <li className="flex gap-3 text-pretty leading-relaxed text-muted">
                  <span className="text-xl shrink-0" aria-hidden>
                    🛡️
                  </span>
                  <span className="min-w-0">
                    מאילו כיסויים מורכבת הפנסיה שלי?
                  </span>
                </li>
                <li className="flex gap-3 text-pretty leading-relaxed text-muted">
                  <span className="text-xl shrink-0" aria-hidden>
                    💼
                  </span>
                  <span className="min-w-0">
                    התחלתי עבודה חדשה – מה עליי לעשות?
                  </span>
                </li>
              </ul>
              <p className="mt-6 text-center text-sm font-medium text-muted">
                בחרו לשונית למעלה לפרטים על כל מסלול.
              </p>
            </TabPanel>
          )}
          {tabId === "pensionFund" && (
            <TabPanel id="pensionFund" labelledBy={`tab-pensionFund`}>
              <h3 className="text-xl font-bold text-foreground">
                קרן פנסיה
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                תוכנית פנסיונית המעניקה מענה לשלושה צרכים מרכזיים:
              </p>
              <ul className="mt-6 space-y-6">
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>💰</span>
                    <span>קצבה חודשית</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    קצבה חודשית החל מגיל פרישה ולמשך כל חיי המבוטח. גובה הקצבה
                    תלוי בסכום הצבירה שנצבר בתכנית ובמסלול קבלת הקצבה שנבחר.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🏥</span>
                    <span>קצבת נכות</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    למקרה של אובדן כושר העבודה כתוצאה ממחלה או תאונה. סכום הקצבה
                    הוא בדר״כ 75% מההכנסה החודשית הממוצעת.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>👨‍👩‍👧</span>
                    <span>קצבת שארים</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    לבן/בת הזוג לכל ימי חייהם ויתומים עד גיל 21.
                  </p>
                </li>
              </ul>
              <p className="mt-6 flex gap-2 rounded-xl border border-border-soft bg-background p-3 text-sm leading-relaxed text-muted">
                <span className="shrink-0 text-lg" aria-hidden>
                  ⚠️
                </span>
                <span className="min-w-0">
                  ההצטרפות לא מצריכה לרוב הוכחת בריאות, אך קיימת תקופת אכשרה של 5
                  שנים בגין מצב רפואי קיים.
                </span>
              </p>
            </TabPanel>
          )}
          {tabId === "managers" && (
            <TabPanel id="managers" labelledBy={`tab-managers`}>
              <h3 className="text-xl font-bold text-foreground">
                ביטוח מנהלים
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                אחד משלושת הפתרונות לחיסכון פנסיוני בישראל, לצד קרן פנסיה וקופת
                גמל.
              </p>
              <ul className="mt-6 space-y-6">
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🔑</span>
                    <span>הייחודיות</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    ביטוח מנהלים הוא חוזה אישי המחייב את חברת הביטוח — בניגוד לקרן
                    פנסיה שבה ההסכם שיתופי והתשואות נחלקות בין כל העמיתים.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🛡️</span>
                    <span>כיסויים</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    כולל חיסכון פנסיוני ויכול לכלול רכיבי ביטוח כגון אובדן כושר
                    עבודה, שאירים ועוד. ניתן לשנות מעת לעת את האיזון בין המרכיבים.
                  </p>
                </li>
              </ul>
              <p className="mt-6 flex gap-2 rounded-xl border border-border-soft bg-background p-3 text-sm leading-relaxed text-muted">
                <span className="shrink-0 text-lg" aria-hidden>
                  ⚠️
                </span>
                <span className="min-w-0">
                  הקפאת תוכנית ותיקה ופתיחת תוכנית חדשה עלולה לגרום לנזק בלתי
                  הפיך. מומלץ להמשיך את התוכנית הקיימת.
                </span>
              </p>
            </TabPanel>
          )}
          {tabId === "disability" && (
            <TabPanel id="disability" labelledBy={`tab-disability`}>
              <h3 className="text-xl font-bold text-foreground">
                אובדן כושר עבודה
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                מטרתו לספק פיצוי חודשי שיהווה &quot;חלף הכנסה&quot; לעובד במצב של
                אובדן כושר עבודה.
              </p>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>📋</span>
                    <span>הגדרה משופרת</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    בחברות הביטוח נמכר ביטוח הכולל הגדרה משופרת שלפיה המבוטח יהיה
                    זכאי לפיצוי מלא או חלקי אם אינו יכול לעסוק בעיסוקו הספציפי —
                    לא רק בכל עבודה שהיא.
                  </p>
                </div>
                <div>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>💡</span>
                    <span>למה זה חשוב?</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    הכיסוי מבטיח שאם תמנע מלעסוק במקצועך הספציפי, תקבל פיצוי — גם
                    אם תוכל לעבוד בתפקיד אחר. זהו הבדל מהותי בין פוליסות שונות.
                  </p>
                </div>
              </div>
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
      id={`panel-${id}`}
      aria-labelledby={labelledBy}
      className="outline-none"
    >
      {children}
    </div>
  );
}
