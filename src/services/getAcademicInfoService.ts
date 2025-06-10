import apiClient from './apiClient';

export interface AcademicInfoResponseData {
  autoCollect: boolean;
  useAcademicInfo: boolean;
  allowedCategories: {
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

    return res.data.data;
  };
