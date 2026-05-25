"use client";

import { useState } from "react";

import { ElementaryInsuranceDialog } from "@/components/elementary-insurance-dialog";
import { FinancesInvestmentsDialog } from "@/components/finances-investments-dialog";
import { HealthInsuranceDialog } from "@/components/health-insurance-dialog";
import { LifeInsuranceDialog } from "@/components/life-insurance-dialog";
import { PensionProgramsDialog } from "@/components/pension-programs-dialog";
import {
  HAREL_TRAVEL_POLICY_URL,
  NOVASAVE_CHILD_SAVINGS_URL,
  PERSONAL_FOLDER_PORTAL_URL,
  SERVICE_AREAS,
} from "@/constants/service-areas";

const focusRingCard =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export function ServiceAreasList() {
  const [elementaryDialogOpen, setElementaryDialogOpen] = useState(false);
  const [financesDialogOpen, setFinancesDialogOpen] = useState(false);
  const [healthDialogOpen, setHealthDialogOpen] = useState(false);
  const [lifeDialogOpen, setLifeDialogOpen] = useState(false);
  const [pensionDialogOpen, setPensionDialogOpen] = useState(false);

  return (
    <>
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICE_AREAS.map(({ emoji, title }) =>
          title === "פיננסים והשקעות" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <button
                type="button"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start ${focusRingCard}`}
                aria-haspopup="dialog"
                onClick={() => setFinancesDialogOpen(true)}
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
          ) : title === "ביטוח בריאות" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <button
                type="button"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start ${focusRingCard}`}
                aria-haspopup="dialog"
                onClick={() => setHealthDialogOpen(true)}
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
          ) : title === "תוכניות פנסיוניות" ? (
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
          ) : title === "נסיעות לחול" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <a
                href={HAREL_TRAVEL_POLICY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start no-underline text-inherit ${focusRingCard}`}
              >
                <span className="text-3xl" aria-hidden>
                  {emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                </div>
              </a>
            </li>
          ) : title === "תיק אישי" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <a
                href={PERSONAL_FOLDER_PORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start no-underline text-inherit ${focusRingCard}`}
              >
                <span className="text-3xl" aria-hidden>
                  {emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                </div>
              </a>
            </li>
          ) : title === "ביטוח חיים" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <button
                type="button"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start ${focusRingCard}`}
                aria-haspopup="dialog"
                onClick={() => setLifeDialogOpen(true)}
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
          ) : title === "ביטוח אלמנטרי" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <button
                type="button"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start ${focusRingCard}`}
                aria-haspopup="dialog"
                onClick={() => setElementaryDialogOpen(true)}
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
          ) : title === "מחשבון חיסכון לילד" ? (
            <li
              key={title}
              className="list-none rounded-2xl border border-border-soft bg-background shadow-sm transition-colors hover:border-brand"
            >
              <a
                href={NOVASAVE_CHILD_SAVINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex w-full cursor-pointer touch-manipulation items-center gap-4 p-5 text-start no-underline text-inherit ${focusRingCard}`}
              >
                <span className="text-3xl" aria-hidden>
                  {emoji}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                </div>
              </a>
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
              </div>
            </li>
          ),
        )}
      </ul>
      <ElementaryInsuranceDialog
        key={
          elementaryDialogOpen
            ? "elementary-modal-open"
            : "elementary-modal-idle"
        }
        open={elementaryDialogOpen}
        onClose={() => setElementaryDialogOpen(false)}
      />
      <FinancesInvestmentsDialog
        key={financesDialogOpen ? "finance-modal-open" : "finance-modal-idle"}
        open={financesDialogOpen}
        onClose={() => setFinancesDialogOpen(false)}
      />
      <HealthInsuranceDialog
        key={healthDialogOpen ? "health-modal-open" : "health-modal-idle"}
        open={healthDialogOpen}
        onClose={() => setHealthDialogOpen(false)}
      />
      <LifeInsuranceDialog
        key={lifeDialogOpen ? "life-modal-open" : "life-modal-idle"}
        open={lifeDialogOpen}
        onClose={() => setLifeDialogOpen(false)}
      />
      <PensionProgramsDialog
        key={pensionDialogOpen ? "pension-modal-open" : "pension-modal-idle"}
        open={pensionDialogOpen}
        onClose={() => setPensionDialogOpen(false)}
      />
    </>
  );
}
