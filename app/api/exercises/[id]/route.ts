import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const exerciseId = Number(id);

    await prisma.record.deleteMany({
      where: {
        exerciseId,
      },
    });

    await prisma.exercise.delete({
      where: {
        id: exerciseId,
      },
    });

    return NextResponse.json({ message: "自主トレを削除しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "自主トレの削除に失敗しました" },
      { status: 500 }
    );
  }
}