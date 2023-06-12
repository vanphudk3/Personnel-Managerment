import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Shift } from '../../../models/works/shift/shift.model';
@Injectable({
  providedIn: 'root'
})
export class ShiftService {
private url = 'http://localhost:3000/shift';
constructor(private http: HttpClient) { }
getAll(page: any,token: any): Observable<Shift[]> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get<Shift[]>(`${this.url}?page=${page}`,{ headers: { 'x-access-token': token } });
}
get(id: any, token: any): Observable<Shift> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get(`${this.url}/${id}`, { headers: { 'x-access-token': token } });
}
create(data: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(this.url, data, { headers: { 'x-access-token': token } });
}
update(id: any, data: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.put(`${this.url}/${id}`, data, { headers: { 'x-access-token': token } });
}
delete(id: any, token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(`${this.url}/${id}`, { headers: { 'x-access-token': token } });
}
deleteAll(ids: any,token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(this.url, ids, { headers: { 'x-access-token': token } });
}

}
