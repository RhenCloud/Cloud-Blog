export default defineEventHandler(async (event) => {
  const docs = await queryCollection(event, "content").all();

  const urls: Array<{ loc: string; lastmod: string }> = [];

  // 添加静态页面
  urls.push({ loc: "/", lastmod: new Date().toISOString() });
  urls.push({ loc: "/about", lastmod: new Date().toISOString() });
  urls.push({ loc: "/archive", lastmod: new Date().toISOString() });
  urls.push({ loc: "/categories", lastmod: new Date().toISOString() });
  urls.push({ loc: "/tags", lastmod: new Date().toISOString() });

  // 添加博客文章
  docs.forEach((doc: Record<string, unknown>) => {
    if (typeof doc.path === "string" && !doc.path.includes("about")) {
      urls.push({
        loc: doc.path,
        lastmod: typeof doc._mtime === "string" ? doc._mtime : new Date().toISOString(),
      });
    }
  });

  // 获取所有分类
  const categories = new Set<string>();
  docs.forEach((doc: Record<string, unknown>) => {
    if (doc.categories && Array.isArray(doc.categories)) {
      doc.categories.forEach((cat: unknown) => {
        if (typeof cat === "string") categories.add(cat);
      });
    } else if (doc.category && Array.isArray(doc.category)) {
      doc.category.forEach((cat: unknown) => {
        if (typeof cat === "string") categories.add(cat);
      });
    } else if (typeof doc.category === "string") {
      categories.add(doc.category.toLowerCase());
    }
  });

  categories.forEach((category) => {
    urls.push({
      loc: `/categories/${category}`,
      lastmod: new Date().toISOString(),
    });
  });

  // 获取所有标签
  const tags = new Set<string>();
  docs.forEach((doc: Record<string, unknown>) => {
    if (doc.tags && Array.isArray(doc.tags)) {
      doc.tags.forEach((tag: unknown) => {
        if (typeof tag === "string") tags.add(tag.toLowerCase());
      });
    }
  });

  tags.forEach((tag) => {
    urls.push({
      loc: `/tags/${tag}`,
      lastmod: new Date().toISOString(),
    });
  });

  return urls;
});
