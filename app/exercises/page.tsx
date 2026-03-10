"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Exercise = {
  id: number;
  name: string;
  reps: number | null;
  sets: number | null;
  memo: string | null;
};

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id: number) => {
  const ok = window.confirm("この自主トレを削除しますか？関連する記録も削除されます。");
  if (!ok) return;

  const res = await fetch(`/api/exercises/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("削除に失敗しました");
    return;
  }

  setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
};

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch("/api/exercises");
        const data = await res.json();
        setExercises(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-sky-700">Exercises</p>
            <h1 className="text-3xl font-bold">自主トレ一覧</h1>
          </div>
          <div className="flex gap-3">
            <Link
              href="/exercises/new"
              className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              新規登録
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
        ) : exercises.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            まだ登録されていません
          </div>
        ) : (
          <div className="grid gap-4">
            {exercises.map((exercise) => (
              <div
                key={exercise.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="mb-3 text-xl font-semibold">{exercise.name}</h2>
                <div className="grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                  <p>回数: {exercise.reps ?? "-"}</p>
                  <p>セット数: {exercise.sets ?? "-"}</p>
                  <p className="sm:col-span-2">メモ: {exercise.memo ?? "-"}</p>
                </div>

                <div className="mt-4">
                  <button
                    onClick={() => handleDelete(exercise.id)}
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