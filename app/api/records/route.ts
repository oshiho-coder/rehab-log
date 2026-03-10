import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const records = await prisma.record.findMany({
      orderBy: {
        date: "desc",
      },
      include: {
        exercise: true,
      },
    });

    return NextResponse.json(records);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "記録一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const record = await prisma.record.create({
      data: {
        exerciseId: Number(body.exerciseId),
        date: new Date(body.date),
        completed: Boolean(body.completed),
        conditionScore: body.conditionScore
          ? Number(body.conditionScore)
          : null,
        comment: body.comment || null,
      },
    });

    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "記録の登録に失敗しました" },
      { status: 500 }
    );
  }
}