import { fetchAPI } from '@/app/lib/apiClient';
import { 
  AuthRequestModel, 
  AuthResponseDto, 
  AuthResponseModel, 
  AuthChangePasswordRecordDto,
  ActivateRecordDto
} from '@/app/types/auth';

import { UserRoleResponseDto } from '@/app/types/user';

export const login = async (data: AuthRequestModel): Promise<AuthResponseDto> => {
  return fetchAPI<AuthResponseDto>('/api/login', {
    method: 'POST',
    body: JSON.stringify(data)
  }, false);
};

export const logout = async (): Promise<string> => {
  return fetchAPI<string>('/api/logout', {
    method: 'POST'
  });
};

export const validateToken = async (token: string): Promise<AuthResponseModel> => {
  return fetchAPI<AuthResponseModel>(`/api/validate/${token}`, {
    method: 'GET'
  }, false);
};

export const changePassword = async (data: AuthChangePasswordRecordDto): Promise<void> => {
  return fetchAPI<void>('/api/change-password', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const activateUser = async (data: ActivateRecordDto): Promise<UserRoleResponseDto> => {
  return fetchAPI<UserRoleResponseDto>('/api/activate', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

