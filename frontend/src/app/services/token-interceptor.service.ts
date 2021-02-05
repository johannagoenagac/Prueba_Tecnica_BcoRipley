import { Injectable } from '@angular/core';
import { HttpInterceptor} from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  intercept(req, next){
   const tokenizeReq = req.clone({
      setHeaders: {
        Authorization : `Bearer ${this.authservice.getToken()} `
      }
    })
    return next.handle(tokenizeReq);
  }

  constructor(private authservice: AuthService) { }
}
