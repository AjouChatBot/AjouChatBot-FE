// 로그인 후 Context에 저장될 최소 정보
export interface User {
  user_id: number;
  name: string;
  email: string;
  profile_image: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  status: string;
  message: string;
  data: User & {
    access_token: string;
    refresh_token: string;
  };
}

// /auth/me 응답 타입
export interface MeResponse {
  status: string;
  data: User & {
    department: string;
    college: string;
    major: string;
    grade: number;
  };
}
