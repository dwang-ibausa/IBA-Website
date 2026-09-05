# Assets needed to make this folder fully self-contained

Everything below is optional — the site works online today, because the original
images still load from the live Squarespace CDN and the sponsor logos fall back to
clean typographic wordmarks. Adding these files makes the folder work offline and
puts the real sponsor logos on the sponsorship page.

## A. Images already on the live site (automatic)

These download themselves. From this folder, in Terminal:

```sh
sh download-assets.sh --rewrite
```

That covers: the IBA logo, the homepage hero photo, the three leadership
portraits, the 2026 BBQ poster, the 2025 group photo, and the 25 symposium
program pages. **No action needed from you beyond running the command.**

If you would rather hand them over manually, the files are:

| File | Used on |
|---|---|
| `IBA_Logo.png` | header + footer of every page, favicon |
| hero photo (laboratory) | homepage banner |
| Dongmei Wang portrait | About |
| Yi Zhu portrait | About |
| Yue Zhu portrait | About |
| 2026 BBQ poster | BBQ event page |
| 2025 BBQ group photo | Events + BBQ event page |
| 25 symposium program pages | Symposium event page |

Drop them into `assets/img/` and tell me the filenames; I'll repoint the HTML.

## B. Sponsor logos — done

All ten logos you sent are in `assets/img/sponsors/`, trimmed of their white
borders and normalised to 200px tall:

`frontage.png`, `coriell.png`, `aavnergene.png`, `admera.png`, `cravitysci.png`,
`ampseq.png`, `bmkgene.png`, `iphase.png`, `vazyme.png`, `wonderfulland.png`

Each links out to the company's site. To change a link, edit the `href` on that
tile in `sponsorship.html`.

One note: the CravitySci file you sent is only 136×36px, so it renders smaller
than the others. A larger version would sit better in the grid, but it is legible
as is.

## C. Still outstanding: one WeChat QR code

Yingxin Xue's tile is now a plain information card — her name, "Mortgage Loan
Officer, M&T Bank", and (301) 385-2928 — with no outbound link, as you asked.

I could not reproduce the WeChat QR code. In the original sponsor image it is only
about 100 pixels square with the WeChat logo sitting over the middle, and at that
size the code will not scan — I tested it against a decoder and it fails. Putting
an unscannable QR on the page would be worse than leaving it off.

If Yingxin Xue can send a clean copy of her WeChat QR, save it as:

    assets/img/sponsors/yingxin-xue-wechat.png

The card picks it up automatically and shows it at 96px. Until that file exists the
card simply omits it — nothing breaks.

## D. Conference flyer — done

The flyer you sent is in place on the Annual Conference page:

    assets/img/iba-2026-conference-flyer.jpg   (page 1, 1200px, shown beside the description)
    assets/img/iba-2026-conference-flyer.pdf   (the original, opens when the image is clicked)

I rendered the JPEG from page 1 of the PDF at 300 dpi and scaled it down, so it is
sharp on a high-resolution screen at about 275 KB.

One finding: the "Scan to register" QR code on the flyer decodes to
`https://www.iba-usa.org` — the site's front page, not a registration form. Anyone
who scans it lands on the homepage with nothing to sign up with. Worth pointing out
to your mom before the flyer circulates more widely.
