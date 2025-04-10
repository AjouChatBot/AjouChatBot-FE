export interface AccountInfo {
  name: string;
  email: string;
  phone: string;
  department: string;
  college: string;
  major: string;
  grade: number;
}

export interface AccountResponse {
  status: string;
  data: AccountInfo;
}
