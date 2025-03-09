import { CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem('token'))
    return true;
  return false;
};
