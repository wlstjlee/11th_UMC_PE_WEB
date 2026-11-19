interface AccessTokenPayload {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

// JWT는 서명 검증 없이 payload만 읽어요. memberId(sub)는 응답에 없어서 토큰에서 꺼내 써요.
export function decodeAccessToken(accessToken: string): AccessTokenPayload | null {
  try {
    const payload = accessToken.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}
