// types/user.ts

// 로그인 후 저장될 기본 정보
export interface BasicUser {
  id: string;
  name: string;
  email: string;
  profile_image?: string;
}

// 전체 사용자 정보 (모든 컴포넌트/페이지에서 이걸 쓰게 됨)
export interface User extends BasicUser {
  phone: string | null;
  department: string | null;
  college: string | null;
  major: string | null;
  grade: number;
  trackEnabled?: boolean;
}

// 로그인 응답
export interface LoginResponse {
  status: string;
  message: string;
  data: BasicUser & {
    access_token: string;
    refresh_token: string;
  };
}

// /auth/me 또는 /auth/account 응답
export interface MeResponse {
  status: string;
  data: User;
}
