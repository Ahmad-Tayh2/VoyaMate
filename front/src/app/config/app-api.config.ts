import { environment } from "src/environments/environments.development";

export const APP_API = {
  login: `${environment.api}/api/auth/login`,
  recoverPassword: `${environment.api}/api/auth/recover-password`,
  register: `${environment.api}/api/auth/register`,
  confirm: `${environment.api}/api/auth/confirm-email`,
  resetPassword: `${environment.api}/api/auth/reset-password/`,
  getItineraries : `${environment.api}/api/itinerary`,
  user : `${environment.api}/api/users`,

};

export const tokenName = 'access_token';
