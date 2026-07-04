import Link from "next/link";
import { ArrowDown, BadgeDollarSign, Clock3, Music2, Percent } from "lucide-react";
import { HeroVisual } from "@/components/hero-visual";
import { MusicSplitCalculator } from "@/components/music-split-calculator";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="no-print relative flex min-h-[72svh] items-center px-4 py-16 sm:px-6 lg:px-8">
        <HeroVisual />
        <div className="absolute inset-0 bg-ink-950/35" />
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold text-accent-400 backdrop-blur">
            <Music2 aria-hidden className="h-4 w-4" />
            For producers, artists, and collaborators
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl">
            Music Split Calculator
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Calculate payout percentages for each song in seconds. Add contributors,
            assign splits, and print a clean summary before you send payments.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="btn-primary" href="#calculator">
              Start calculating
              <ArrowDown aria-hidden className="h-4 w-4" />
            </Link>
            <Link className="btn-secondary" href="#how-it-works">
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section id="calculator" className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-6xl">
          <p className="text-sm font-semibold text-accent-400">No accounts. No saved data.</p>
          <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
            Calculate the split while the session is fresh.
          </h2>
        </div>
        <MusicSplitCalculator />
      </section>

      <section id="how-it-works" className="no-print px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-sm font-semibold text-accent-400">How it works</p>
            <h2 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              A simple workflow for clean payout conversations.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BadgeDollarSign,
                title: "Enter the amount",
                text: "Use the total royalty revenue, sync fee, advance, or any payment pool."
              },
              {
                icon: Percent,
                title: "Assign percentages",
                text: "Add each contributor and set the split they should receive."
              },
              {
                icon: Clock3,
                title: "Review instantly",
                text: "See warnings below 100%, errors above 100%, and a ready summary at 100%."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article
                  className="rounded-lg border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl"
                  key={item.title}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-white/[0.07] text-accent-400">
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <footer className="no-print border-t border-white/10 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-white">Music Split Calculator</p>
          <p>For booking, production, or split-sheet questions: hello@musicsplitcalculator.com</p>
        </div>
      </footer>
    </main>
  );
}
