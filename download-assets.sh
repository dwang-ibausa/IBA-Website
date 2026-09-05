#!/bin/sh
# Download the images still hosted on Squarespace into assets/img/, so the site
# has no external dependencies. See ASSETS.md.
#   sh download-assets.sh            -> download only
#   sh download-assets.sh --rewrite  -> download, then repoint the HTML at local files
set -e
cd "$(dirname "$0")"
mkdir -p assets/img

echo "Collecting image URLs…"
grep -ho 'https://images\.squarespace-cdn\.com[^"]*' ./*.html | sort -u > /tmp/iba-urls.txt
echo "Found $(wc -l < /tmp/iba-urls.txt) unique images."

rm -f /tmp/iba-map.txt
i=0
while IFS= read -r url; do
  i=$((i+1))
  name=$(printf '%s' "$url" | sed 's/?.*//' | sed 's#.*/##' | sed 's/[^A-Za-z0-9._-]/_/g')
  out="assets/img/${i}_${name}"
  [ -f "$out" ] || curl -sSL --fail -o "$out" "$url" || { echo "  ! failed: $url"; continue; }
  echo "  $out"
  printf '%s\t%s\n' "$url" "$out" >> /tmp/iba-map.txt
done < /tmp/iba-urls.txt

if [ "$1" = "--rewrite" ]; then
  echo "Rewriting HTML to use local paths…"
  while IFS="$(printf '\t')" read -r url path; do
    for f in ./*.html; do
      esc=$(printf '%s' "$url" | sed 's/[&/\]/\\&/g')
      rep=$(printf '%s' "$path" | sed 's/[&/\]/\\&/g')
      sed -i.bak "s|$esc|$rep|g" "$f"
    done
  done < /tmp/iba-map.txt
  rm -f ./*.html.bak
  echo "Done. The site no longer depends on external images."
fi
