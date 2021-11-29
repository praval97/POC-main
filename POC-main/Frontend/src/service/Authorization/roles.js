import Authorization from "./Authorization";
import { ROLE_ADMIN, ROLE_USER } from "./roleNames";

export const ADMIN = Authorization([ROLE_ADMIN]);
export const USER = Authorization([ROLE_USER]);
console.log(ADMIN);
