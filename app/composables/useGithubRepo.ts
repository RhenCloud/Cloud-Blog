import type { MaybeRef, Ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref, toValue, watch } from "vue";

interface RepoLicense {
  name: string;
  url?: string;
}

export interface RepoInfo {
  name: string;
  fullName: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  convertStars: number | string;
  convertForks: number | string;
  watchers: number;
  language: string;
  languageColor: string;
  archived: boolean;
  visibility: "Private" | "Public";
  template: boolean;
  ownerType: "User" | "Organization";
  license: RepoLicense | null;
  updatedAt?: string;
}

interface UseGithubRepoResult {
  data: Ref<RepoInfo | null>;
  loaded: Ref<boolean>;
}

const CACHE_KEY = "__CLOUDBLOG_GITHUB_REPO__";
const CACHE_TTL = 6 * 60 * 60 * 1000;

const storage = useLocalStorage(
  CACHE_KEY,
  {} as Record<
    string,
    {
      info: RepoInfo;
      updatedAt: number;
    }
  >,
);

export function useGithubRepo(
  repo: MaybeRef<string>,
  provider: MaybeRef<"github" | "gitee" | undefined> = "github",
): UseGithubRepoResult {
  const repoRef = computed(() => {
    const info = toValue(repo);
    const [owner = "", name = ""] = info.split("/");
    return { owner: owner.trim(), name: name.trim() };
  });

  const providerRef = computed(() => toValue(provider) ?? "github");

  const data = ref<RepoInfo | null>(null);
  const loaded = ref(false);

  const fetchData = async () => {
    const { owner, name } = toValue(repoRef);
    if (import.meta.server || !owner || !name) {
      return;
    }

    const key = `${providerRef.value === "github" ? "" : `${providerRef.value}:`}${owner}/${name}`;
    const cached = storage.value[key];
    if (cached?.info?.name && Date.now() - cached.updatedAt <= CACHE_TTL) {
      data.value = cached.info;
      loaded.value = true;
      return;
    }

    loaded.value = false;
    try {
      const raw = await $fetch<RepoInfo | Record<string, unknown>>(
        `https://api.pengzhanbo.cn/${providerRef.value}/repo/${owner}/${name}`,
      );

      const res = normalizeRepoInfo(raw, `${owner}/${name}`);
      res.convertStars = convertThousand(res.stars ?? 0);
      res.convertForks = convertThousand(res.forks ?? 0);

      data.value = res;
      loaded.value = true;

      storage.value[key] = {
        info: res,
        updatedAt: Date.now(),
      };
    } catch (e) {
      loaded.value = true;
      console.error("github repo error:", e);
    }
  };

  if (import.meta.client) {
    watch([repoRef, providerRef], fetchData, { immediate: true });
  }

  return { data, loaded };
}

function convertThousand(num: number): number | string {
  if (num < 1000) return num;
  return `${(num / 1000).toFixed(1)}k`;
}

function normalizeRepoInfo(
  raw: RepoInfo | Record<string, unknown>,
  fallbackFullName: string,
): RepoInfo {
  const r = raw as Record<string, unknown>;
  const fullName = (r.fullName ?? r.full_name ?? fallbackFullName) as string;
  const name = (r.name ?? (typeof fullName === "string" ? fullName.split("/").at(1) : "")) as
    | string
    | undefined;
  const stars = (r.stars ?? r.stargazers_count ?? 0) as number;
  const forks = (r.forks ?? r.forks_count ?? 0) as number;
  const watchers = (r.watchers ?? r.subscribers_count ?? 0) as number;
  const url = (r.url ?? r.html_url ?? "") as string;
  const description = (r.description ?? "") as string;
  const language = (r.language ?? "") as string;
  const licenseRaw = r.license as Record<string, unknown> | null | undefined;
  const licenseName = (licenseRaw?.name ?? "") as string;
  const updatedAt = (r.updatedAt ?? r.updated_at) as string | undefined;

  const owner = r.owner as Record<string, unknown> | null | undefined;
  const ownerTypeValue = typeof owner?.type === "string" ? owner.type : undefined;

  return {
    name: name ?? "",
    fullName: fullName ?? "",
    description,
    url,
    stars,
    forks,
    convertStars: convertThousand(stars),
    convertForks: convertThousand(forks),
    watchers,
    language,
    languageColor: (r.languageColor ?? "") as string,
    archived: Boolean(r.archived ?? false),
    visibility: (r.visibility ?? "Public") as "Private" | "Public",
    template: Boolean(r.template ?? false),
    ownerType: (r.ownerType ?? ownerTypeValue ?? "User") as "User" | "Organization",
    license: licenseName ? { name: licenseName } : null,
    updatedAt,
  };
}
