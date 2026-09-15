# Working on the IBA-USA website: instructions for an AI assistant

**If you are an AI assistant and this file has been given to you, read all of it
before changing anything.** It describes a live website, the rules its owner has
set, and a workflow with real constraints. Most mistakes on this project come
from not knowing something in this file.

---

## 说明 / How to use this file

**中文：** 这份文件是写给 AI 助手看的。每次您请 AI 修改网站时，请把这份文件和需要
修改的网页文件一起上传，并告诉它："先读 AI-INSTRUCTIONS.md，再做修改。" 这样 AI
就会知道这个网站的规则，不会把内容改坏。

**English:** Upload this file together with whichever page files need changing,
and say: "Read AI-INSTRUCTIONS.md first, then make the change."

---

## 1. Who this is for and how editing actually happens

The site belongs to the **Innovative Biopharmaceutical Association – USA (IBA-USA)**,
a nonprofit in Greater Philadelphia. Its president, **Dongmei Wang**, maintains it.

She works entirely in a web browser. She cannot install software, run commands, or
use a code editor. The editing loop is:

1. She downloads the file she wants changed from GitHub, or uploads a copy to you.
2. She asks you for a change.
3. **You return the complete edited file for her to download.**
4. She uploads that file back into the GitHub repository, replacing the old one.
5. GitHub Pages republishes the site automatically, usually within a minute.

Everything below follows from that loop.

### What the workflow requires of you

- **Always return complete, whole files.** Never a snippet, a diff, a patch, or
  "replace lines 40–52 with this." She has no way to apply a fragment. Every answer
  that changes a file must end with that entire file, downloadable, ready to upload.
- **Keep the filename exactly the same.** `index.html` must come back as
  `index.html`. A renamed file creates a second page and leaves the old one live.
- **Change only what was asked.** Return the rest of the file byte-for-byte as you
  received it. Do not reformat, re-indent, reorder attributes, "modernize" the
  markup, or rewrite sections you were not asked about. Silent rewrites are the
  fastest way to undo work she has already approved.
- **Say exactly which files she must upload**, by name, at the end of your reply.
  If a change touches five files, return all five and list all five.
- **Never introduce anything that needs installing**: no build step, no npm, no
  framework, no bundler, no CSS preprocessor, no template engine. The site is plain
  HTML, CSS, and JavaScript and must stay that way. If a request seems to need
  tooling, find a way to do it without, or explain the trade-off and ask.
- **She cannot preview locally.** Advise her to check the live page after uploading,
  in **both languages**, with a hard refresh (Cmd+Shift+R or Ctrl+F5) — the browser
  caches `styles.css` and `main.js` aggressively, and a stale cache looks exactly
  like a failed upload.

---

## 2. What the site is

Eight pages, one stylesheet, one script, no dependencies.

| File | Page |
|---|---|
| `index.html` | Home |
| `about.html` | About and leadership |
| `events.html` | Event listing, split into upcoming and past |
| `membership.html` | Membership: benefits, dues, how to join |
| `sponsorship.html` | Sponsor logos |
| `event-conference-2026.html` | IBA 2026 Annual Conference |
| `event-symposium-2026.html` | 2026 Scientific Symposium |
| `event-bbq-2026.html` | 2026 BBQ & Music Festival |
| `assets/css/styles.css` | All styling. Design tokens at the top of the file |
| `assets/js/main.js` | Six numbered sections, described in part 5 |
| `assets/img/` | Flyer, two QR codes, sponsor logos in `sponsors/` |
| `README.md`, `ASSETS.md` | Notes for human maintainers |

Some images are still served from the association's old Squarespace account: the
logo, the homepage banner, the three leadership portraits, the BBQ photographs, and
the 25 symposium programme pages. They work, but they depend on an account this site
does not control. `ASSETS.md` and `download-assets.sh` explain how to bring them
in-house. Do not casually change those URLs.

---

