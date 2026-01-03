<script lang="ts" setup>
const route = useRoute();

const tag = computed(() => {
  const name = route.params.tag || "";
  let strName = "";

  if (Array.isArray(name)) strName = name.at(0) || "";
  else strName = name;
  return strName;
});

const { data } = await useAsyncData(`tag-data-${tag.value}`, () =>
  queryCollection("content")
    .all()
    .then((articles) =>
      articles.filter((article) => {
        return (
          article.published && article.tags.some((t) => t.toLowerCase() === tag.value.toLowerCase())
        );
      }),
    ),
);

const formattedData = computed(() => {
  return (
    data.value?.map((articles) => {
      return {
        path: articles.path,
        title: articles.title || "no-title available",
        description: articles.description || "no-description available",
        image: articles.image || getRandomFallbackImage(),
        alt: articles.alt || "no alter data available",
        date: formatDate(articles.date) || "not-date-available",
        tags: articles.tags || [],
        published: articles.published || false,
      };
    }) || []
  );
});

useHead({
  title: `Tag: ${tag.value}`,
  meta: [
    {
      name: "description",
      content: `Explore all posts tagged with ${tag.value}`,
    },
  ],
});
</script>

<template>
  <main class="container max-w-5xl mx-auto text-zinc-600 px-4 py-12">
    <div class="flex flex-col items-center mb-12">
      <NuxtLink
        to="/tags"
        class="flex items-center gap-2 text-sm font-bold text-primary hover:underline mb-4">
        <Icon name="heroicons:arrow-left-20-solid" />
        返回标签
      </NuxtLink>
      <div class="p-3 bg-primary-10 rounded-2xl mb-4">
        <Icon name="fa-solid:tag" size="2.5em" class="text-primary" />
      </div>
      <h1
        class="text-4xl md:text-5xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 tracking-tight">
        #{{ tag }}
      </h1>
      <p class="text-zinc-600 dark:text-zinc-400 text-center">
        找到 {{ formattedData.length || 0 }} 篇关于此标签的文章
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <BlogCard
        v-for="post in formattedData"
        :key="post.title"
        :path="post.path"
        :title="post.title"
        :date="post.date"
        :description="post.description"
        :image="post.image"
        :alt="post.alt"
        :tags="post.tags"
        :published="post.published" />
      <BlogEmpty v-if="formattedData.length === 0" />
    </div>
  </main>
</template>
