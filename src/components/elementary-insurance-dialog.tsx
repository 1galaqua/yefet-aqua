"use client";

import { useEffect, useId } from "react";
import { createPortal } from "react-dom";

type ElementaryInsuranceDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function ElementaryInsuranceDialog({
  open,
  onClose,
}: ElementaryInsuranceDialogProps) {
  const titleId = useId();

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
            ביטוח אלמנטרי
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-full border border-transparent px-2 py-1 text-sm font-medium text-muted transition-colors hover:border-border-soft hover:bg-background hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            סגור
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <p className="mt-3 text-pretty leading-relaxed text-muted">
            ביטוח המגן על רכוש, נכסים וחבות משפטית מפני נזקים בלתי צפויים.
            בניגוד לביטוחי חיים, מבוסס על פוליסה שנתית המפרטת את הרכוש, סכום
            הביטוח והשתתפות עצמית.
          </p>
          <ul className="mt-6 space-y-6">
            <li>
              <div className="flex items-start gap-2 font-semibold text-foreground">
                <span aria-hidden>🚗</span>
                <span>ביטוח רכב</span>
              </div>
              <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                חובה וצד ג&apos; — כיסוי לנזקי רכוש ופגיעה בצד שלישי.
              </p>
            </li>
            <li>
              <div className="flex items-start gap-2 font-semibold text-foreground">
                <span aria-hidden>🏠</span>
                <span>ביטוח דירה</span>
              </div>
              <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                מבנה ותכולה — כיסוי לנזקי שריפה, מים, גניבה ועוד.
              </p>
            </li>
            <li>
              <div className="flex items-start gap-2 font-semibold text-foreground">
                <span aria-hidden>🏢</span>
                <span>ביטוח עסקים</span>
              </div>
              <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                הגנה על רכוש העסק, ציוד, מלאי וחבות מעסיקים.
              </p>
            </li>
            <li>
              <div className="flex items-start gap-2 font-semibold text-foreground">
                <span aria-hidden>✈️</span>
                <span>נסיעות לחו&quot;ל</span>
              </div>
              <p className="mt-2 ps-9 text-pretty leading-relaxed text-muted">
                כיסוי רפואי, ביטול טיסה ואובדן כבודה.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
