import { NextResponse } from "next/server";

import { getGithubData } from "@/services/github";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    const response = await getGithubData();
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
