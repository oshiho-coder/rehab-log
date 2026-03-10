import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const records = await prisma.record.findMany({
      where: {
        date: {
          gte: sevenDaysAgo,
        },
      },
    });

    const totalCount = records.length;
    const completedCount = records.filter((record) => record.completed).length;
    const notCompletedCount = totalCount - completedCount;

    const completionRate =
      totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

    return NextResponse.json({
      period: "直近7日",
      totalCount,
      completedCount,
      notCompletedCount,
      completionRate,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "統計情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}