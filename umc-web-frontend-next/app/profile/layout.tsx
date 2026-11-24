import { AuthGuard } from "./auth-guard";

// 내용이 전부 로그인 이후에 클라이언트에서 채워지는 구간이라, 정적 셸 검증 대상에서 빼요.
// (AuthGuard가 복원 전까지 비워 두므로 dev 오버레이의 instant 네비게이션 안내는 계속 떠요.)
export const instant = false;

export default function ProfileLayout({ children }: LayoutProps<"/profile">) {
  return <AuthGuard>{children}</AuthGuard>;
}
