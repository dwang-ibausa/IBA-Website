# Images and other assets

Two kinds of image are used on this site, and they behave differently.

## 1. Files in this repository

| Path | Used on |
|---|---|
| `assets/img/iba-2026-conference-flyer.jpg` | Annual Conference page, beside the description |
| `assets/img/iba-2026-conference-flyer.pdf` | Opens when the flyer image is clicked |
| `assets/img/sponsors/*.png` | Sponsorship page, one per organization |

The sponsor logos are trimmed of their surrounding whitespace and scaled to 200px
tall, so they sit at a consistent optical size in the grid. If you add one, do the
same: a transparent PNG roughly 400–600px wide, cropped tight to the mark.

Filenames matter, because each tile in `sponsorship.html` points at a specific one:
`frontage.png`, `coriell.png`, `aavnergene.png`, `admera.png`, `cravitysci.png`,
`ampseq.png`, `bmkgene.png`, `iphase.png`, `vazyme.png`, `wonderfulland.png`.

A tile whose file is missing falls back to the organization's name set in type, so
nothing breaks while you are waiting for artwork.

One file is referenced but deliberately absent:
`assets/img/sponsors/yingxin-xue-wechat.png`. If a clean WeChat QR code is ever
supplied, dropping it in at that path makes it appear. Until then that card simply
omits the image.

## 2. Images still hosted on Squarespace

The association's earlier website was built on Squarespace, and several images are
still loaded from that content delivery network rather than from this repository:

- the IBA logo, in the header and footer of every page
- the homepage banner photograph
- the three leadership portraits on the About page
- the BBQ poster and the 2025 group photograph
- the 25 pages of the symposium program

These load fine today, but they depend on an account this site does not control. If
that Squarespace site is ever cancelled, the images will disappear. Making the site
self-contained is therefore worth doing at some point.

`download-assets.sh` does exactly that. From a checkout of this repository:

```sh
sh download-assets.sh            # fetch every remote image into assets/img/
sh download-assets.sh --rewrite  # …and repoint the HTML at the local copies
```

Run it, check the pages still look right, and commit the results. After that the
site has no external image dependencies.
