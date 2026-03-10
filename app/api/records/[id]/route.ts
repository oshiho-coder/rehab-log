import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    await prisma.record.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "記録を削除しました" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "記録の削除に失敗しました" },
      { status: 500 }
    );
  }
}