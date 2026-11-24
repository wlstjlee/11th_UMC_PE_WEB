// TMDB는 500페이지까지만 조회할 수 있어요.
export const MAX_TMDB_PAGE = 500;

export function toPageNumber(page: string | string[] | undefined) {
  const parsed = Number(Array.isArray(page) ? page[0] : page);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return Math.min(parsed, MAX_TMDB_PAGE);
}