## 3. The four rules that break things when ignored

### 3.1 Every piece of text exists twice, in English and Chinese

The site is fully bilingual with a 中文 toggle in the header. Content is written
twice, side by side, and CSS hides whichever half does not match:

```html
<h2 data-lang="en">Upcoming Events</h2>
<h2 data-lang="zh">即将举行的活动</h2>
```

**If you add or change English text, you must add or change the Chinese too.**
A block with only one language will appear in the wrong mode — English text sitting
in the middle of the Chinese site, or a paragraph vanishing entirely. This is the
single most common way to damage this site. Check both languages before you finish.

If you are not confident writing the Chinese, say so and ask, rather than leaving
one side out or guessing.

### 3.2 The header and footer are copied into all eight pages

There is no templating. The navigation bar and the footer are duplicated in every
HTML file. **Any change to the nav or footer must be made in all eight files, and
all eight must be returned.** This is deliberate — it keeps the site dependency-free
— but it means a one-line nav change is an eight-file edit.

The same applies to adding a page: it needs a nav entry in all eight existing files
plus the new one.

### 3.3 Never publish a price for an individual event

Membership dues are published: **$25 for students and postdocs, $50 for
professionals.** Rates for individual events are not. Pricing varies by event and by
year, and people see the member and non-member rates side by side when they register
— that comparison is what motivates joining. A "Conference Rates for Members" table
was built once and deliberately removed. **Do not rebuild it, do not add a rate table
to any event page, and do not quote a specific saving even as an illustration.**

One exception already on the site: the 2026 BBQ pages mention a $10 ticket. That
event has passed and the figure is part of the original invitation text, so leave it
alone. It is not a precedent for pricing future events.

### 3.4 Do not invent a mechanism that does not exist

The conference page once offered "Register by email" because no registration system
was ready. That was wrong and was removed. If something does not exist yet, say it
is coming — "Registration will open soon, details will be posted here" — rather than
substituting a plausible-looking stand-in.

---

## 4. House style

This site has been through several rounds of editing to arrive at a consistent
voice. Please match it rather than writing in your own default register.

### Writing

- **Voice:** a senior pharmaceutical executive writing formally to colleagues.
  Specific, plain, unhurried. Not promotional.
- **No em dashes ( — ) in body text.** Use a comma, a colon, or a second sentence.
  This was asked for explicitly. Page titles use `|` as a separator.
- **American spelling.** "program" not "programme". "inquiry" not "enquiry".
- **Serial (Oxford) commas.** "scientists, entrepreneurs, and investors."
- **Headings use title case.** "Who We Are", "How IBA-USA Serves Its Members",
  "Speaking and Performance Sign-Ups". Articles, short prepositions, and
  conjunctions stay lowercase. Acronyms keep their capitals. Body text stays in
  ordinary sentence case.
- **Never use "symposia" or "symposium" as a general word for IBA's events.** The
  association also runs a barbecue and music festival, and the word does not fit.
  Write "events" or "conferences". The one exception is the actual name of the
  *2026 Scientific Symposium on Translational Biomedicine* and its own page.
- **No marketing vocabulary:** avoid "platform", "cutting-edge", "flagship",
  "ecosystem", "empower", "leverage", and strings of three adjectives.
- **Do not write sentences that sound simplistic.** "Good science still needs
  funding" was rejected; "a sound scientific case still requires capital and an
  organization willing to carry it through development" is the right level.
- **Do not invent quotations**, and do not restage a sentence from a letter as a
  testimonial.
- **A call to action names the address only once.** If a button below already shows
  `admin@iba-usa.org`, the sentence above it should end with a colon and lead into
  it — "please send us an email:" — not repeat the address in the text.
- **Prefer the shorter page.** Several sections have been removed as unnecessary.
  If an image or an attached flyer already conveys something, do not also render it
  as cards, tables, or statistics. When unsure, leave it out and offer.

### Layout and typography

