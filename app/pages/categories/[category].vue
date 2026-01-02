<script lang="ts" setup>
// import type { BlogPost } from "@/types/blog";
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
  queryCollection("content").where("published", "=", true).all(),
);

const formattedData = computed(() => {
  return (
    data.value
      ?.filter((article) =>
        article.categories?.map((cat) => cat.toLowerCase()).includes(category.value),
      )
      .map((articles) => {
        return {
          path: articles.path,
          title: articles.title || "no-title available",
          description: articles.description || "no-description available",
          image: articles.image || "/blogs-img/blog.jpg",
          alt: articles.alt || "no alter data available",
          date: articles.date || "not-date-available",
          tags: articles.tags || [],
          categories: articles.categories || [],
          published: articles.published || false,
        };
      }) || []
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
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 py-12">
    <div class="flex flex-col items-center mb-12">
      <NuxtLink
        to="/categories"
        class="flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline mb-4">
        <Icon name="heroicons:arrow-left-20-solid" />
        返回分类
      </NuxtLink>
      <div class="p-3 bg-blue-500/10 rounded-2xl mb-4">
        <Icon name="mdi:folder-multiple" size="2.5em" class="text-blue-600 dark:text-blue-400" />
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
        {{ category }}
      </h1>
      <p class="text-zinc-600 dark:text-zinc-400 text-center">
        找到 {{ formattedData.length || 0 }} 篇分类下的文章
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard
        v-for="post in formattedData"
        :key="post.title"
        :path="post.path"
        :title="post.title"
        :date="formatDate(post.date)"
        :description="post.description"
        :image="post.image"
        :alt="post.alt"
        :tags="post.tags"
        :categories="post.categories"
        :published="post.published" />
      <BlogEmpty v-if="formattedData.length === 0" />
    </div>
  </main>
</template>
