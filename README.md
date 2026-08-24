# AquaIndex — Real-Time Groundwater Resource Evaluation Using DWLR Data

Final-year B.E. / B.Tech (CSE) web prototype.

AquaIndex is a **browser dashboard** that turns Digital Water Level Recorder (DWLR) water-level series into:

- an India map of station status
- time-series charts (metres below ground level)
- monsoon **recharge** estimates (water-table fluctuation method)
- a district **availability index** (groundwater “health”)
- a simple **extraction-cut planner** for classroom decision support

It is a **static frontend** (React + Vite). There is **no AWS**, no paid database, and no always-on backend. You can run it on a laptop and host it for free on Vercel or Netlify.

---

## 1. What problem this solves (say this to the teacher)

India depends heavily on groundwater for drinking water, irrigation, and industry. Traditional monitoring is often **manual and infrequent**, so planners see last season’s picture, not today’s water table.

DWLR stations (Central Ground Water Board / national network, about **5,260** recorders in the project statement) measure water level **frequently**. The scientific problem is not only collecting those numbers — it is **turning them into something a district officer can use**:

1. Is the water table falling or recovering this monsoon?
2. How much recharge did this piezometer capture (roughly)?
3. How stressed is this block compared with CGWB classes (Safe → Over-Exploited)?
4. If pumping were reduced, what might the water table look like in a year? (screening only)

AquaIndex is a **demonstration platform** for that workflow. It is not a replacement for CGWB’s India-WRIS / NWIC operational systems.

---

## 2. Honest statement about data (important for viva)

**This app does not download live telemetry from CGWB, India-WRIS, or a government API.**

Those feeds are not a free, documented, student-friendly REST API you can call from a browser without credentials, rate limits, and legal access. Shipping 5,260 real high-frequency series as a static website would also be heavy and inappropriate.

What we ship instead:

| Piece | What it is |
| --- | --- |
| **65 representative stations** | Real district locations (lat/lng near known monitoring areas) across Indian states |
| **CGWB-style classes** | Safe, Semi-Critical, Critical, Over-Exploited — aligned with *published assessment categories* for those kinds of districts (Punjab/Haryana over-exploited, Kerala/Assam safer, etc.) |
| **~92 days of daily levels** | Generated with a **seeded random generator** so every refresh shows the **same** scientific story, with monsoon rainfall proxy and pumping stress |
| **“Live tick”** | Tiny oscillation on the latest level every 7 seconds so the overview *looks* like a live operations console |

If asked “is this fake data?” answer: **It is a calibrated demonstration dataset, not live government telemetry.** Methods (mbgl, WTF recharge, CGWB classes) are real. The time series are synthetic but structured like DWLR records.

The badge **“demo subset 65 of 5,260 stations”** means: the *national network size in the synopsis is 5,260*; this prototype maps **65** sites so the map stays fast.

---

## 3. Meaning of: `Live tick 22 · demo subset 65 of 5,260 stations`

- **Live tick 22** — A counter on the Overview page. It starts at `0` and increases by `1` every **7 seconds**. Each tick applies a very small sine-wave jitter (about ±1 cm) to the **displayed** latest water level so the dashboard does not look frozen. It is **not** a new measurement from a field sensor.
- **demo subset 65** — Number of stations actually drawn in this website (`STATION_META` in `src/data/stations.js`).
- **of 5,260 stations** — Size of the real national DWLR network cited in the project synopsis. This app visualises a **teaching subset**, not all 5,260 recorders.

---

## 4. How to navigate in front of the teacher (demo script, ~4 minutes)

1. Open the hosted URL (or `http://localhost:5173`).
2. **Overview** — Read the four KPI cards: national index, mean water level (mbgl), falling vs recovering sites, mean WTF recharge. Point at the map (red = Over-Exploited, green = Safe). Click a district in **Lowest availability** (e.g. a Punjab or Bengaluru site).
3. **DWLR map** — Filter **State = Karnataka** or **Punjab**. Click a circle → **Open station**.
4. **Station** — Explain the **inverted Y-axis** (deeper water table is plotted downward in hydrology charts as larger mbgl; we reverse the axis so “up” on the chart is a rising water table). Bars are a **rainfall proxy**. Read WTF recharge and availability index. The paragraph is a hydrologist briefing (Gemini if the key works, otherwise a built-in note).
5. **Recharge** — Show the formula `R (mm) = Σ Δh × Sy × 1000`. Sort/filter a state. High Sy (alluvium) captures more millimetres than hard rock for the same rise.
6. **Planner** — Keep **Bengaluru Anekal**. Move **Extraction cut** to 30–40%. Show “depth avoided” vs business-as-usual. Say clearly: **screening model, not MODFLOW**.
7. **Project** — Team, guide Prof. Prachitha M., references, data disclaimer.

---

## 5. Pages and routes

| Menu | Route | What it does |
| --- | --- | --- |
| Overview | `/` | National KPIs, map, worst districts, state table |
| DWLR map | `/map` | Search, state filter, CGWB class filter, Leaflet map |
| (station) | `/station/:id` | One piezometer: chart, recharge, index, briefing |
| Recharge | `/recharge` | WTF method table for all (or one state’s) stations |
| Planner | `/planner` | Extraction-cut slider, 1-year projected mbgl |
| Project | `/about` | Team, guide, references, limitations |

---

## 6. Science implemented in code

### 6.1 Water level unit

Levels are **metres below ground level (mbgl)**. A **larger** number means a **deeper** (worse) water table. A monsoon **rise** in the water table is a **decrease** in mbgl.

