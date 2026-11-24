import { Suspense } from "react";
import { toPageNumber } from "@/utils/movies/page-number";
import { SearchScreen } from "./search-screen";

export default function SearchPage({ searchParams }: PageProps<"/search">) {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchQueryResolver searchParams={searchParams} />
    </Suspense>
  );
}

async function SearchQueryResolver({
  searchParams,
}: Pick<PageProps<"/search">, "searchParams">) {
  const { query, page } = await searchParams;

  return (
    <SearchScreen
      query={typeof query === "string" ? query : ""}
      page={toPageNumber(page)}
    />
  );
}

function SearchFallback() {
  return (
    <main className="mx-auto flex w-[1440px] max-w-full flex-col gap-5 px-20 py-6">
      <p className="text-gray-500">검색 중...</p>
    </main>
  );
}
