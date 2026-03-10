"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Exercise = {
  id: number;
  name: string;
};

export default function NewRecordPage() {
  const router = useRouter();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [exerciseId, setExerciseId] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(true);
  const [conditionScore, setConditionScore] = useState("");
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingExercises, setLoadingExercises] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await fetch("/api/exercises");
        const data = await res.json();
        setExercises(data);
      } catch (error) {
        console.error(error);
        setError("自主トレメニューの取得に失敗しました");
      } finally {
        setLoadingExercises(false);
      }
    };

    fetchExercises();
  }, []);

  const validateForm = () => {
    if (!exerciseId) {
      setError("運動を選択してください");
      return false;
    }

    if (!date) {
      setError("日付を入力してください");
      return false;
    }

    if (conditionScore.trim()) {
      const score = Number(conditionScore);

      if (Number.isNaN(score)) {
        setError("体調スコアは数字で入力してください");
        return false;
      }

      if (score < 1 || score > 10) {
        setError("体調スコアは1〜10の範囲で入力してください");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exerciseId: Number(exerciseId),
          date,
          completed,
          conditionScore: conditionScore.trim()
            ? Number(conditionScore)
            : null,
          comment: comment.trim() || null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "記録の登録に失敗しました");
        return;
      }

      router.push("/records");
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
            <p className="mb-2 text-sm font-medium text-sky-700">Records</p>
            <h1 className="text-3xl font-bold">実施記録登録</h1>
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
                運動 <span className="text-rose-600">*</span>
              </label>
              <select
                value={exerciseId}
                onChange={(e) => setExerciseId(e.target.value)}
                disabled={loadingExercises}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500 disabled:bg-slate-100"
              >
                <option value="">
                  {loadingExercises ? "読み込み中..." : "選択してください"}
                </option>
                {exercises.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                日付 <span className="text-rose-600">*</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                />
                実施した
              </label>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                体調スコア（1〜10）
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={conditionScore}
                onChange={(e) => setConditionScore(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
                placeholder="例：7"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                コメント
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-28 w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:border-sky-500"
                placeholder="補足があれば入力"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting || loadingExercises}
                className="rounded-lg bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {isSubmitting ? "登録中..." : "記録する"}
              </button>

              <Link
                href="/records"
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