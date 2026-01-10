import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const { req, res } = event.node;
  // Preserve the path after /fonts
  const forwardPath = req.url?.replace(/^\/fonts/, "") || "";
  const target = `https://fontsapi.zeoseven.com${forwardPath}`;

  const upstream = await fetch(target);
  if (!upstream.ok) {
    res.statusCode = upstream.status;
    const text = await upstream.text();
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.end(text);
    return;
  }

  const contentType = upstream.headers.get("content-type") || "application/octet-stream";
  const arrayBuffer = await upstream.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Long cache: 1 year + immutable
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  res.setHeader("Content-Type", contentType);
  res.end(buffer);
});
