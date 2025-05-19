import apiClient from './apiClient';

export interface AcademicInfoResponseData {
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

export const getAcademicInfoSettings =
  async (): Promise<AcademicInfoResponseData> => {
    const res = await apiClient.get<{
      status: string;
      data: AcademicInfoResponseData;
    }>('/account/info/academic-settings');
    console.log('전체 응답:', res);

    return res.data.data;
  };
