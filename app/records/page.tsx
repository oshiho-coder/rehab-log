"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type RecordItem = {
  id: number;
  date: string;
  completed: boolean;
  conditionScore: number | null;
  comment: string | null;
  exercise: {
    id: number;
    name: string;
  };
};

export default function RecordsPage() {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: number) => {
  const ok = window.confirm("この記録を削除しますか？");
  if (!ok) return;

  const res = await fetch(`/api/records/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("削除に失敗しました");
    return;
  }

  setRecords((prev) => prev.filter((record) => record.id !== id));
};
  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const res = await fetch("/api/records");
        const data = await res.json();
        setRecords(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-sky-700">Records</p>
            <h1 className="text-3xl font-bold">実施記録一覧</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/records/new"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              記録登録
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
            >
              トップへ戻る
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm">読み込み中...</div>
        ) : records.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            まだ記録がありません
          </div>
        ) : (
          <div className="grid gap-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{record.exercise.name}</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      record.completed
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {record.completed ? "実施" : "未実施"}
                  </span>
                </div>

                <div className="grid gap-2 text-sm text-slate-700">
                  <p>日付: {record.date.slice(0, 10)}</p>
                  <p>体調スコア: {record.conditionScore ?? "-"}</p>
                  <p>コメント: {record.comment ?? "-"}</p>
                </div>
                
                <div className="mt-4">
                <button
                  onClick={() => handleDelete(record.id)}
                  className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700"
                >
                  削除
                </button>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}