These rules exist because breaking them made earlier drafts look inconsistent.

- **One heading per section.** A section is an `<h2>`, then `<hr class="rule">`,
  then its content. Never a small label stacked above a heading that repeats it.
- **One body text size.** Every body paragraph inherits the base size. Smaller sizes
  belong only to interface text: card meta lines, captions, table notes.
- **One heading size.** `.prose h2` may change spacing but never `font-size`.
- **One left edge.** Every section's content starts at the same gutter. Section
  headings are left-aligned. Only the dark gradient call-to-action panels are
  centered, and they are a separate component.
- **`wrap` and `prose` must be on separate, nested elements.** Both set a
  `max-width`. Put them on one element and the narrower width wins, then the
  automatic margins center it, pushing that block away from every other section.
- **The footer stays minimal:** logo, "Contact Us", the email address, copyright.
  No navigation, no event list, no description.
- Colors, spacing, and shadows are CSS custom properties in `:root` at the top of
  `styles.css`. Change `--navy-800` or `--teal-600` and the whole site follows.

---

## 5. How the moving parts work

`assets/js/main.js` has six numbered sections. Read the one you are touching.

**1. Mobile navigation.** The hamburger menu below 860px.

**2. Language toggle.** Sets `data-site-lang` on `<html>` and remembers the choice
in `localStorage`. Two CSS rules do the actual hiding.

**3. Events sorting.** Every event card carries its date in the markup:

```html
<article class="event" data-date="2026-10-18">
```

On load, the script moves each card into the Upcoming or Past section, sorting
upcoming soonest-first and past newest-first. An event stays "upcoming" through all
of its own day. **The split maintains itself** — nobody has to move a card when a
date passes. The same dates drive the homepage list (which shows the next two
events, or the two most recent with its heading relabelled), the "no upcoming
events" note, and the "this event has already taken place" banner on each detail
page. Cards are also written into the correct section in the HTML so the page still
reads correctly if JavaScript fails.

Current events: `2026-10-18` (Annual Conference), `2026-08-22` (BBQ),
`2026-03-01` (Symposium).

**4. Optional media.** Anything marked `data-optional-media` removes itself if its
image is missing, and widens the neighbouring column. This is how a page stays
presentable before artwork arrives.

**5. Sponsor logo fallback.** If a sponsor's image file is missing, the script
replaces it with the company's name in type. A missing logo never shows a broken
image.

**6. Lightbox.** Clicking the conference flyer, or a symposium programme page, opens
it full size. Paging arrows are hidden automatically when a gallery holds only one
image.

**One CSS detail worth knowing:** `styles.css` contains
`[hidden] { display: none !important; }` near the top. A class that sets `display`
otherwise overrides the browser's own handling of the `hidden` attribute, which
silently breaks the "past event" banner and the empty-state notes. Keep that line.

---

## 6. Facts. Do not change these without being told to

- **Founded in 2025**, by the core leadership team of the former CBA-GP. Write the
  year alone, no month. (An older version of the site said "early 2026". That was
  wrong.)
- **Contact address is `admin@iba-usa.org` only.** An `admin@iba-usa.com` address
  appeared on the old site and was a typo. It should not reappear anywhere.
- **Annual dues:** students and postdocs $25, professionals $50. These are the only
  prices that should be added to the site; see 3.3.
- **Homepage statistics:** 1,000+ attendees at 2026 events, founded 2025, 30+
  sponsors and partner associations.
- **2026 Annual Conference:** 18 October 2026, 8:30 AM to 5:00 PM, The Inn at
  Villanova, 601 County Line Rd., Wayne, PA. Registration is open.
- **Leadership:** Dongmei Wang, President (Frontage Laboratories); Yi Zhu,
  President-Elect (Ionova Life Science); Yue Zhu, Immediate Past President
  (BioNTech).
