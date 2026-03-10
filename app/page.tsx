import Link from "next/link";

const menuItems = [
  { href: "/exercises", label: "自主トレ一覧", desc: "登録済みの運動メニューを見る" },
  { href: "/exercises/new", label: "自主トレ登録", desc: "新しい自主トレメニューを追加する" },
  { href: "/records", label: "実施記録一覧", desc: "これまでの実施記録を確認する" },
  { href: "/records/new", label: "実施記録登録", desc: "今日の実施状況を記録する" },
  { href: "/stats", label: "実施率を見る", desc: "直近7日の実施率を確認する" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10">
          <p className="mb-2 text-sm font-medium text-sky-700">
            Rehabilitation Dashboard
          </p>
          <h1 className="mb-3 text-3xl font-bold tracking-tight">
            リハビリ進捗管理アプリ
          </h1>
          <p className="text-slate-600">
            自主トレメニュー、実施記録、実施率をまとめて管理します。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <h2 className="mb-2 text-lg font-semibold">{item.label}</h2>
              <p className="text-sm text-slate-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}