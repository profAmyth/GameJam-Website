# HackJam CU — Event Website Spec
**For:** Claude Code build (VS Code)
**Type:** Static site (HTML/CSS/JS) + serverless form handling
**Purpose:** Fiverr portfolio piece — college hackathon/game-jam landing + team registration site

---

## 0. Scope Note — GDD → Website mapping

This project borrows structure from a Game Design Document, but it's a website, not a game. Some GDD sections don't have a website equivalent and are dropped; others are renamed to fit:

| GDD section | Status | Website equivalent |
|---|---|---|
| Ownership-mechanic | ❌ dropped | N/A — no in-game economy/ownership system exists |
| Level-format | ❌ dropped | N/A — no levels; replaced by **Scene-Flow** (page/section flow) |
| Editor-UX | ❌ dropped | N/A — no level editor |
| Player-feel | 🔁 renamed | **Interaction-feel** (form feedback, reveal animation, micro-interactions) |
| Architecture | ✅ kept | Tech stack, file structure, data flow |
| Art bible | ✅ kept | Visual theme, palette, typography, imagery |
| Audio | ✅ kept (optional) | UI sound effects on key interactions |
| Scene-flow | ✅ kept | Page/section flow, states, reveal triggers |
| Persistence | ✅ kept | Where registration data lives, counter state |
| Build-deploy | ✅ kept | Hosting, env vars, domain |
| Acceptance tests | ✅ kept | Checklist before calling it "done" |

Added sections not in your list but needed for a real build: **Content Spec** (actual copy/data) and **Form & Email Spec** (since this is the functional core of the piece).

---

## 1. Project Overview

A single-page site for a fictional/demo hackathon hosted at **Chandigarh University**, built as a Fiverr portfolio piece to demonstrate: countdown logic, hidden/unlockable content, form handling with real email confirmation, and small-business-event-site polish.

**Working name:** HackJam CU *(placeholder — swap for real event name)*
**Format:** Single page, scroll-based, with anchor-linked nav
**Primary CTA:** Team registration form

---

## 2. Architecture

