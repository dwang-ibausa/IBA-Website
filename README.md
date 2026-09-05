# IBA-USA website

The website of the Innovative Biopharmaceutical Association – USA, a nonprofit
association based in Greater Philadelphia.

It is a plain static site: hand-written HTML, one stylesheet, one script. There is
no framework, no build step, and no dependencies. To work on it, open `index.html`
in a browser. To publish it, put these files on any web host. It is currently
served by GitHub Pages, which rebuilds automatically when you commit to the
repository's default branch; changes are usually live within a minute.

If the site looks unchanged after a deploy, the browser is almost certainly serving
a cached copy of `styles.css` or `main.js`. Hard-refresh with Cmd+Shift+R (or
Ctrl+F5 on Windows) before assuming the upload failed.

## Files

| File | What it is |
|---|---|
| `index.html` | Home |
| `about.html` | About the association and its leadership |
| `events.html` | Event listing, split into upcoming and past |
| `sponsorship.html` | Sponsor logos and a call for new sponsors |
| `event-conference-2026.html` | Detail page: IBA 2026 Annual Conference |
| `event-symposium-2026.html` | Detail page: 2026 Scientific Symposium |
| `event-bbq-2026.html` | Detail page: 2026 BBQ & Music Festival |
| `assets/css/styles.css` | All styling. Design tokens are at the top |
| `assets/js/main.js` | Navigation, language toggle, event sorting, image fallbacks, lightbox |
| `assets/img/` | Conference flyer, and sponsor logos in `sponsors/` |

There is **no templating**. The header and footer are copied into all seven pages,
so a change to the navigation or the footer has to be made in all seven. This is
deliberate: it keeps the site dependency-free, at the cost of that one chore.

## How the site works

### Bilingual toggle

Every page is fully bilingual. The 中文 button in the header switches the whole
site, and the choice is remembered in `localStorage`.

The mechanism is two CSS rules. Content is written twice, side by side:

```html
<h2 data-lang="en">Upcoming Events</h2>
<h2 data-lang="zh">即将举行的活动</h2>
```

`main.js` sets `data-site-lang` on the `<html>` element, and the stylesheet hides
whichever half doesn't match. **When you add content, add both languages.** A block
with only an English version will stay visible in Chinese mode, and vice versa.

### Events: upcoming and past

Every event card carries its date in the markup:

```html
<article class="event" data-date="2026-10-18">
```

On load, `main.js` reads those dates and moves each card into the Upcoming or Past
section, sorting upcoming soonest-first and past newest-first. An event stays
"upcoming" through the whole of its own day. **The split maintains itself**, so you
never have to move a card when a date goes by.

The same dates drive three other behaviours:

- The homepage shows the next two events. If nothing is upcoming, it shows the two
  most recent and changes its heading from "Upcoming Events" to "Most Recent Events".
- The Events page shows a short note in place of an empty Upcoming list.
- Each detail page shows a "this event has already taken place" banner once its
  date has passed.

Cards are also written into the correct section in the HTML, so the page still
reads correctly if JavaScript is unavailable.

**To add an event:**

1. Copy an existing `<article class="event" ...>` block into the Upcoming list in
   `events.html`, and another copy into the list on `index.html`.
2. Change `data-date`, the date block, the badge, the title, and the two meta lines
   (English and Chinese).
3. Create a detail page. `event-conference-2026.html` is the simplest starting
   point. Update the `data-event-past-notice` date on it to match.
4. Add the page to the footer's Events list — in all seven files.

### Sponsor logos

Each tile on `sponsorship.html` is a link wrapping an image that points at
`assets/img/sponsors/<name>.png`. If that file is missing, `main.js` replaces the
image with the company's name set in type, so an absent logo never shows a broken
image. To add a sponsor, copy a tile and change the `href`, `src`, `alt`,
`data-name` and `data-name-zh` attributes.

The last tile is different: it is a `.logo-card--contact` information card rather
than a link, because that sponsor is an individual with a phone number rather than
a website.

### Optional images

Anything marked `data-optional-media` removes itself when its image is missing, and
widens the neighbouring column to fill the space. The conference flyer uses this,
so a page still reads correctly before its artwork has been added.

## House style

These rules exist because breaking them is what made earlier drafts look
inconsistent. Please keep to them.

**Writing**

- Formal and specific. No marketing vocabulary ("platform", "cutting-edge",
  "flagship", "ecosystem", "empower"), and no sentences so plain they read as
  simplistic.
- American spelling: "program", not "programme".
- No em dashes in body copy. Use a comma, a colon, or a second sentence.
- Headings use standard title case: "Who We Are", "How IBA-USA Serves Its Members".
  Articles, short prepositions and conjunctions stay lowercase. Body copy is
  sentence case.

**Typography and layout**

- **One heading per section.** A section is an `<h2>`, then `<hr class="rule">`,
  then its content. Never a small label stacked above a heading that repeats it.
- **One body text size.** All body paragraphs inherit the base size. Smaller sizes
  belong only to interface text: card meta, captions, stat labels, notices.
- **One heading size.** `.prose h2` adjusts spacing only, never `font-size`.
- **One left edge.** Every section's content starts at the `.wrap` gutter. Section
  headings are left-aligned; only the gradient call-to-action panels are centered,
  and they are a distinct component.
- `wrap` and `prose` must go on **separate, nested elements**. Both set a
  `max-width`, so combining them on one element applies the narrower width and then
  the automatic margins center it, pushing that block away from everything else.

Colours, spacing and shadows are CSS custom properties in `:root` at the top of
`styles.css`. Change `--navy-800` or `--teal-600` and the whole site follows.

## Known gaps

- **Conference registration is an email link.** The invitation and the flyer both
  say to register at www.iba-usa.org, which is this site, so there is nothing to
  point at yet. When a registration form or ticketing page exists, replace the
  `mailto:` links on `event-conference-2026.html`. The flyer's QR code resolves to
  the site's front page for the same reason.
- **One sponsor tile has no WeChat QR code.** If a clean copy is supplied, save it
  as `assets/img/sponsors/yingxin-xue-wechat.png` and the card will display it
  automatically at 96px. No code change is needed.
- **Two contact addresses are in use**, `admin@iba-usa.org` and
  `admin@iba-usa.com`. Both appear in the footer. Worth consolidating.
- **The symposium program is 25 images**, not text, so its content is not
  searchable and not readable by a screen reader.
