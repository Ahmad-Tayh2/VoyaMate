import { environment } from '../../environments/environment.development';
export const APP_API = {
  login: `${environment.api}/auth/login`,
  recoverPassword: `${environment.api}/auth/recover-password`,
  resetPassword: `${environment.api}/auth/reset-password/`,
};