- **Stack:** HTML5, CSS3 (vanilla or Tailwind — pick one, don't mix), vanilla JS (no framework needed for this scope)
- **Form backend:** Formspree or EmailJS (client-side, no custom server required) — sends real confirmation email on submit
- **Hosting:** Netlify or Vercel (static hosting, free tier, easy custom domain later)
- **File structure:**
```
/index.html
/css/styles.css
/js/countdown.js
/js/reveal.js
/js/form.js
/js/counter.js
/assets/img/         (campus photos, theme art)
/assets/icons/
.env.example          (placeholder keys, never commit real keys)
```
- **No database** — see Persistence section for how registration data is actually stored/viewed.

---

## 3. Scene-Flow (page/section flow)

Single scroll page, sections in order, each an anchor target:

1. **Hero** — event name, tagline, countdown timer, primary CTA ("Register Your Team")
2. **About** — 2–3 sentences on what the event is, who it's for
3. **Theme Reveal** — locked/blurred by default; unlocks either (a) automatically when countdown hits zero, or (b) via a click-to-decrypt interaction before that. Pick one trigger — don't build both for v1.
4. **Schedule** — timeline or tabbed agenda (check-in, kickoff, hacking hours, judging, prizes)
5. **Prizes** — tiered cards (1st / 2nd / 3rd / bonus categories)
6. **Food & Perks** — icon grid (meals, snacks, swag, wifi, etc.)
7. **Location** — venue name at Chandigarh University, embedded map, campus photo
8. **Register** — team registration form
9. **Confirmation state** — inline success message + "check your email" note after submit
10. **Footer** — organizer contact, socials

State to track in JS: `themeRevealed` (bool), `formSubmitted` (bool), `teamCount` (number, see Persistence).

---

## 4. Interaction-feel (player-feel equivalent)

- Countdown updates every second, no visible jank/reflow
- Theme reveal has a distinct animation moment (glitch/decrypt effect, blur-to-sharp, or similar) — this is the "wow" moment of the piece, worth the most polish time
- Form: inline validation (not just on submit), clear disabled/loading state on the submit button, clear success/error state after submit
- No dead clicks — every interactive element has a hover/focus state

---

## 5. Art Bible

- **Theme:** hacker/terminal aesthetic (fits "hackathon") — dark background, monospace accents, glitch-text micro-effects on headings
- **Palette:** dark base (near-black/navy) + one high-contrast accent (e.g. neon green or electric blue) + white/light-gray text
- **Typography:** monospace or geometric sans for headings (e.g. Space Mono / JetBrains Mono), clean sans for body (e.g. Inter)
- **Imagery:** real Chandigarh University campus photos for the Location section (no official crest/logo without permission); abstract/generic tech imagery elsewhere
- **Iconography:** simple line icons for Food & Perks section (consistent icon set, not mixed styles)

---

## 6. Audio (optional)

- Soft "beep" or "type" sound on theme-reveal unlock
- Subtle success chime on form submit
- All audio muted by default with a visible mute/unmute toggle — never autoplay with sound

---

## 7. Persistence

Two things need to "persist" here, and neither needs a real database for a portfolio demo:

- **Registration data:** captured via Formspree/EmailJS submission → lands in your Formspree dashboard or your inbox. That *is* the storage for a demo. (If this later becomes a real client project, that's when you'd add an actual database.)
- **Live team counter ("X teams registered"):** since there's no backend, either (a) fake it with a starting number + client-side increment per session (clearly a demo, resets on reload — fine for portfolio), or (b) wire it to a simple key-value store if you want it to persist across visitors. Don't oversell this as "real-time" in the portfolio caption if it's simulated.

---

## 8. Form & Email Spec

**Fields:**
- Team name (required)
- Team size / number of members (required, validate 2–4 range — adjust to real rules)
- Member names + emails (repeatable fields, one row per member)
- Project idea / track (optional, short text)
- Contact email for confirmation (required)

**Flow:**
1. User fills form → client-side validation on blur
2. Submit → button shows loading state
3. Formspree/EmailJS sends confirmation email to the contact address
4. Page shows inline "You're in! Check your email for confirmation." message
5. On error (network/service failure): inline error message, form data preserved, retry allowed

**Do not hardcode API keys in the JS files.** Use a `.env` pattern or a placeholder config the user fills in locally; `.env.example` ships with dummy values only.

---

## 9. Build & Deploy

- Deploy target: Netlify or Vercel (static site)
- Custom domain optional for the portfolio piece
- Confirm Formspree/EmailJS free-tier submission limits are enough for a demo (they are)
- Add a README noting this is a portfolio/demo project, not affiliated with or endorsed by Chandigarh University

---

## 10. Acceptance Tests

- [ ] Countdown timer counts down accurately and updates without flicker
- [ ] Theme reveal triggers correctly (on countdown-zero or on click, per chosen design) and only once
- [ ] All nav anchors scroll to correct sections
- [ ] Form rejects invalid input (missing required fields, malformed email) with visible inline errors
- [ ] Valid submission sends a real confirmation email and shows success state
- [ ] Site is fully responsive (mobile, tablet, desktop) — test at 375px, 768px, 1440px widths
- [ ] No console errors on load or on any interaction
- [ ] No API keys or secrets committed to the repo
- [ ] Page loads in under ~2s on a throttled connection (images optimized/compressed)
- [ ] Location section map + campus photo render correctly

---

## 11. Assumptions / Placeholders to fill in before building

- Real event name, date, and countdown target
- Real prize tiers and amounts
- Real food/perk list
- Actual venue building/hall at Chandigarh University
- Team size rules
- Whether theme reveal is time-triggered or click-triggered (pick one)
