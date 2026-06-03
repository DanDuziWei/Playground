import { AiExecutivePanel } from "@/components/ai-executive-panel";
import { BusinessModuleCard } from "@/components/business-module-card";
import { MetricCard } from "@/components/metric-card";
import { businessModules, channelPerformance, globalMetrics, timeline } from "@/lib/dashboard-data";
import { ArrowUpRight, CalendarDays, Database, Lock, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
      <header className="surface rounded-[2rem] p-6 md:p-8">
        <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-sky-300 to-violet-400 font-semibold text-carbon shadow-glow">IX</div>
            <div>
              <p className="text-sm text-slate-400">InfinaX Group</p>
              <h1 className="text-lg font-semibold text-white">CEO Dashboard OS</h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2"><Lock className="mr-2 inline h-4 w-4" />Admin login ready</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2"><Database className="mr-2 inline h-4 w-4" />Supabase schema included</span>
          </div>
        </nav>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-sky-300/10 px-4 py-2 text-sm font-medium text-sky-100 ring-1 ring-sky-300/20">
              AI-native operating system · Phase 1 MVP
            </p>
            <h2 className="max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-white md:text-7xl">
              One command center for every InfinaX business signal.
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-400 md:text-lg">
              Centralize weekly growth, leads, conversions, operations, revenue tracking, and AI-powered executive recommendations across TFS, SoccerRangers, TFI, CloudRoute, and PlayField.
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-white">This week&apos;s CEO brief</p>
              <Sparkles className="h-5 w-5 text-sky-200" />
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-white">96 new leads</p>
            <p className="mt-2 text-sm leading-6 text-slate-400">Top-performing channel is Xiaohongshu. Biggest immediate unlock is Saturday football trial capacity plus PlayField cross-sell.</p>
            <button className="mt-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-carbon transition hover:bg-sky-100">
              Generate weekly report <ArrowUpRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <section aria-labelledby="global-overview">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Global overview</p>
            <h2 id="global-overview" className="mt-2 text-2xl font-semibold tracking-tight text-white">Executive metrics</h2>
          </div>
          <p className="hidden text-sm text-slate-500 md:block">Revenue, clients, conversions, and AI recommendations</p>
        </div>
        <div className="metric-grid grid gap-4">
          {globalMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </div>
      </section>

      <AiExecutivePanel />

      <section aria-labelledby="business-modules">
        <div className="mb-4">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-slate-500">Business modules</p>
          <h2 id="business-modules" className="mt-2 text-2xl font-semibold tracking-tight text-white">Operating intelligence by company</h2>
        </div>
        <div className="module-grid grid gap-5">
          {businessModules.map((module) => (
            <BusinessModuleCard key={module.key} module={module} />
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="surface rounded-[2rem] p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-sky-200" />
            <h2 className="text-xl font-semibold text-white">Weekly operating rhythm</h2>
          </div>
          <div className="mt-6 space-y-4">
            {timeline.map((item) => (
              <div key={`${item.time}-${item.event}`} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <p className="text-sm text-sky-200">{item.time}</p>
                <p className="mt-1 font-medium text-white">{item.event}</p>
                <p className="mt-1 text-sm text-slate-500">Owner: {item.owner}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="surface rounded-[2rem] p-6">
          <h2 className="text-xl font-semibold text-white">Lead channel performance</h2>
          <p className="mt-2 text-sm text-slate-400">Use this table as the MVP source for conversion analysis before connecting live Supabase data.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Channel</th>
                  <th className="px-4 py-3 font-medium">Leads</th>
                  <th className="px-4 py-3 font-medium">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {channelPerformance.map((channel) => (
                  <tr key={channel.channel} className="border-t border-white/10">
                    <td className="px-4 py-4 text-white">{channel.channel}</td>
                    <td className="px-4 py-4 text-slate-300">{channel.leads}</td>
                    <td className="px-4 py-4 text-emerald-200">{channel.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
