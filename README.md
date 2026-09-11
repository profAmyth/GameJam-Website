# HackJam CU

A single-page hackathon landing + team registration site for **HackJam CU**, a
fictional demo event set at Chandigarh University on July 4, 2027.

> This is a **portfolio/demo project**. It is not affiliated with, endorsed
> by, or representing Chandigarh University. Campus address is real
> (used only for the map embed); all event details, prizes, and the photo
> placeholder are fictional.

## Stack

- HTML5 + Tailwind CSS (via CDN, no build step)
- Vanilla JS (`js/countdown.js`, `js/reveal.js`, `js/form.js`, `js/counter.js`, `js/audio.js`, `js/nav.js`)
- Form backend: [Formspree](https://formspree.io) (AJAX submit, no custom server)

## Setup

1. Create a form at [formspree.io](https://formspree.io) and copy its endpoint.
2. Open [js/config.js](js/config.js) and replace `FORMSPREE_ENDPOINT` with your real endpoint.
3. Open `index.html` directly in a browser, or serve the folder with any static server:
   ```
   npx serve .
   ```
4. Drop a real campus photo at `assets/img/campus.jpg` and swap the placeholder
   div in the Location section of `index.html` for an `<img>` tag if you want
   a real photo instead of the placeholder pattern.

## Deploy

Drag-and-drop the folder onto [Netlify](https://app.netlify.com/drop) or run
`vercel` in this directory. No environment variables are required at build
time since the Formspree endpoint lives in `js/config.js`.

## Notes on the demo bits

- **Team counter** ("X teams registered") is a fake client-side number
  (`COUNTER_BASE` in `js/config.js`) that counts up on scroll and increments
  by 1 after a successful registration. It resets on reload — there is no
  backend counting real signups.
- **Theme reveal** unlocks on click (not on countdown), plays a scramble/decrypt
  animation once, and cannot be re-triggered on the same page load.
- **UI sound effects** are synthesized with WebAudio (no audio files to
  license) and are muted by default; users opt in via the speaker toggle in
  the nav.

## Placeholders still worth swapping before a real launch

- Real campus photo (`assets/img/campus.jpg`)
- Organizer contact email / real social links (footer)
- Prize amounts, schedule times, and theme text if the fictional ones don't fit
