import { NextResponse } from "next/server";

export async function GET() {
  try {
    const proxyUrl = "https://corsproxy.io/?";
    const redditUrl = encodeURIComponent("https://www.reddit.com/r/all/top.json?limit=4");

    const res = await fetch(`${proxyUrl}${redditUrl}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Reddit fetch failed with status", res.status);
      return NextResponse.json([], { status: 200 });
    }

    const data = await res.json();

    if (!data?.data?.children) {
      console.error("Reddit response missing children");
      return NextResponse.json([], { status: 200 });
    }

    const trends = data.data.children.map((child: any) => ({
      country: "Global",
      hashtag: `#${child.data.subreddit}`,
      shares: child.data.ups,
      link: `https://reddit.com${child.data.permalink}`,
    }));

    return NextResponse.json(trends);
  } catch (err: any) {
    console.error("Trending API error:", err);
    return NextResponse.json([], { status: 200 });
  }
}
