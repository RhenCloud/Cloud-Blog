export interface BlogPost {
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  ogImage: string;
  tags: string[];
  categories: string[];
  published: boolean;
  meta: Record<string, unknown>; // 添加 meta 属性
  path: string; // 添加 path 属性
}
