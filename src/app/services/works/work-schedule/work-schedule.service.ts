import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { WorkSchedule } from '../../../models/works/work-schedule/work-schedule.model';
@Injectable({
  providedIn: 'root'
})
export class WorkScheduleService {
  private url = 'http://localhost:3000/work_schedule';
constructor(private http: HttpClient) { }
getAll(page: any,token: any): Observable<WorkSchedule[]> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.get<WorkSchedule[]>(`${this.url}?page=${page}`, { headers: { 'x-access-token': token } }).pipe(
    tap(res => console.log(res))
  );
}

get(id: any, token: any): Observable<WorkSchedule> {
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

delete(id: any,token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.delete(`${this.url}/${id}`, { headers: { 'x-access-token': token } });
}

deleteAll(ids: any,token: any): Observable<any> {
  if (localStorage.getItem('x-access-token')) {
    token = localStorage.getItem('x-access-token');
  }
  return this.http.post(`${this.url}/deleteSelected`, ids,{ headers: { 'x-access-token': token } });
}

}
