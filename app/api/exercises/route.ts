import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(exercises);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const exercise = await prisma.exercise.create({
      data: {
        name: body.name,
        reps: body.reps ? Number(body.reps) : null,
        sets: body.sets ? Number(body.sets) : null,
        memo: body.memo || null,
      },
    });

    return NextResponse.json(exercise, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "登録に失敗しました" },
      { status: 500 }
    );
  }
}