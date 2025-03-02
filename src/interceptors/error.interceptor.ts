import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request URL start: ' + req.url);

  return next(req).pipe(
   
    catchError((error: HttpErrorResponse) => {
      // טיפול בשגיאות
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // שגיאה בצד הלקוח
        errorMessage = `שגיאה: ${error.error.message}`;
      } else {
        // שגיאה בצד השרת
        errorMessage = `שגיאה ${error.status}: ${error.message}`;
      }
      // כאן ניתן להוסיף לוגיקה נוספת כמו שליחת השגיאה לשרת
      console.error(`שגיאה ${errorMessage}`);
      return throwError(()=> error);
    })
  );
};
