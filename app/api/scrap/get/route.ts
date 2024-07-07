/** @format */

import axios from "axios";
import cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new NextResponse(JSON.stringify({ error: "URL is required" }), {
      status: 400,
    });
  }

  try {
    const { data } = await axios.get(url);
    console.log("Scraped data:", data);
    const $ = cheerio.load(data);
    const title = $('meta[property="og:title"]').attr("content") || $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") || $('meta[name="description"]').attr("content");
    const image = $('meta[property="og:image"]').attr("content") || $("img").first().attr("src");

    const metadata = {
      title,
      description,
      image,
    };

    return new NextResponse(JSON.stringify(metadata), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to scrape the URL", error);
    return new NextResponse(JSON.stringify({ error: "Failed to scrape the URL" }), {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
}