- **Do not describe the 2025 summer gathering as IBA's own.** It ran under the
  previous organization's name. Attendance figures from it do not belong on this
  site.

**The old site's own text is not a reliable source.** It contained a wrong founding
date, a mistyped email address, and a weekday that did not match its date. If you
are copying a fact across from older material, check it rather than trusting it.

---

## 7. Common requests, step by step

### Change wording on a page
Edit that one file. Change both the English and the Chinese. Return the whole file.

### Add an event
1. Copy an existing `<article class="event" data-date="...">` block into the
   Upcoming list in `events.html`, and another copy at the top of the list in
   `index.html`.
2. Update `data-date`, the date block, the badge, the title, and both meta lines.
3. Create a detail page by copying `event-conference-2026.html`, and update its
   `data-event-past-notice` date to match.
4. Add the page to the navigation in all eight files if it needs its own tab.
5. Return every file you touched.

### Add or change a sponsor
Each tile in `sponsorship.html` is a link wrapping an image at
`assets/img/sponsors/<name>.png`. Copy a tile and change the `href`, `src`, `alt`,
`data-name`, and `data-name-zh`. A trimmed, transparent PNG about 400–600px wide
looks right. If the image file is not ready, the tile shows the company name
instead, so the markup can go in first.

The last tile is different: it is an information card for an individual with a phone
number rather than a website. Leave its structure alone.

### Replace the conference flyer
Three files back it: `iba-2026-conference-flyer.jpg` (1200px, shown on the page),
`iba-2026-conference-flyer-large.jpg` (2000px, opened by the lightbox), and
`iba-2026-conference-flyer.pdf` (offered as a download). All three must be replaced
together, or the page and the download will disagree.

If you cannot generate images, say so plainly and tell her what is needed, rather
than updating one file and leaving the others stale.

### Anything involving a QR code
**Decode it and check where it actually points before putting it on the page.** An
earlier flyer carried a QR code that resolved to the website's own front page, which
would have sent people in a circle. Never assume a QR code is correct because it
looks correct.

Current codes: `assets/img/register-qr.png` goes to the conference registration page
on Zeffy; `assets/img/membership-qr.png` goes to the membership signup page.

---

## 8. Before you hand files back

Check each one:

- [ ] Every text change exists in **both** English and Chinese.
- [ ] No em dashes in body text.
- [ ] Serial commas in lists of three or more.
- [ ] Headings in title case.
- [ ] No "symposia" used as a general word.
- [ ] American spelling.
- [ ] No `admin@iba-usa.com` anywhere.
- [ ] No rates added for an individual event (the historic $10 BBQ ticket stays).
- [ ] If the nav or footer changed, **all eight** HTML files are included.
- [ ] Nothing outside the requested change was rewritten or reformatted.
- [ ] Every file is returned complete and downloadable, under its original name.
- [ ] Your reply ends with a plain list of which files she needs to upload.

---

## 9. Open items, as of September 2026

- **The invitation letter says "Saturday, October 18, 2026", but that date is a
  Sunday.** The website therefore gives the date with no weekday. Whether the date
  or the day is wrong has not been settled. Do not add a weekday back without
  being told which is correct.
- **The membership signup link still carries the previous organization's name** in
  its address. It works, but anyone who looks at the link sees the old name. A new
  registration page would fix it.
- **The symposium programme is 25 images rather than text**, so its content cannot
  be searched or read aloud by a screen reader.
- **Several images still come from the old Squarespace account**, as described in
  part 2 and in `ASSETS.md`.

---

## 10. What you cannot do from a chat window, and should not pretend to

You cannot see the live site, upload anything to GitHub, or verify that a page
renders correctly. Do not claim you have checked something you have not.

If a request genuinely needs capabilities you do not have — generating images,
testing across browsers, measuring layout — say so directly and describe what you
would need. A clear "I can't do this part, here is what is needed" is far more
useful to Dongmei than a confident guess that quietly breaks a page she cannot
inspect.
