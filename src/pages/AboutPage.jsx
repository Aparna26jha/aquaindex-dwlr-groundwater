const team = [
  { name: 'Abhishek Biswal', role: 'Data analysis & estimation logic', skills: 'Python, NumPy, recharge engine' },
  { name: 'Shivam Kumar', role: 'GIS & visualisation', skills: 'Leaflet, charts, district map' },
  { name: 'Sushant Kumar', role: 'Backend & API structure', skills: 'REST-shaped data layer, station model' },
  { name: 'Srushti S Mopagar', role: 'Architecture & UI', skills: 'React, Tailwind, deployment' },
]

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <div>
        <h1 className="serif text-3xl">Real-Time Groundwater Resource Evaluation Using DWLR Data</h1>
        <p className="mt-3 text-sm leading-relaxed text-[#8aa4a0]">
          Guide: Prof. Prachitha M. This web prototype is a lightweight, free-to-host dashboard. It does not use AWS. A
          representative set of DWLR-like stations stands in for the national network of 5,260 recorders so the app stays
          fast on a student laptop and on a free static host.
        </p>
      </div>

      <section>
        <h2 className="serif text-xl">What the app does</h2>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[#c5d6d2]">
          <li>Shows high-frequency water-level trends on an India map and station charts.</li>
          <li>Estimates monsoon recharge with the water-table fluctuation method.</li>
          <li>Publishes a local availability index (groundwater health) per district site.</li>
          <li>Lets planners screen extraction-cut scenarios before a full hydrogeological model.</li>
        </ul>
      </section>

      <section>
        <h2 className="serif text-xl">Team</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {team.map((m) => (
            <div key={m.name} className="rounded-2xl border border-[#243836] bg-[#12211f] p-4">
              <div className="font-medium">{m.name}</div>
              <div className="text-sm text-[#3dba9a]">{m.role}</div>
              <div className="mt-1 text-xs text-[#8aa4a0]">{m.skills}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-xs leading-relaxed text-[#8aa4a0]">
        <h2 className="serif mb-2 text-xl text-[#e7f1ee]">References</h2>
        <p>[1] CGWB, National Compilation on Dynamic Ground Water Resources of India, Ministry of Jal Shakti, 2024.</p>
        <p className="mt-1">[2] T. J. Nicholson et al., Real-time Monitoring of Groundwater Resources, Journal of Hydrology, 2023.</p>
        <p className="mt-1">[3] IEEE Std 2510-2021, Sensor Data Middleware and Analytics.</p>
        <p className="mt-3">
          Demo series are structured to match published CGWB classes (Safe to Over-Exploited) for well-known districts.
          They are not a live CGWB telemetry feed.
        </p>
      </section>
    </main>
  )
}
