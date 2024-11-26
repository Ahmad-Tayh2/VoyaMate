import { environment } from "src/environments/environments.development";

export const APP_API = {
  login: `${environment.api}/auth/login`,
  recoverPassword: `${environment.api}/auth/recover-password`,
  register: `${environment.api}/auth/register`,
  confirm: `${environment.api}/auth//confirm`,
  resetPassword: `${environment.api}/auth/reset-password/`,

};
