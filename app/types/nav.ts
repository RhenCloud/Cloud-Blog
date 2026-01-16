export interface NavLink {
  name: string;
  path: string;
  icon?: string;
  children?: NavLink[];
}

export interface SiteMeta {
  title: string;
  description?: string;
  keywords?: string[];
  author?: string;
  url?: string;
  email?: string;
  lang?: string;
  favicon?: string;
  startTime?: string;
}

export interface TypedOptions {
  enable: boolean;
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
  backDelay?: number;
}

export interface Hero {
  title?: string;
  description?: string | string[];
  typed?: TypedOptions;
}

export interface Profile {
  avatar?: string;
  birthday?: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface LineInfo {
  name: string;
  url: string;
  ping?: boolean;
}

export interface Theme {
  background?: string;
  backgroundMobile?: string;
  color?: string;
}

export interface Footer {
  beian?: string;
  beianLink?: string;
  customHtml?: string;
  hitokoto?: {
    enable: boolean;
    type?: string;
  };
}

export interface CommentConfig {
  twikoo?: {
    enable?: boolean;
    envId?: string;
  };
}

export interface UmamiConfig {
  enable?: boolean;
  scriptUrl?: string;
  apiKey?: string;
  websiteId?: string;
  apiEndpoint?: string;
}

export interface AdConfig {
  enable?: boolean;
  ads?: [{ text?: string; link?: string; img?: string }];
}

export interface SiteConfig {
  siteMeta: SiteMeta;
  hero: Hero;
  profile: Profile;
  socialLinks: SocialLink[];
  navbar: {
    links: NavLink[];
  };
  lines?: LineInfo[];
  theme?: Theme;
  footer?: Footer;
  comment?: CommentConfig;
  umami?: UmamiConfig;
  ad?: AdConfig;
}
