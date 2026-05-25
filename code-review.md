# Code Review — yefetaqua

בדיקה מול **`cursor/ruls`** + **`AGENTS.md`** (גרסת Next.js הנוכחית בפרויקט).  
סטטוס: **Met** ≈ עומד בכלל ברובו · **Partial** ≈ חריג קטן / שיפור אופציונלי · **Gap** ≔ חוסר מהותי יחסית לכלל.

## Rules audit

| כללי | סטטוס | הערות |
|------|--------|--------|
| **nextjs-standards.mdc** | **Met** | עמוד בית סטטי; **`next/image`** ב־Hero עם **`fill`**, **`object-cover`**, **`sizes`**, **`priority`**. |
| **react-patterns.mdc** | **Met** | רכיבים פונקציונליים; אין **`any`**; שימוש ב־**`<main>`**, **`<nav>`**, **`<button>`** / קישורים; **`alt`** לתמונה. |
| **seo-patterns.mdc** | **Partial** | **OG** ו־**Twitter** מוגדרים ב־`layout.tsx`; אורך **תיאור (meta description)** ~**172** תווים — מעבר לטווח **120–160** שבכללי הכללים; כותרת ברירת־מחדל קצרה מ־**50–60** (שימו לב שבעברית אורך ״משקל״ בגוגל שונה מאנגלית). |
| **styling-patterns.mdc** | **Partial** | Mobile-first ברוב הרכיבים; **focus-visible** בעוגנים, כרטיסים ודיאלוגים. בשימוש מרובה בערכים ארביטראריים (**`size-[140px]`**, **`z-[100]`** וכד׳) — סטייה מהמלצה ״להעדיף סקלה״. |
| **content-patterns.mdc** | **Met** | היררכיית כותרות סבירה ( **`h1`** אחד בדף הבית ); רשימת תחומי פעילות ב־**`<ul>` / `<li>`**; טקסטי **`alt`** תיאוריים. |
| **security.mdc** | **Met** | ללא מפתחות/API בסורס; קישורים חיצוניים עם **`noopener noreferrer`**; ערכי URL בקבועים למסלול ציבורי. |
| **AGENTS.md** | **התוויה** | מציין פריצות/API בגרסת Next הנוכחית — לעקוב אחר `node_modules/next/dist/docs/` לפני שינויי פריימוורק. |

## ממצאים (Findings)

1. **בינוני־נמוך (`seo-patterns`)** — `SITE_DESCRIPTION` ב־`src/app/layout.tsx` ארוך מדי (~172 תווים). מומלץ לקצר ל־**≤160** (ולהשאיר **≥120** אם שומרים על אותו משקל משמעותי).

2. **נמוך (`styling-patterns`)** — ערכי גודל/bring-to-front ארביטראריים רבים; אופציונלי: טוקנים ב־`globals.css` / `@theme` או Tailwind arbitrary פעם אחת כ־`brand-*`.

3. **נמוך (תחזוקה / DRY)** — מודאלי תוכן (**`pension-programs-dialog`**, **`health-insurance-dialog`**, **`finances-investments-dialog`**, **`life-insurance-dialog`**, **`elementary-insurance-dialog`**) חוזרים על דפוס: portal, נעילת גלילה, Escape, Overlay. חילוץ ל־`**ContentDialogShell**` משותף יצמצם טעויות עתידיות.

4. **נמוך (`service-areas-list.tsx`)** — שרשרת ארוכה של **ternaries** על `title`. ברור בעת ההקמה; בשינויי תוכן מתמשך מומלל מפת **configuration** ({ id, emoji, קטגוריה: `'dialog' | 'href' | 'default'` }).

5. **נמוך (נגישות)** — רוב הדיאלוגים משתמשים ב־`role="dialog"` והחיבור טאב↔פאנל בחלק מהמודאלים; **`focus trap`** ובחירת אלמנט פוקוס ראשונית טרם מיושם — רמת פרימיום לקריאורה ולמקלדת.

6. **נמוך (תיעוד)** — **`progress.md`** עדיין מזכיר בחלקו **`yefet-akua.png`** בעוד ה‑Hero וה־OG מצביעים על **`yefet-aqua.jpg`** — סטייה בין מסמכים למצב בשטח.

## מה מתיישב טוב עם הכללים

- **`src/app/page.tsx`** — Landmark **`<main>`**, קישור **דילוג לתוכן**, **JSON-LD** עם `InsuranceAgent`, **`<Image>`** לתמונה, כפתורים/קישורים עם מצבי **focus-visible**.
- **`src/app/layout.tsx`** — **metadata**, **Open Graph**, **Twitter**, **`metadataBase`**, **`lang="he"`** / **`dir="rtl"`**.
- **`src/components/service-areas-list.tsx`** — הפרדה בין תוכן לפעולות; קישורים חיצוניים בטוחים; מודאלים מאחורי **client component**.
- **`src/constants/service-areas.ts`** — אתר ארגנטי למסלולי שירות ו־URLs חיצוניים.
- **`src/app/globals.css`** — טוקני צבע/מותג; **smooth scroll** מכובה תחת **prefers-reduced-motion**.

## שאלות פתוחות

- האם לכווץ את **meta description** ל־160 תווים או לפצל ל־**shortDescription** + פסקה ארוכה בדף בלבד?
- האם נדרש **focus trap** אחיד לכל המודאלים (כולל דיאלוג ״אלמנטרי״)?

## סיכום

הפרויקט **מתאים** במידה גבוהה לכללי **`react`** / **`content`** / **`next/image`** ובטיחות בסיסית. ההתאמות העיקריות: **אריזת description ל־SEO**, אופציונלי חיזוק **DRY למודאלים** והחלפת שרשרת ה־`map` בהגדרות נתונים אם הצמיחה תימשך.

_נוצר: ביקורת בהתבסס על מבנה התבנית `code-review.md` (cursor_project) ועל הקוד הנוכחי ב־repository._
