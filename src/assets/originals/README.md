# Original photography

Untouched source files, exactly as supplied.

The images one level up in `src/assets/` are web-optimised derivatives of these:
resized to fit within 2560×2560 and re-encoded as progressive mozjpeg at quality 82.
That took the set from 27 MB to 4.2 MB with no visible change at any size the site
renders — the originals were print resolution, up to 5464×8192.

Nothing in this folder is imported, so it adds nothing to the bundle. It exists so the
full-resolution frames are still available for reprocessing (different crops, higher
density, print) later.

To regenerate the derivatives after replacing anything here, run the resize with
`sharp`: fit inside 2560, `withoutEnlargement`, quality 82, mozjpeg, progressive.
