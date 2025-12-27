export interface BlogPost {
  title: string;
  date: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
  categories: string[];
  published: boolean;
  meta: BlogPostMeta; // 添加 meta 属性
  path: string; // 添加 path 属性
}

interface BlogPostMeta {
  image?: string;
  alt?: string;
  date?: string;
  tags?: string[];
  // 根据实际情况添加其他可能的属性
}
