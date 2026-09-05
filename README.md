# IBA-USA website (static rebuild)

A hand-built, framework-free rebuild of https://www.iba-usa.org/ — plain HTML, CSS
and JavaScript. Open `index.html` in any browser; there is no build step and no
server required.

## Files

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About / leadership team |
| `events.html` | Events listing |
| `event-conference-2026.html` | IBA 2026 Annual Conference |
| `event-symposium-2026.html` | 2026 Scientific Symposium on Translational Biomedicine |
| `event-bbq-2026.html` | 2026 IBA BBQ & Music Festival |
| `sponsorship.html` | Sponsor partners & sponsorship tiers |
| `assets/css/styles.css` | All styling (single stylesheet, design tokens at the top) |
| `assets/js/main.js` | Mobile nav, language toggle, program lightbox |
| `download-assets.sh` | Optional: pull the images down for offline use |
| `ASSETS.md` | Exactly which image files are still needed, and their filenames |

## Language toggle

Every page is fully bilingual (English / 简体中文). The 中文 button in the header
swaps the whole site; the choice is remembered in `localStorage`.

In the markup, paired elements carry `data-lang="en"` and `data-lang="zh"`, and
two CSS rules hide whichever one doesn't match `<html data-site-lang>`. To add new
content, just add both variants side by side.

## Images

Images currently load from the live Squarespace CDN, so the site works as soon as
you open it (with an internet connection). See `ASSETS.md` for the full list of
files. To make the folder fully self-contained:

```sh
sh download-assets.sh          # downloads everything into assets/img/
sh download-assets.sh --rewrite  # …and rewrites the HTML to point at local files
```

## Upcoming vs past events

Every event card carries `data-date="YYYY-MM-DD"`. On load, `main.js` reads those
dates and moves each card into the Upcoming or Past section, sorting upcoming
soonest-first and past newest-first. An event stays "upcoming" through the whole
of its own day. So the split stays correct on its own — you don't have to move
anything when a date goes by.

The cards are also authored into the right section in the HTML, so the page still
reads correctly if JavaScript is off.

What the same dates drive elsewhere:

- The homepage shows the next two events. If nothing is upcoming, it shows the two
  most recent instead and changes its heading from "Upcoming" to "Most recent".
- The Events page shows a short note in place of an empty Upcoming list.
- Each event detail page shows a "this event has already taken place" banner once
  its date has passed.

**To add an event:** copy an existing `<article class="event" data-date="...">`
block into the Upcoming list in `events.html` and at the top of the homepage list,
change the date, title, and text, and create a detail page (copy
`event-conference-2026.html` as the starting point). Add it to the footer's Events
list in all seven HTML files too.

## House style

Writing:

- American spelling ("program", not "programme").
- No em dashes in body copy. Use a comma, a colon, or a second sentence.
- Formal and specific. No marketing vocabulary, and no sentences so plain they
  read as simplistic.

Typography and layout — these rules exist because breaking them is what made
earlier drafts look inconsistent:

- **One heading per section.** A section is `<h2>` + `<hr class="rule">` + content.
  Never an eyebrow label stacked above a heading that says the same thing.
- **Eyebrows only in page heroes, and only when they add information** the `<h1>`
  does not (the event pages use them for kind and month). The homepage `<h1>` is
  the organization's name, not a tagline.
- **One body text size.** All body paragraphs inherit the base 17px. There is no
  "lede" class any more; a second paragraph size within a section reads as an
  accident. Smaller sizes belong only to UI text: card meta, captions, stat labels.
- **One heading size.** `.prose h2` adjusts spacing only, never `font-size`.
- **One left edge.** Every section's content starts at the `.wrap` gutter. Section
  headings are left-aligned; only the CTA panels are centered, and they are a
  distinct component.
- `wrap` and `prose` must go on **separate, nested elements**. Both set
  `max-width`, so combining them on one element applies the smaller width and then
  `margin-inline: auto` centers it, indenting that block away from everything else.

## Editing notes

- Colours, spacing and shadows are CSS custom properties in `:root` at the top of
  `styles.css` — change `--navy-800` / `--teal-600` and the whole site follows.
- The header and footer are duplicated in each HTML file (no templating). If you
  change a nav link, change it in all six files.
- The symposium program is a 25-page image gallery with a keyboard-navigable
  lightbox; slides are listed in the gallery markup of `event-symposium-2026.html`.
- Sponsor tiles live in `sponsorship.html`. Each is an `<a>` wrapping an `<img>`
  that points at `assets/img/sponsors/<name>.png`. If that file is absent, a small
  script in `main.js` swaps the image for the company's name in text, so a missing
  logo never shows a broken image. To add or remove a sponsor, copy a tile and
  change the `href`, `src`, `alt` and `data-name` / `data-name-zh` attributes.
  The last tile is a `.logo-card--contact` info card rather than a link — that is
  Yingxin Xue's, which has a phone number instead of a website.
- Anything marked `data-optional-media` removes itself if its image is missing, and
  widens the neighbouring column to fill the row. The conference flyer uses this,
  so the page reads correctly before the artwork is added.

## Content changes from the original site

- The English half of the BBQ invitation was truncated on the live site (it stopped
  after the first bullet). It has been completed to match the Chinese version.
- The events listing dates on the live site (2/1/26, 8/11/26) disagree with the
  dates in the event pages themselves (March 1 and August 22). The event-page dates
  are used here — worth confirming which is right.
- Contact addresses: the footer of the live site shows `admin@iba-usa.com`, while
  the BBQ page shows `admin@iba-usa.org`. Both are listed in the footer here.
- A "Contact us" button, breadcrumbs, sponsorship tiers, a partner-association
  list, and a stats strip were added; all copy is drawn from existing site content.
