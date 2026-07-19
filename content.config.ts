import { defineCollection, defineContentConfig } from "@nuxt/content";
import {
  defineRobotsSchema,
  defineSitemapSchema,
  defineOgImageSchema,
  defineSchemaOrgSchema,
} from "@nuxtjs/seo/content";
import { z } from "zod";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "posts/**/*.md",
      schema: z.object({
        published: z.boolean(),
        title: z.string(),
        description: z.string(),
        date: z.date(),
        categories: z.array(z.string()),
        tags: z.array(z.string()),
        image: z.string(),
        alt: z.string(),
        robots: defineRobotsSchema(),
        sitemap: defineSitemapSchema(),
        ogImage: defineOgImageSchema(),
        schemaOrg: defineSchemaOrgSchema(),
      }),
    }),
    about: defineCollection({
      type: "page",
      source: "about.md",
    }),
  },
});
