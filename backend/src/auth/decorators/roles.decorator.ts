import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from '../enums/user-role.enum';


export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleEnum[]) => {
    console.log("roles are", roles);
    return SetMetadata(ROLES_KEY, roles)
};