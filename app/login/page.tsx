import Link from "next/link";
import { Lock, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen place-items-center px-5 py-10">
      <section className="surface w-full max-w-md rounded-[2rem] p-8">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white text-carbon">
          <Lock className="h-6 w-6" />
        </div>
        <p className="mt-6 text-sm font-medium uppercase tracking-[0.28em] text-sky-200">Admin access</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">InfinaX CEO OS login</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Phase 1 includes the Supabase client and schema foundation for admin authentication. Connect Supabase Auth to enable email, magic link, and future role-based policies.
        </p>
        <form className="mt-8 space-y-4">
          <label className="block text-sm text-slate-300">
            Email
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-sky-300/30 transition placeholder:text-slate-600 focus:ring-4" placeholder="ceo@infinax.ai" type="email" />
          </label>
          <label className="block text-sm text-slate-300">
            Password
            <input className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none ring-sky-300/30 transition placeholder:text-slate-600 focus:ring-4" placeholder="••••••••" type="password" />
          </label>
          <button className="flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 font-semibold text-carbon transition hover:bg-sky-100" type="button">
            <ShieldCheck className="mr-2 h-4 w-4" /> Continue as admin
          </button>
        </form>
        <Link className="mt-6 inline-flex text-sm text-sky-200 hover:text-white" href="/">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
