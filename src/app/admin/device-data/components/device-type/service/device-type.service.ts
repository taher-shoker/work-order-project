import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceTypeService {

   constructor(private http: HttpClient) { }
   
     getAllDeviceType(): Observable<any> {
       return this.http.get(`device_types`);
     }
     addDeviceType(data: any): Observable<any> {
       return this.http.post(`device_types/create`, data);
     }
     updateDeviceType(data: any, id: string): Observable<any> {
       return this.http.put(`device_types/update/${id}`, data);
     }
     deleteDeviceType(id: string): Observable<any> {
       return this.http.delete(`device_types/delete/${id}`);
     }
     getDeviceTypeById(id:string): Observable<any> {
       return this.http.get(`device_types/show/${id}`)
     }
}
