import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupsService {
constructor(private _HttpClient:HttpClient) { }
  getbuilding():Observable<any>{
    return this._HttpClient.get('work-orders/lookups/building')
  }
  getWork_type():Observable<any>{
    return this._HttpClient.get('work-orders/lookups/work_types')
  }
  getSource():Observable<any>{
    return this._HttpClient.get('work-orders/lookups/sources')
  }
  getReport():Observable<any>{
    return this._HttpClient.get('work-orders/lookups/reports')
  }
  getEquipment():Observable<any>{
    return this._HttpClient.get('work-orders/lookups/equipment')
  }
  getDepartment():Observable<any>{
    return this._HttpClient.get('work-orders/lookups/departments')
  }
  getDepartmentById(id:number):Observable<any>{
    return this._HttpClient.get(`work-orders/get_department_by_id/${id}`)
  }
  getStatus():Observable<any>{
    return this._HttpClient.get('work-orders/lookups/statuses')
  }
}
