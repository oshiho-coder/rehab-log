"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Stats = {
  period: string;
  totalCount: number;
  completedCount: number;
  notCompletedCount: number;
  completionRate: number;
};

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-sky-700">Stats</p>
            <h1 className="text-3xl font-bold">実施率</h1>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
          >
            トップへ戻る
          </Link>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm">読み込み中...</div>
        ) : !stats ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            統計情報を取得できませんでした
          </div>
        ) : (
          <>
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
              <p className="mb-2 text-sm text-slate-500">対象期間</p>
              <p className="text-2xl font-bold">{stats.period}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm text-slate-500">記録数</p>
                <p className="text-3xl font-bold">{stats.totalCount}</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm text-slate-500">実施した回数</p>
                <p className="text-3xl font-bold text-emerald-600">
                  {stats.completedCount}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm text-slate-500">未実施回数</p>
                <p className="text-3xl font-bold text-rose-600">
                  {stats.notCompletedCount}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="mb-2 text-sm text-slate-500">実施率</p>
                <p className="text-3xl font-bold text-sky-700">
                  {stats.completionRate}%
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}