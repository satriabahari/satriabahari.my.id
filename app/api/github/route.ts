import { NextResponse } from "next/server";
import { getGithubData } from "@/services/github";

export const GET = async () => {
  try {
    const response = await getGithubData();

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Failed to fetch" },
        { status: response.status },
      );
    }

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
