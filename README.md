# Lumen Chapel — church website template

A single-page church website with a still "glory light" hero — a gold
cross, rays, and golden motes — and photo-rich sections in a candle-gold
and indigo "blue hour" design.

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
js/main.js      nav state, scroll reveals, still golden motes over the hero
assets/img/     placeholder photos (see below)
```

## Photos

The placeholder photos in `assets/img/` are free-to-use images from
[Unsplash](https://unsplash.com/license), downloaded and self-hosted so the
page doesn't depend on a third-party server. Swap in photos of your own
congregation by replacing the files (keep the names) or changing the `src`
and `alt` on each `<img>` in `index.html`.

| File | Used in | Unsplash image id |
| --- | --- | --- |
| `welcome-chapel.jpg` | Welcome | `photo-1438032005730-c779502df39b` |
| `worship-pews.jpg` | Worship | `photo-1519491050282-cf00c82424b4` |
| `evensong-candles.jpg` | Scripture band | `photo-1602523961358-f9f03dd557db` |
| `ministry-kids.jpg` | Kids & Youth | `photo-1503454537195-1dcabb73ffb9` |
| `ministry-music.jpg` | Sacred Music | `photo-1514119412350-e174d90d280e` |
| `ministry-pantry.jpg` | Community Pantry | `photo-1593113598332-cd288d649433` |
| `ministry-groups.jpg` | Small Groups | `photo-1543269865-cbf427effbad` |
| `ministry-prayer.jpg` | Prayer & Care | `photo-1520187044487-b2efb58f0cba` |
| `ministry-missions.jpg` | Missions | `photo-1469571486292-0ba58a3f068b` |
| `event-animals.jpg` | Blessing of the Animals | `photo-1548199973-03cce0bbc87b` |
| `event-thanksgiving.jpg` | Thanksgiving Table | `photo-1528605248644-14dd04022da1` |
| `event-christmas.jpg` | Christmas Eve | `photo-1482517967863-00e15c9b44be` |
| `sermon-bible.jpg` | Recent sermons | `photo-1509021436665-8f07dbf5bf1d` |
| `visit-chapel.jpg` | Plan a visit | `photo-1548625149-fc4a29cf7092` |

## Make it your own

- **Name & copy** — everything lives in `index.html`; the placeholder
  congregation is "Lumen Chapel" in fictional Hartsdale.
- **Colors & fonts** — design tokens at the top of `css/style.css`
  (`--night`, `--gold`, `--ivory`, …) and two Google Fonts
  (Cormorant Garamond + Jost).
- **Sections** — Welcome, Worship times, a scripture band, Ministries,
  Events & sermons, Visit; each is a self-contained `<section>`.
- **Motion** — the hero background is completely still. The only motion
  is the hero text's one-time fade-in and sections easing in on scroll,
  and both are turned off under `prefers-reduced-motion`.
