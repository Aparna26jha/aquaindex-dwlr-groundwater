# AquaIndex

### Real-Time Groundwater Resource Evaluation Using DWLR Data

Final-year B.E. / B.Tech project · Department of Computer Science and Engineering · Academic year 2025–26

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-199900?logo=leaflet&logoColor=white)](https://leafletjs.com)
[![License](https://img.shields.io/badge/License-Academic-0B1615)](#license)

AquaIndex is a web platform that converts high-frequency Digital Water Level Recorder (DWLR) observations into maps, recharge estimates, and a local groundwater availability index for researchers and planners.

India supports a large share of the world’s population with a small share of global freshwater. Groundwater monitoring has historically relied on infrequent manual readings. National DWLR networks (on the order of **5,260** recorders in the project scope) produce dense water-level series; this application turns those series into a decision-support dashboard that can be opened in a browser and hosted at no infrastructure cost.

**Guide:** Prof. Prachitha M.

---

## Contents

- [Features](#features)
- [Modules](#modules)
- [Methodology](#methodology)
- [Dataset](#dataset)
- [System architecture](#system-architecture)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Environment](#environment)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Team](#team)
- [Limitations](#limitations)
- [References](#references)
- [License](#license)

---

## Features

| Feature | Description |
| --- | --- |
| **Network overview** | National KPIs: mean availability index, mean water level (m bgl), recovering vs declining tables, mean monsoon recharge |
| **Interactive DWLR map** | Leaflet map of representative stations, coloured by CGWB-style class (Safe, Semi-Critical, Critical, Over-Exploited) |
| **Station explorer** | Search and filter by state or assessment class; open a piezometer for its full series |
| **Trend visualisation** | Daily water level (inverted m bgl axis) with a rainfall proxy, consistent with hydrologic plotting practice |
| **Dynamic recharge** | Water-table fluctuation (WTF) estimate \(R = \sum \Delta h \cdot S_y \cdot 1000\) (mm) |
| **Availability index** | Composite 0–100 score from depth, 90-day trend, and recharge, with a Good / Moderate / Stressed / Poor label |
| **Decision-support planner** | Screening model: reduce extraction (0–50%) and compare projected water-table depth after one year |
| **Station briefing** | Short hydrologic note per site (optional Google Gemini; rule-based text if the API is unavailable) |

The interface is a single-page application. There is no AWS dependency and no dedicated application server in this release.

---

## Modules

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Overview | National summary, map, lowest-availability watchlist, state snapshot |
| `/map` | DWLR map | Filtered station list and full-screen map |
| `/station/:id` | Station | Time series, recharge, index, briefing |
| `/recharge` | Recharge | Ranked WTF recharge table and method statement |
| `/planner` | Planner | Extraction-cut slider and projected m bgl |
| `/about` | Project | Team, guide, references, scope of the prototype |

---

## Methodology

The workflow follows a data-driven evaluation pipeline.

1. **Acquisition and representation** — Each station carries identity, location, aquifer type, specific yield \(S_y\), and a CGWB-style assessment class.
2. **Time series** — About 90 daily water levels (m below ground level) spanning a pre-monsoon to monsoon window, with a rainfall proxy used in visualisation and in constructing physically plausible rises.
3. **Recharge (WTF method)** — A rise in the water table (decrease in m bgl) greater than 8 mm, multiplied by specific yield, is accumulated as millimetres of recharge. This is the water-table fluctuation approach used in groundwater resource assessment literature, including CGWB practice.
4. **Availability index** —  
   \(0.45 \times\) depth score \(+\) \(0.30 \times\) trend score \(+\) \(0.25 \times\) recharge score, scaled to 0–100.
5. **Intervention screening** — The 90-day slope of water level is extrapolated over 365 days, scaled by a user-chosen reduction in extraction, with a small additional recharge term. This is a **linear screening tool**, not a calibrated numerical groundwater model (e.g. MODFLOW).

Water level is always reported as **metres below ground level (m bgl)**. A larger value means a deeper (more stressed) water table.

---

## Dataset

The national DWLR network cited in the project statement comprises on the order of **5,260** recorders. This prototype visualises a **representative subset of 65 stations** so that the application remains fast on a student machine and on a free static host, while still covering alluvial and hard-rock settings and the full CGWB class range.

Station coordinates correspond to known districts and monitoring localities. Assessment classes follow published CGWB categories for those hydrogeologic settings (for example, intensively irrigated alluvium in Punjab and Haryana versus higher-recharge settings in parts of the northeast and Kerala).

Daily traces are **generated with a seeded generator** so that every visitor sees the same series. They are structured like DWLR records (monsoon recovery, pumping-related decline) and are **not a live telemetry feed** from CGWB, India-WRIS, or NWIC. Those operational systems are not exposed as an unauthenticated public REST API suitable for a static student website.

The Overview badge **Live tick** increments every seven seconds and applies a centimetre-scale display jitter to the latest level so the operations console does not appear frozen. It is a presentation heartbeat, not a new field measurement.

This design is appropriate for demonstration, method teaching, and interface evaluation. Connecting an authenticated national feed is a natural next step and would reuse the same station object, WTF, and index functions.

---

## System architecture

```
                    ┌─────────────────────────────────────────┐
                    │              Browser (SPA)              │
                    │  React · React Router · Tailwind CSS    │
                    └─────────────────────────────────────────┘
                       │                │                │
                       ▼                ▼                ▼
              ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐
              │ Station     │  │ Leaflet map  │  │ Optional Gemini │
              │ model + WTF │  │ CARTO / OSM  │  │ station brief   │
              │ + index     │  │ tile service │  │ (fallback local)│
              └─────────────┘  └──────────────┘  └─────────────────┘
```

All hydrologic computation runs **client-side** in JavaScript. Production output is a static `dist/` folder (HTML, CSS, JS).

### External services

| Service | Provider | Role | Credentials |
| --- | --- | --- | --- |
| Map tiles (`dark_all`) | [CARTO](https://carto.com) basemaps; geographic data © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors | Map background | None |
| Generative Language API | Google (Gemini 2.0 Flash) | Optional four-sentence station briefing | Optional `VITE_GEMINI_API_KEY` |
| CGWB / India-WRIS / NWIC | Government of India | Not queried at runtime; classes and problem context follow published assessments | — |

If Gemini is unset or the request fails, a deterministic briefing is composed from the same station statistics.

---

## Tech stack

| Layer | Technology |
| --- | --- |
| UI | React 19 |
| Bundler | Vite 5 |
| Routing | React Router 7 |
| Styling | Tailwind CSS 4 |
| Map | Leaflet, react-leaflet |
| Charts | Recharts |
| Optional NLP | Google Gemini (`gemini-2.0-flash`) |
| Hosting | Any static host (Vercel, Netlify, GitHub Pages) |

Recharge is computed in the browser so the site can be hosted as static files. The same water-table fluctuation formula can be reproduced in Python (NumPy) for offline analysis.

---

## Getting started

**Requirements:** Node.js 18 or later (20 LTS recommended).

```bash
git clone https://github.com/Aparna26jha/aquaindex-dwlr-groundwater.git
cd aquaindex-dwlr-groundwater
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Script | Command |
| --- | --- |
| Development server | `npm run dev` |
| Production build | `npm run build` |
| Preview production build | `npm run preview` |

---

## Environment

Copy `.env.example` to `.env` if you want Gemini briefings:

```bash
cp .env.example .env
```

```
VITE_GEMINI_API_KEY=your_key_here
```

Do not commit `.env`. Variables prefixed with `VITE_` are exposed to the client bundle; the key is intended only for a classroom demo. A production system should proxy the model from a server.

---

## Deployment

The app is a static site.

**Vercel (recommended)**

1. Import this GitHub repository at [vercel.com](https://vercel.com).
2. Framework preset: Vite (default).
3. Deploy. SPA routes are rewritten via `vercel.json`.

Optionally add `VITE_GEMINI_API_KEY` under Project → Settings → Environment Variables and redeploy.

**Netlify**

1. `npm run build`
2. Publish the `dist` directory, or connect the GitHub repo.
3. `public/_redirects` sends all paths to `index.html`.

---

## Project structure

```
├── public/                 # Favicon, Netlify redirects
├── src/
│   ├── App.jsx             # Shell, navigation, routes
│   ├── main.jsx
│   ├── index.css
│   ├── data/stations.js    # Station metadata, series, live tick
│   ├── lib/hydrology.js    # Index, planner, national aggregates
│   ├── lib/gemini.js       # Optional briefing + local fallback
│   ├── components/         # Map, charts, badges
│   └── pages/              # Overview, map, station, recharge, planner, about
├── vercel.json
├── vite.config.js
└── package.json
```

---

## Team

| Name | Responsibility |
| --- | --- |
| Abhishek Biswal | Data analysis and estimation logic |
| Shivam Kumar | GIS and visualisation |
| Sushant Kumar | Backend and API structure |
| Srushti S Mopagar | Architecture and user interface |

**Guide:** Prof. Prachitha M.

---

## Limitations

- Runtime data are a representative DWLR-like subset, not the full national telemetry stream.
- The planner is a screening extrapolation, not a distributed aquifer model.
- Rainfall on charts is a proxy used in the demonstration series, not an IMD station feed.
- Gemini text is assistive copy, not an official hydrogeologic opinion.

---

## References

[1] Central Ground Water Board (CGWB), “National Compilation on Dynamic Ground Water Resources of India,” Ministry of Jal Shakti, Government of India, 2024.

[2] T. J. Nicholson et al., “Real-time Monitoring of Groundwater Resources,” *Journal of Hydrology*, 2023.

[3] IEEE Standard for Sensor Data Middleware and Analytics, IEEE Std 2510-2021.

