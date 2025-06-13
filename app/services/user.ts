import { fetchAPI } from '@/app/lib/apiClient';
import { 
  UserRecordDto, 
  UserRecordPostDto, 
  UserResponseDto, 
  UserRoleResponseDto,
  PageUserResponseDto
} from '@/app/types/user';

export const getAllUsers = async (): Promise<UserResponseDto[]> => {
  return fetchAPI<UserResponseDto[]>('/api/users', {
    method: 'GET'
  });
};

export const getOneUser = async (id: number): Promise<UserRoleResponseDto> => {
  return fetchAPI<UserRoleResponseDto>(`/api/users/${id}`, {
    method: 'GET'
  });
};

export const saveUser = async (data: UserRecordDto): Promise<UserRoleResponseDto> => {
  return fetchAPI<UserRoleResponseDto>('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const updateUser = async (id: number, data: UserRecordPostDto): Promise<UserRoleResponseDto> => {
  return fetchAPI<UserRoleResponseDto>(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  return fetchAPI<void>(`/api/users/${id}`, {
    method: 'DELETE'
  });
};

export const getAllPageUsers = async (
  page: number = 0,
  size: number = 10,
  sort: string = 'id',
  order: string = 'asc',
  name?: string,
  email?: string,
  username?: string
): Promise<PageUserResponseDto> => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
    order
  });

  if (name) params.append('name', name);
  if (email) params.append('email', email);
  if (username) params.append('username', username);

  return fetchAPI<PageUserResponseDto>(`/api/users/page?${params.toString()}`, {
    method: 'GET'
  });
}; 