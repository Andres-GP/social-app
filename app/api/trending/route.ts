import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://www.reddit.com/r/all/top.json?limit=4", {
      headers: {
        "User-Agent": "my-next-app",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from Reddit" }, { status: 500 });
    }

    const data = await res.json();

    const trends = data.data.children.map((child: any) => ({
      country: "Global",
      hashtag: `#${child.data.subreddit}`,
      shares: child.data.ups,
      link: `https://reddit.com${child.data.permalink}`,
    }));

    return NextResponse.json(trends);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
