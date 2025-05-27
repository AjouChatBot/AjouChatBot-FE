import apiClient from './apiClient';

export interface AcademicInfoRequest {
  auto_collect: boolean;
  use_academic_info: boolean;
  allowed_categories: {
    enrollment_info: boolean;
    admission_info: boolean;
    course_info: boolean;
    grade_info: boolean;
    registration_info: boolean;
  };
}

export interface AcademicInfoResponse {
  status: string;
  message: string;
}

export const updateAcademicInfoSettings = async (
  body: AcademicInfoRequest
): Promise<AcademicInfoResponse> => {
  const res = await apiClient.patch<AcademicInfoResponse>(
    '/account/info/academic-settings',
    body
  );
  return res.data;
};
