import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/services/auth.service';

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {

  // Guardamos en este array las rutas que queremos interceptar.
  const especificRoutes = ['/data'];
  const interceptedRoutes = especificRoutes.some(routes => req.url.includes(routes));

  if(!interceptedRoutes){   //Si la ruta actual no esta en la lista continua sin problemas.
    return next(req);
  }
  // Injectamos los servicios
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);

  // Recibimos el AccessToken
  const access_token = authService.getAccesToken();

  if(!access_token) {   // Si no existe saltamos un error.
    console.error("No se encontró el Access Token");
  }

  // !! Cada vez que en un interceptor modificamos la request hay que clonarla¡¡
  // Clonamos el request y le añadimos en el header de la request en token con el titulo "Authorizaton."
  const authReq = req.clone({
    setHeaders: {
      Authorization: access_token
    }
  });
  // Enviamos la request modificada para que siga su camino al Backend.
  return next(authReq).pipe( // Con pipe observamos el resultado de vuelta.
    catchError((err) => { // Recogemos si hay un error de la respuesta.

      if (err.status === 401 || err.status === 403){ // Si el código de error es 401 o 403.
        return authService.refreshToken().pipe(   // Hacemos una petición al Backend para que se refresque el Access Token.
          switchMap((res) => { // Hacemos un map de todas las respuestas.
              
            cookieService.set('access_token', res.accessToken, { // Guardamos en nuevo token en la cookies.
              path: '/',                    // Importante: asegura que la cookie está disponible en toda la app
              secure: true,                 // Para HTTPS
              sameSite: 'Strict'           // Protección CSRF
            });
            

            //Volvemos a clonar la Request y meter el token nuevo.
            const newReq = req.clone({
              setHeaders: {
                Authorization: res.accessToken
              }
            });
            return next(newReq); // Volvemos a enviar la request al Backend.
          }),
          catchError((refreshErr) => {    // Si vuelve a fallar... 
            const finalError = new Error(refreshErr);    // Guardamos el error en una constante.   

            // Borramos las cookies.
            cookieService.delete('access_token');
            cookieService.delete('refresh_token');
            
            return throwError(() => finalError);    // Enviamos el error al frontend. 
          })
        )
      }
      return throwError(() => err);   // Si los codigos de error no son el 401 o 403 enviamos el error al front.
    })
  );
};
