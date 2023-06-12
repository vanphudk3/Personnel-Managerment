import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
const baseUrl = 'http://localhost:3000/user/register';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

constructor(private http: HttpClient) { }

register(data: any): any {
  return this.http.post(baseUrl, data).pipe(
    tap(res => console.log(res))
  );
}

}
