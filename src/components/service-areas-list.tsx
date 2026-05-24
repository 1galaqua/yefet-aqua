"use client";

import { useState } from "react";

import { PensionProgramsDialog } from "@/components/pension-programs-dialog";
import { SERVICE_AREAS } from "@/constants/service-areas";

const focusRingCard =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ServiceAreasList() {
  const [pensionDialogOpen, setPensionDialogOpen] = useState(false);

  return (
    <>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_AREAS.map(({ emoji, title }) =>
          title === "תוכניות פנסיוניות" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <button
                type="button"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start ${focusRingCard}`}
                aria-haspopup="dialog"
                onClick={() => setPensionDialogOpen(true)}
              >
                <span className="text-3xl" aria-hidden>
                  {emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                </div>
              </button>
            </li>
          ) : (
            <li
              key={title}
              className="flex items-center gap-4 rounded-2xl border border-border-soft bg-background p-5 shadow-sm"
            >
              <span className="text-3xl" aria-hidden>
                {emoji}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-foreground">
                  {title}
                </h3>
                {title === "רשתות חברתיות" && (
                  <p className="mt-1 text-sm text-muted">
                    ניתן להעביר קישורים לפרופילים בתיאום עם הסוכן.
                  </p>
                )}
              </div>
            </li>
          ),
        )}
      </ul>
      <PensionProgramsDialog
        key={pensionDialogOpen ? "pension-modal-open" : "pension-modal-idle"}
        open={pensionDialogOpen}
        onClose={() => setPensionDialogOpen(false)}
      />
    </>
  );
}
