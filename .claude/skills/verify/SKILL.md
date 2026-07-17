---
name: verify
description: Build, run, and drive this Next.js app to verify changes at the browser surface.
---

# Verifying 2026-sousakuten-info

## Launch

```bash
PORT=3005 npm run dev   # predev regenerates the changelog first
curl -s http://localhost:3005/requests   # readiness probe (DB-free page)
```

No `DATABASE_URL` is needed to render page shells, the header, or the
floating menu. Without it:

- `/requests` and `/changelog` work fully (no DB).
- `/` renders but `/api/announcements` 500s and `HomeClient` throws a
  **JS alert** ("お知らせの取得に失敗しました") that blocks Playwright —
  handle the dialog before screenshots.
- `/info` and `/info/[id]` are server-rendered from the DB and will error.

For full-DB verification, `../2026-vvps` can start a local `appdata`
Postgres on 127.0.0.1:55432.

## Drive

Playwright MCP works well. Gotchas learned:

- Screenshots save to the **repo root** — delete them before committing.
- Touch emulation: Playwright clicks are `pointerType: "mouse"`. To test
  real mobile tap behavior use CDP:
  `Input.dispatchTouchEvent` (`touchStart` + `touchEnd`) via
  `page.context().newCDPSession(page)` — Chromium then synthesizes the
  full touch → pointer → mouse compat event stream.
- The floating menu state is observable via `aria-expanded` on the
  メニュー button and `#floating-menu-nav`.
- Dark mode: `page.emulateMedia({ colorScheme: "dark" })`.

## Flows worth driving

- Menu: hover open/close (desktop), one-tap open (touch via CDP),
  outside tap close, link click navigates + closes, Enter/Tab/Escape.
- Header logo link (top-left) and AccountNav pill (top-right) on every page.
