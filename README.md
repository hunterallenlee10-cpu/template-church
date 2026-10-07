# Lumen Chapel — church website template

A single-page church website with a "glory light" hero — a gold cross
with slowly turning rays and drifting golden motes — in a candle-gold and
indigo "blue hour" design.

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
js/main.js      nav state, reveals, hero motion toggle, golden-motes canvas
assets/         your media (see below)
```

## Photos

There are three generated photographs in the Everygen library
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
