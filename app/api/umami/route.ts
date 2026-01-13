import { type NextRequest, NextResponse } from "next/server";
import {
  getPageViewsByDataRange,
  getWebsiteStats,
  getAllWebsiteData,
} from "@/services/umami";

export const GET = async (req: NextRequest) => {
  try {
    const domain = req.nextUrl.searchParams.get("domain");

    if (domain === "all" || !domain) {
      const combinedData = await getAllWebsiteData();
      return NextResponse.json(combinedData, { status: 200 });
    }

    const pageViews = await getPageViewsByDataRange(domain);
    const stats = await getWebsiteStats(domain);

    if (pageViews.status >= 400 || stats.status >= 400) {
      return NextResponse.json(
        {
          message:
            pageViews.error || stats.error || "Failed to fetch Umami data",
        },
        { status: pageViews.status || stats.status },
      );
    }

    return NextResponse.json(
      {
        ...pageViews.data,
        websiteStats: stats.data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