### 6.2 Water-table fluctuation (WTF) recharge

Used in CGWB-style assessments:

\[
R_{\mathrm{mm}} = \sum (\Delta h \times S_y \times 1000)
\]

- \(\Delta h\) — rise in the water table (metres), only when mbgl **falls** by more than 8 mm between consecutive daily points  
- \(S_y\) — specific yield of the aquifer (alluvium ~0.10–0.16, hard rock ~0.015–0.03)  
- Result is millimetres of recharge over the May–August 2026 demo window  

Code: `src/data/stations.js` (`enrich`) and the Recharge page copy.

### 6.3 Availability index (0–100)

Weighted mix:

- **45%** depth score (shallower mbgl → higher score)  
- **30%** 90-day trend (rising table → higher score)  
- **25%** recharge score  

Mapped to health labels: Good / Moderate / Stressed / Poor.

### 6.4 Planner

Takes the 90-day slope (mbgl/day), scales it by `(1 − extractionCut%)`, adds a small extra-recharge term, extrapolates **365 days**. It is a **linear screening toy**, not a calibrated groundwater model.

---

## 7. APIs and third-party services (whose?)

| Service | Whose | Used for | Key required? |
| --- | --- | --- | --- |
| **CARTO Dark Matter tiles** | CARTO (basemap), data © OpenStreetMap contributors | Map background in `IndiaMap.jsx` (`dark_all` tiles) | No |
| **OpenStreetMap** | OSM community | Geographic reference under the tiles | No |
| **Google Gemini API** (`gemini-2.0-flash`) | Google (Generative Language API) | Optional 4-sentence station briefing | Optional `VITE_GEMINI_API_KEY` |
| **CGWB / India-WRIS / NWIC** | Government of India | **Not called.** Categories and problem statement are inspired by published CGWB assessments | N/A |

There is **no** custom backend REST API in production. Station JSON is computed **in the browser** from `src/data/stations.js`.

Gemini endpoint used when a key is present:

`POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=...`

If the key is missing, blocked by CORS, or the request fails, `src/lib/gemini.js` returns a **local briefing** so the page never depends on Google.

**Do not commit API keys.** Use `.env` locally and Vercel environment variables in production.

---

## 8. Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| UI | React 19 | Component dashboard |
| Build | Vite 5 | Fast, static `dist/` |
| Styling | Tailwind CSS 4 | Small, no CSS framework lock-in |
| Routing | React Router 7 | `/map`, `/station/:id`, … |
| Map | Leaflet + react-leaflet | Free, no Mapbox token |
| Charts | Recharts | Station + planner charts |
| Hosting target | Vercel / Netlify | Free static hosting |

Python/NumPy from the synopsis are the **team skill matrix** for analysis; this repository is the **web product**. Recharge math is implemented in JavaScript so it runs in the browser at zero hosting cost.

---

## 9. Repository layout

```
src/
  App.jsx                 # Shell, nav, routes
  main.jsx                # React entry
  index.css               # Tailwind + Leaflet theme
  data/stations.js        # 65 stations + series + live tick
  lib/hydrology.js        # Index colours, planner projection, summaries
  lib/gemini.js           # Optional Gemini + local fallback
  components/             # Map, chart, badges, sparkline
  pages/                  # Overview, map, station, recharge, planner, about
public/favicon.svg
vercel.json               # SPA rewrite for Vercel
public/_redirects         # SPA rewrite for Netlify
```

---

## 10. Run locally

Need **Node.js 18+** (20.16 is fine).

```bash
cd Groundwater
npm install
npm run dev
```

Open **http://localhost:5173**

Optional Gemini:

```bash
cp .env.example .env
# put VITE_GEMINI_API_KEY=... in .env
```

Production build check:

```bash
npm run build
npm run preview
```

---

## 11. Team and guide

| Name | Role (synopsis) |
| --- | --- |
| Abhishek Biswal | Data analysis & estimation logic |
| Shivam Kumar | GIS & visualisation |
| Sushant Kumar | Backend & API structure |
| Srushti S Mopagar | Cloud architecture & UI |

**Guide:** Prof. Prachitha M.

---

## 12. What is unique (for viva)

1. **End-to-end story in one light website** — map → station physics → recharge → health index → intervention slider.  
2. **WTF recharge on high-frequency-style daily DWLR traces**, not annual static CGWB tables alone.  
3. **Availability index** combining depth, trend, and recharge for non-specialists.  
4. **Zero-cost deploy** (static host) instead of AWS.  
5. **Honest prototype boundary**: national network size is shown, subset is mapped, live tick is labelled — not pretended to be a secret government login.

---

## 13. Limitations (say these before the teacher asks)

- Not live CGWB telemetry.  
- 65 stations, not 5,260.  
- Planner is not MODFLOW / FEFLOW.  
- Rainfall on the chart is a **proxy** used to generate the demo series, not IMD station data.  
- Gemini briefings are optional and must not be treated as official advice.

---

## 14. References (IEEE-style, from the synopsis)

[1] Central Ground Water Board (CGWB), “National Compilation on Dynamic Ground Water Resources of India,” Ministry of Jal Shakti, 2024.  
[2] T. J. Nicholson et al., “Real-time Monitoring of Groundwater Resources,” *Journal of Hydrology*, 2023.  
[3] IEEE Standard for Sensor Data Middleware and Analytics, IEEE Std 2510-2021.

---

## 15. License / classroom use

Academic demonstration. Do not present the map as an operational flood/drought warning system.
