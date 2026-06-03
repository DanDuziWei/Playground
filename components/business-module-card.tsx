import type { BusinessModule } from "@/lib/dashboard-data";

export function BusinessModuleCard({ module }: { module: BusinessModule }) {
  const Icon = module.icon;

  return (
    <article className="surface flex h-full flex-col rounded-[2rem] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-4 inline-flex rounded-2xl bg-white/8 p-3 ring-1 ring-white/10">
            <Icon className="h-6 w-6 text-sky-200" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-white">{module.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">{module.description}</p>
        </div>
        <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">
          {module.health}% health
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {module.metrics.map((metric) => (
          <div key={metric.label} className="rounded-2xl border border-white/8 bg-white/[0.035] p-4">
            <p className="text-xs text-slate-500">{metric.label}</p>
            <p className="mt-1 text-lg font-semibold text-white">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Tracked operating data</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {module.focus.map((item) => (
            <span key={item} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-white">Weekly report</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {module.weekly.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-white">AI insights</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            {module.insights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-violet-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
