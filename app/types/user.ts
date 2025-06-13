import { BaseAuditFields, BasePageResponse } from './common';

export type RoleName = 'ROLE_ADMIN' | 'ROLE_USER' | 'ROLE_GUEST';

export interface RoleModel extends BaseAuditFields {
  idRole: number;
  roleName: RoleName;
  authority: string;
}

export interface RoleRecordDto {
  roleName: RoleName;
}

export interface RoleResponseDto extends RoleModel {}

export interface UserRecordDto {
  name: string;
  email: string;
  username: string;
  password: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  roles?: RoleModel[];
}

export interface UserRecordPostDto {
  name: string;
  email: string;
  username: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
  roles?: RoleModel[];
}

export interface UserResponseDto {
  idUser: number;
  name: string;
  email: string;
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
  telefone: string;
}

export interface UserRoleResponseDto extends UserResponseDto {
  roles: RoleModel[];
}

export interface PageUserResponseDto extends BasePageResponse<UserResponseDto> {} 