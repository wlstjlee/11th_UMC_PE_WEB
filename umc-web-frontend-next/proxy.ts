import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// auth-store가 localStorage와 함께 써 두는 쿠키예요. 서버는 로그인 여부만 확인해요.
const ACCESS_TOKEN_COOKIE = "umcine-access-token";

const API_PREFIX = "/api";
const apiProxyTarget = process.env.API_PROXY_TARGET ?? "http://localhost:8080";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith(`${API_PREFIX}/`)) {
    return proxyToApi(request);
  }

  if (request.cookies.get(ACCESS_TOKEN_COOKIE)?.value) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

function proxyToApi(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const target = new URL(
    `${pathname.slice(API_PREFIX.length)}${search}`,
    apiProxyTarget,
  );

  // 여기서부터는 서버끼리의 호출이라 브라우저 출처 정보를 넘기지 않아요.
  // 그대로 넘기면 백엔드 CORS 필터가 허용 목록에 없는 출처라며 403을 돌려줘요.
  const headers = new Headers(request.headers);
  headers.delete("origin");
  headers.delete("referer");

  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  matcher: ["/profile", "/profile/:path*", "/api/:path*"],
};
