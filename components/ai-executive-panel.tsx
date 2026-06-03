import { agentRoadmap, executiveInsights } from "@/lib/dashboard-data";

export function AiExecutivePanel() {
  return (
    <section className="surface overflow-hidden rounded-[2rem] p-6 shadow-glow">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-sky-200">AI Executive Assistant</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">The command layer for CEO decisions and future agents.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
            Phase 1 analyzes operating data, generates weekly reports, identifies risk, and recommends growth actions. The architecture is ready for specialized agents to connect later.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          <span className="text-emerald-200">●</span> AI layer online
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-4">
        {executiveInsights.map((insight) => {
          const Icon = insight.icon;
          return (
            <article key={insight.title} className="rounded-3xl border border-white/10 bg-black/20 p-5">
              <Icon className="h-5 w-5 text-sky-200" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold text-white">{insight.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{insight.body}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-sky-400/10 via-violet-400/10 to-transparent p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Future agent architecture</p>
            <p className="mt-1 text-sm text-slate-400">Agents share businesses, leads, activities, events, reports, and ai_insights records for auditable decisions.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {agentRoadmap.map((agent) => (
              <span key={agent} className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-slate-200">
                {agent}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
