import { defineCollection, defineContentConfig } from "@nuxt/content";
import { asRobotsCollection } from "@nuxtjs/robots/content";
import { asSitemapCollection } from "@nuxtjs/sitemap/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      ...asRobotsCollection({
        type: "page",
        source: "blogs/**/*.md",
      }),
      ...asSitemapCollection({
        type: "page",
        source: "blogs/**/*.md",
      }),
      schema: z.object({
        date: z.date(),
      }),
      indexes: [{ columns: ["date"] }],
    }),
    about: defineCollection({
      type: "page",
      source: "about.md",
    }),
  },
});
