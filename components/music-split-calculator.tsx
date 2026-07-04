"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  CircleCheck,
  CirclePlus,
  CircleX,
  RotateCcw,
  TriangleAlert,
  Trash2
} from "lucide-react";

type RoleOption = "Artist" | "Producer" | "Composer" | "Custom";

type Contributor = {
  id: string;
  name: string;
  role: string;
  roleOption: RoleOption;
  percentage: number;
};

const roleOptions: RoleOption[] = ["Artist", "Producer", "Composer", "Custom"];

function getRoleOption(role?: string): RoleOption {
  if (role === "Artist" || role === "Producer" || role === "Composer") {
    return role;
  }

  return role === "Custom" || role ? "Custom" : "Producer";
}

function createContributor(partial?: Partial<Contributor>): Contributor {
  const role = partial?.role || "Producer";

  return {
    id: partial?.id || crypto.randomUUID(),
    name: "",
    role,
    roleOption: partial?.roleOption || getRoleOption(role),
    percentage: 0,
    ...partial
  };
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format(Number.isFinite(value) ? value : 0);
}

function parseMoneyInput(value: string) {
  const parsed = Number(value.replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

function formatMoneyInput(value: string) {
  const cleaned = value.replace(/,/g, "").replace(/[^\d.]/g, "");

  if (!cleaned) {
    return "";
  }

  const hasDecimal = cleaned.includes(".");
  const [wholePart, ...decimalParts] = cleaned.split(".");
  const decimalPart = decimalParts.join("").slice(0, 2);
  const formattedWhole = wholePart
    ? new Intl.NumberFormat("en-US").format(Number(wholePart))
    : "0";

  return hasDecimal ? `${formattedWhole}.${decimalPart}` : formattedWhole;
}

function clampNumber(value: string, min: number, max?: number) {
  const parsed = Number(value);
  const safeValue = Number.isFinite(parsed) ? parsed : min;
  const withMinimum = Math.max(min, safeValue);
  return typeof max === "number" ? Math.min(max, withMinimum) : withMinimum;
}

export function MusicSplitCalculator() {
  const [songTitle, setSongTitle] = useState("");
  const [totalRevenueInput, setTotalRevenueInput] = useState("1,000");
  const [contributors, setContributors] = useState<Contributor[]>([
    { id: "producer", name: "Producer", role: "Producer", roleOption: "Producer", percentage: 50 },
    { id: "artist", name: "Artist", role: "Artist", roleOption: "Artist", percentage: 50 }
  ]);

  const totalRevenue = useMemo(
    () => parseMoneyInput(totalRevenueInput),
    [totalRevenueInput]
  );

  const totalPercentage = useMemo(
    () =>
      contributors.reduce(
        (sum, contributor) => sum + Number(contributor.percentage || 0),
        0
      ),
    [contributors]
  );

  const remainingPercentage = 100 - totalPercentage;
  const isComplete = Math.abs(totalPercentage - 100) < 0.001;
  const isOver = totalPercentage > 100;

  function updateContributor(id: string, patch: Partial<Contributor>) {
    setContributors((current) =>
      current.map((contributor) =>
        contributor.id === id ? { ...contributor, ...patch } : contributor
      )
    );
  }

  function updateContributorRole(id: string, roleOption: RoleOption) {
    updateContributor(id, {
      roleOption,
      role: roleOption === "Custom" ? "" : roleOption
    });
  }

  function removeContributor(id: string) {
    setContributors((current) =>
      current.length === 1
        ? [createContributor()]
        : current.filter((contributor) => contributor.id !== id)
    );
  }

  function clearCalculator() {
    setSongTitle("");
    setTotalRevenueInput("0");
    setContributors([createContributor()]);
  }

  return (
    <section
      aria-labelledby="calculator-title"
      className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]"
    >
      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-glow backdrop-blur-xl sm:p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-accent-400 text-ink-950">
            <Calculator aria-hidden className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold text-accent-400">Interactive calculator</p>
            <h2 id="calculator-title" className="text-2xl font-semibold text-white">
              Build your split
            </h2>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <label className="block space-y-2">
            <span className="label">Song title</span>
            <input
              className="field"
              value={songTitle}
              onChange={(event) => setSongTitle(event.target.value)}
              maxLength={120}
              placeholder="Midnight Session"
            />
          </label>

          <label className="block space-y-2">
            <span className="label">Total revenue or payment amount</span>
            <div className="flex w-full overflow-hidden rounded-md border border-white/10 bg-ink-950/70 text-sm text-white transition focus-within:border-accent-400 focus-within:ring-2 focus-within:ring-accent-400/20">
              <span className="inline-flex shrink-0 items-center border-r border-white/10 bg-white/[0.04] px-4 font-semibold text-accent-400">
                $
              </span>
              <input
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-white outline-none tabular-nums placeholder:text-slate-500"
                type="text"
                inputMode="decimal"
                value={totalRevenueInput}
                onChange={(event) => setTotalRevenueInput(formatMoneyInput(event.target.value))}
                placeholder="0.00"
              />
            </div>
          </label>

          <div className="rounded-lg border border-white/10 bg-ink-950/60 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-300">Total percentage used</p>
              <p className="text-2xl font-semibold text-white">
                {totalPercentage.toFixed(2)}%
              </p>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full ${
                  isOver
                    ? "bg-red-400"
                    : isComplete
                      ? "bg-accent-400"
                      : "bg-amber-300"
                }`}
                style={{ width: `${Math.min(totalPercentage, 100)}%` }}
              />
            </div>

            <div className="mt-4">
              {isComplete ? (
                <p className="flex items-start gap-2 text-sm text-accent-400">
                  <CircleCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  Splits equal exactly 100%. Your payout summary is ready.
                </p>
              ) : isOver ? (
                <p className="flex items-start gap-2 text-sm text-red-200">
                  <CircleX aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  Splits are {Math.abs(remainingPercentage).toFixed(2)}% over 100%.
                </p>
              ) : (
                <p className="flex items-start gap-2 text-sm text-amber-100">
                  <TriangleAlert aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
                  Splits are {remainingPercentage.toFixed(2)}% below 100%.
                </p>
              )}
            </div>
          </div>

          <div className="no-print flex flex-wrap gap-3">
            <button
              className="btn-primary"
              type="button"
              onClick={() => setContributors((current) => [...current, createContributor()])}
            >
              <CirclePlus aria-hidden className="h-4 w-4" />
              Add Contributor
            </button>
            <button className="btn-secondary" type="button" onClick={clearCalculator}>
              <RotateCcw aria-hidden className="h-4 w-4" />
              Clear Calculator
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.06] p-5 shadow-glow backdrop-blur-xl sm:p-6">
        <div className="mb-5">
          <p className="text-sm font-semibold text-accent-400">
            {songTitle.trim() || "Untitled song"}
          </p>
          <h3 className="text-2xl font-semibold text-white">Contributor payouts</h3>
          <p className="mt-1 text-sm text-slate-400">
            Based on {formatCurrency(totalRevenue)} total revenue.
          </p>
        </div>

        <div className="space-y-4">
          {contributors.map((contributor, index) => {
            const payout =
              (totalRevenue * Number(contributor.percentage || 0)) / 100;

            return (
              <div
                className="rounded-lg border border-white/10 bg-ink-950/55 p-4"
                key={contributor.id}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-200">
                    Contributor {index + 1}
                  </p>
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-red-400/30 bg-red-500/10 text-red-100 transition hover:bg-red-500/20"
                    type="button"
                    onClick={() => removeContributor(contributor.id)}
                    title="Remove contributor"
                  >
                    <Trash2 aria-hidden className="h-4 w-4" />
                    <span className="sr-only">Remove contributor</span>
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-[1fr_0.95fr_0.6fr]">
                  <label className="block space-y-2">
                    <span className="label">Name</span>
                    <input
                      className="field"
                      value={contributor.name}
                      onChange={(event) =>
                        updateContributor(contributor.id, { name: event.target.value })
                      }
                      maxLength={80}
                      placeholder="Contributor name"
                    />
                  </label>

                  <div className="space-y-2">
                    <label className="block space-y-2">
                      <span className="label">Role</span>
                      <div className="relative">
                        <select
                          className="field appearance-none pr-10"
                          value={contributor.roleOption}
                          onChange={(event) =>
                            updateContributorRole(
                              contributor.id,
                              event.target.value as RoleOption
                            )
                          }
                        >
                          {roleOptions.map((role) => (
                            <option key={role} value={role}>
                              {role}
                            </option>
                          ))}
                        </select>
                        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-slate-300">
                          ▼
                        </span>
                      </div>
                    </label>

                    {contributor.roleOption === "Custom" ? (
                      <label className="block space-y-2">
                        <span className="label">Custom role</span>
                        <input
                          className="field"
                          value={contributor.role}
                          onChange={(event) =>
                            updateContributor(contributor.id, { role: event.target.value })
                          }
                          maxLength={60}
                          placeholder="Write custom role"
                        />
                      </label>
                    ) : null}
                  </div>

                  <label className="block space-y-2">
                    <span className="label">Percentage</span>
                    <div className="flex w-full overflow-hidden rounded-md border border-white/10 bg-ink-950/70 text-sm text-white transition focus-within:border-accent-400 focus-within:ring-2 focus-within:ring-accent-400/20">
                      <input
                        className="min-w-0 flex-1 bg-transparent px-3 py-2 text-white outline-none tabular-nums placeholder:text-slate-500"
                        type="text"
                        inputMode="decimal"
                        value={contributor.percentage}
                        onChange={(event) =>
                          updateContributor(contributor.id, {
                            percentage: clampNumber(event.target.value, 0, 100)
                          })
                        }
                        placeholder="0"
                      />
                      <span className="inline-flex shrink-0 items-center border-l border-white/10 bg-white/[0.04] px-3 font-semibold text-accent-400">
                        %
                      </span>
                    </div>
                  </label>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3">
                  <p className="text-sm text-slate-300">
                    {contributor.name.trim() || "Contributor"} payout
                  </p>
                  <p className="text-xl font-semibold text-white">
                    {formatCurrency(payout)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-white/[0.06] text-slate-300">
              <tr>
                <th className="px-4 py-3 font-medium">Contributor</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Split</th>
                <th className="px-4 py-3 font-medium">Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {contributors.map((contributor) => (
                <tr key={`summary-${contributor.id}`}>
                  <td className="px-4 py-3 font-semibold text-white">
                    {contributor.name.trim() || "Contributor"}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {contributor.role.trim() || "Role"}
                  </td>
                  <td className="px-4 py-3 text-slate-300">
                    {Number(contributor.percentage || 0).toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 font-semibold text-white">
                    {formatCurrency(
                      (totalRevenue * Number(contributor.percentage || 0)) / 100
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
