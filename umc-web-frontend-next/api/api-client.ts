import ky from "ky";
import { env } from "../config/env";

// ky는 baseUrl의 마지막 경로 조각을 상대 input으로 덮어써요.
// 끝 슬래시가 없으면 "/api" + "members/me"가 "/members/me"가 돼 버려요.
const baseUrl = env.apiBaseUrl.endsWith("/")
  ? env.apiBaseUrl
  : `${env.apiBaseUrl}/`;

export const apiClient = ky.create({ baseUrl });
