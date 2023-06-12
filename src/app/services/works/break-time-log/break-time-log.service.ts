import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BreakTimeLog } from '../../../models/works/break-time-log/break-time-log.model';
@Injectable({
  providedIn: 'root'
})
export class BreakTimeLogService {
private url = 'http://localhost:3000/break_time_log';
constructor(private http: HttpClient) { }
getAll(token: any): Observable<BreakTimeLog[]> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get<BreakTimeLog[]>(this.url, { headers: { 'x-access-token': token } });
}
get(id: any, token: any): Observable<BreakTimeLog> {
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
deleteAll(token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(this.url, { headers: { 'x-access-token': token } });
}

}
