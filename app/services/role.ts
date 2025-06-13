import { fetchAPI } from '@/app/lib/apiClient';
import { 
  RoleRecordDto, 
  RoleResponseDto 
} from '@/app/types/user';

export const getAllRoles = async (): Promise<RoleResponseDto[]> => {
  return fetchAPI<RoleResponseDto[]>('/api/roles', {
    method: 'GET'
  });
};

export const getOneRole = async (id: number): Promise<RoleResponseDto> => {
  return fetchAPI<RoleResponseDto>(`/api/roles/${id}`, {
    method: 'GET'
  });
};

export const saveRole = async (data: RoleRecordDto): Promise<RoleResponseDto> => {
  return fetchAPI<RoleResponseDto>('/api/roles', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateRole = async (id: number, data: RoleRecordDto): Promise<RoleResponseDto> => {
  return fetchAPI<RoleResponseDto>(`/api/roles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteRole = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/roles/${id}`, {
    method: 'DELETE'
  });
}; 