import { NextRequest, NextResponse } from "next/server";
import { getAchivementCategories } from "@/services/achievements";

export const GET = async (req: NextRequest) => {
  try {
    const data = await getAchivementCategories();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
