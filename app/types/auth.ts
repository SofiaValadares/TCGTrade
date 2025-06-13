import { UserRoleResponseDto } from './user';

export interface AuthRequestModel {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  jwt: string;
  ok: boolean;
  user: UserRoleResponseDto;
}

export interface AuthResponseModel {
  jwt: string;
  role: 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_GUEST';
  ok: boolean;
}

export interface AuthChangePasswordRecordDto {
  oldPassword: string;
  newPassword: string;
}

export interface ActivateRecordDto {
  cpf: string;
  email: string;
  telefone: string;
  senha: string;
}

export interface LogoutResponseDto {
  message: string;
}