"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewExercisePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [memo, setMemo] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!name.trim()) {
      setError("運動名を入力してください");
      return false;
    }

    if (!reps.trim()) {
      setError("回数を入力してください");
      return false;
    }

    if (Number.isNaN(Number(reps)) || Number(reps) <= 0) {
      setError("回数は1以上の数字で入力してください");
      return false;
    }

    if (!sets.trim()) {
      setError("セット数を入力してください");
      return false;
    }

    if (Number.isNaN(Number(sets)) || Number(sets) <= 0) {
      setError("セット数は1以上の数字で入力してください");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/exercises", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          reps: Number(reps),
          sets: Number(sets),
          memo: memo.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "登録に失敗しました");
        return;
      }

      router.push("/exercises");
    } catch (error) {
      console.error(error);
      setError("通信エラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="mb-2 text-sm font-medium text-sky-700">Exercises</p>
            <h1 className="text-3xl font-bold">自主トレ登録</h1>
          </div>
          <Link
            href="/"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
          >
            トップへ戻る
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                運動名 <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
                placeholder="例：スクワット"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                回数 <span className="text-rose-600">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
                placeholder="例：10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                セット数 <span className="text-rose-600">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
                placeholder="例：3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                メモ
              </label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                className="min-h-28 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
                placeholder="補足があれば入力"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? "登録中..." : "登録する"}
              </button>

              <Link
                href="/exercises"
                className="rounded-lg border border-slate-300 px-5 py-2 text-sm hover:bg-slate-100"
              >
                一覧へ戻る
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}