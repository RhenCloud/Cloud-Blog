<script lang="ts" setup>
import type { BlogPost } from "@/types/blog";
const route = useRoute();

// Take category from route params & ensure it's a valid string
const category = computed(() => {
  const name = route.params.category || "";
  let strName = "";

  if (Array.isArray(name)) strName = name.at(0) || "";
  else strName = name;
  return strName.trim().toLowerCase(); // Convert to lowercase for case-insensitive matching
});

const { data } = await useAsyncData(`category-data-${category.value}`, () =>
  queryCollection("content")
    .all()
    .then((articles) =>
      articles.filter((article) => {
        const meta = article.meta as unknown as BlogPost;
        return (
          meta.published &&
          meta.categories?.map((cat) => cat.toLowerCase()).includes(category.value)
        ); // Case-insensitive matching
      }),
    ),
);

const formattedData = computed(() => {
  return (
    data.value
      ?.map((articles) => {
        const meta = articles.meta as unknown as BlogPost;
        return {
          path: articles.path,
          title: articles.title || "no-title available",
          description: articles.description || "no-description available",
          image: meta.image || "/blogs-img/blog.jpg",
          alt: meta.alt || "no alter data available",
          ogImage: meta.ogImage || "/blogs-img/blog.jpg",
          date: meta.date || "not-date-available",
          tags: meta.tags || [],
          published: meta.published || false,
        };
      })
      .filter((post) => post.published) || [] // Ensure only published posts are shown
  );
});

useHead({
  title: category.value,
  meta: [
    {
      name: "description",
      content: `You will find all the ${category.value} related post here`,
    },
  ],
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4">
    <CategoryTopic />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="post in formattedData"
        :key="post.title"
        :path="post.path"
        :title="post.title"
        :date="post.date"
        :description="post.description"
        :image="post.image"
        :alt="post.alt"
        :og-image="post.ogImage"
        :tags="post.tags"
        :published="post.published" />
      <BlogEmpty v-if="formattedData.length === 0" />
    </div>
  </main>
</template>
