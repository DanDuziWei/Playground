import clsx from "clsx";
import type { Metric } from "@/lib/dashboard-data";

const toneMap: Record<Metric["tone"], string> = {
  blue: "from-sky-400/20 to-cyan-300/5 text-sky-200 ring-sky-300/20",
  green: "from-emerald-400/20 to-lime-300/5 text-emerald-200 ring-emerald-300/20",
  violet: "from-violet-400/20 to-fuchsia-300/5 text-violet-200 ring-violet-300/20",
  amber: "from-amber-400/20 to-orange-300/5 text-amber-200 ring-amber-300/20"
};

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="surface rounded-3xl p-5 transition duration-300 hover:-translate-y-1 hover:border-white/15">
      <div className={clsx("mb-5 inline-flex rounded-full bg-gradient-to-br px-3 py-1 text-xs font-medium ring-1", toneMap[metric.tone])}>
        {metric.delta}
      </div>
      <p className="text-sm text-slate-400">{metric.label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{metric.value}</p>
    </article>
  );
}
