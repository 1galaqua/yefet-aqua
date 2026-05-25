"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const TABS = [
  { id: "risk", label: "ריסק" },
  { id: "familyIncome", label: "הכנסה למשפחה" },
  { id: "partners", label: "ביטוח שותפים" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type LifeInsuranceDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function LifeInsuranceDialog({
  open,
  onClose,
}: LifeInsuranceDialogProps) {
  const titleId = useId();
  const [tabId, setTabId] = useState<TabId>("risk");

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
            ביטוח חיים
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
            aria-label="נושאים בביטוח חיים"
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
                  id={`tab-life-${t.id}`}
                  aria-controls={`panel-life-${t.id}`}
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
          {tabId === "risk" && (
            <TabPanel id="risk" labelledBy="tab-life-risk">
              <h3 className="text-xl font-bold text-foreground">
                ביטוח חיים ריסק
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                ביטוח חיים ריסק הוא ביטוח בסיסי המעניק פיצוי כספי חד פעמי במקרה של
                מות המבוטח. ניתן להרחיב את הכיסוי גם למקרה של נכות מוחלטת
                וצמיתה.
              </p>
              <ul className="mt-6 space-y-6">
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>💰</span>
                    <span>פיצוי חד פעמי</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    הפיצוי הוא בגובה הסכום שהוגדר בפוליסה, ניתן למוטבים שקבע
                    המבוטח — בדרך כלל בן/בת זוג והמשפחה הגרעינית.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🛡️</span>
                    <span>מטרת הביטוח</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    להבטיח אמצעי קיום למוטבים שאיבדו יחד עם יקירם גם מקור הכנסה.
                    הפיצוי מאפשר לשמור על רמת חיים סבירה.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🔓</span>
                    <span>חופש שימוש</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    אופן השימוש בכספי הפיצוי הינו לפי שיקול דעתם הבלעדי של
                    המוטבים בפוליסה.
                  </p>
                </li>
              </ul>
            </TabPanel>
          )}
          {tabId === "familyIncome" && (
            <TabPanel
              id="familyIncome"
              labelledBy="tab-life-familyIncome"
            >
              <h3 className="text-xl font-bold text-foreground">
                ביטוח הכנסה למשפחה
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                ביטוח גמיש המאפשר למבוטח לספק לכל אחד מן המוטבים הכנסה חודשית
                המותאמת לצרכיו.
              </p>
              <h4 className="mt-8 text-lg font-bold text-foreground">
                איך זה עובד?
              </h4>
              <p className="mt-2 text-pretty leading-relaxed text-muted">
                המבוטח מגדיר את הסכום החודשי ואת תקופת התשלום לכל מוטב. חברת
                הביטוח מבצעת את התשלומים בהתאם, והשימוש בכסף נתון לשיקול דעתו
                הבלעדי של כל מוטב.
              </p>
            </TabPanel>
          )}
          {tabId === "partners" && (
            <TabPanel id="partners" labelledBy="tab-life-partners">
              <h3 className="text-xl font-bold text-foreground">
                ביטוח שותפים עסקיים
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                מייצר פתרון כאשר שותפות נאלצת להתפרק עקב מקרה פטירה, מחלה או
                אובדן כושר עבודה.
              </p>
              <h4 className="mt-8 text-lg font-bold text-foreground">
                היתרון המרכזי
              </h4>
              <p className="mt-2 text-pretty leading-relaxed text-muted">
                השותף שנשאר בעסק יכול לרכוש את חלקו של השותף שנפטר ממשפחתו — ללא
                צורך לגייס הון חיצוני. הביטוח מממן את הרכישה ומשמר את רציפות
                העסק.
              </p>
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
      id={`panel-life-${id}`}
      aria-labelledby={labelledBy}
      className="outline-none"
    >
      {children}
    </div>
  );
}
