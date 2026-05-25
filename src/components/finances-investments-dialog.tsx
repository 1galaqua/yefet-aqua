"use client";

import { useEffect, useId, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const TABS = [
  { id: "gemel", label: "קופת גמל" },
  { id: "histalmut", label: "קרן השתלמות" },
  { id: "amendment190", label: "תיקון 190" },
] as const;

type TabId = (typeof TABS)[number]["id"];

type FinancesInvestmentsDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function FinancesInvestmentsDialog({
  open,
  onClose,
}: FinancesInvestmentsDialogProps) {
  const titleId = useId();
  const [tabId, setTabId] = useState<TabId>("gemel");

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
            פיננסים והשקעות
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
            aria-label="נושאים בפיננסים והשקעות"
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
                  id={`tab-finance-${t.id}`}
                  aria-controls={`panel-finance-${t.id}`}
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
          {tabId === "gemel" && (
            <TabPanel id="gemel" labelledBy="tab-finance-gemel">
              <h3 className="text-xl font-bold text-foreground">
                מהי קופת גמל?
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                תוכנית חיסכון לטווח ארוך לשכירים ועצמאים, המאפשרת לחסוך כספים
                לגיל פרישה וליהנות מהטבות מס. ניתן למשוך לאחר גיל פרישה כסכום
                הוני, בחלקים, או כקצבה חודשית פטורה ממס.
              </p>
              <ul className="mt-6 space-y-6">
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>👔</span>
                    <span>שכירים</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    המעסיק משתתף עם העובד בהפקדות מדי חודש.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>💼</span>
                    <span>עצמאים</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    מפקידים לקופה בעצמם, עם הטבות מס משמעותיות.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>📊</span>
                    <span>מסלולי השקעה</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    ניתן לבחור מסלולים ברמות סיכון שונות בהתאם לצרכים.
                  </p>
                </li>
              </ul>
            </TabPanel>
          )}
          {tabId === "histalmut" && (
            <TabPanel id="histalmut" labelledBy="tab-finance-histalmut">
              <h3 className="text-xl font-bold text-foreground">
                קרן השתלמות
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                תוכנית חיסכון לטווח בינוני לשכירים ולעצמאים. הקרן הופכת לנזילה
                לאחר שש שנים — תוכנית החיסכון היחידה לטווח בינוני עם הטבות מס.
              </p>
              <ul className="mt-6 space-y-6">
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>📅</span>
                    <span>נזילות לאחר 6 שנים</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    ניתן למשוך את הכסף ורווחיו פטורים ממס עד התקרה הקבועה בחוק.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>🎓</span>
                    <span>לשכירים — אחרי 3 שנים</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    ניתן לממש לצורך השתלמות מקצועית כבר לאחר 3 שנות ותק.
                  </p>
                </li>
                <li>
                  <div className="flex items-start gap-2 font-semibold text-foreground">
                    <span aria-hidden>💰</span>
                    <span>שיעורי הפקדה</span>
                  </div>
                  <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                    שכירים: 7.5% מעסיק + 2.5% עובד. עצמאים: עד 4.5% מהכנסה
                    שנתית עד 264,000 ₪.
                  </p>
                </li>
              </ul>
            </TabPanel>
          )}
          {tabId === "amendment190" && (
            <TabPanel
              id="amendment190"
              labelledBy="tab-finance-amendment190"
            >
              <h3 className="text-xl font-bold text-foreground">
                תיקון 190 לפקודת מס הכנסה
              </h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted">
                מאפשר להפקיד כספי חיסכון פרטיים לקופות גמל וליהנות מהטבות מס —
                ולמשוך לאחר גיל 60 בתשלום מס מופחת של 15% על הרווח הנומינלי.
              </p>
              <div className="mt-8">
                <h4 className="text-lg font-bold text-foreground">
                  פוליסת חיסכון
                </h4>
                <p className="mt-2 text-pretty leading-relaxed text-muted">
                  מוצר השקעה לטווח קצר ובינוני, כולל מגוון מסלולי השקעה. מתאים
                  גם לסכומים נמוכים — ניתן להפקיד חד פעמי או כהוראת קבע חודשית.
                </p>
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
      id={`panel-finance-${id}`}
      aria-labelledby={labelledBy}
      className="outline-none"
    >
      {children}
    </div>
  );
}
