# Lumen Chapel — church website template

A single-page church website with a cinematic animated hero: a slowly
rotating, photoreal depiction of the Holy Trinity — the Father, the Son,
and the Holy Spirit as a dove — over a candle-gold and indigo "blue hour"
design.

No build step. Open `index.html` in a browser, or serve the folder with
any static server:

```sh
python3 -m http.server 8000
# → http://localhost:8000
```

## Structure

```
index.html      page markup and copy
css/style.css   design tokens and all styling
js/main.js      nav state, reveals, hero video boot, golden-motes canvas
assets/         your media (see below)
```

## The hero animation

The hero `<video>` tries its sources in order:

1. `assets/hero-trinity.mp4` — a local file, if you add one
2. a hosted render generated with Everygen (media.viewmax.io)

Hosted URLs can expire, so for production **download the render from your
Everygen library and save it as `assets/hero-trinity.mp4`** (and the still
frame as `assets/hero-trinity.jpg`, then point the video's `poster`
attribute at it). If no source loads, the animated "glory light" layer
beneath the video keeps the hero looking intentional.

There are also three generated photographs in the same Everygen library
(chapel interior, choir by candlelight, thanksgiving table) you can drop
into `assets/` and add to the panels with a `<figure class="panel-photo">`.

## Make it your own

- **Name & copy** — everything lives in `index.html`; the placeholder
  congregation is "Lumen Chapel" in fictional Hartsdale.
- **Colors & fonts** — design tokens at the top of `css/style.css`
  (`--night`, `--gold`, `--ivory`, …) and two Google Fonts
  (Cormorant Garamond + Jost).
- **Sections** — Welcome, Worship times, Ministries, Events, Visit;
  each is a self-contained `<section class="section">` panel.
- **Motion** — hero entrance, scroll reveals, rotating glory rays, and
  the motes canvas all respect `prefers-reduced-motion`.
