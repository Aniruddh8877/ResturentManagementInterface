import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly apiUrl: string = "https://localhost:44390/api/";

  constructor(private http: HttpClient) { }

  getCategoryList(object: any) {
    return this.http.post(this.apiUrl + 'Category/CategoryList', object);
  }

  saveCategory(obj: any) {
    return this.http.post(this.apiUrl + "Category/SaveCategory", obj)
  }
  deleteCategory(obj: any) {
    return this.http.post(this.apiUrl + "Category/DeleteCategory", obj)
  }
  getStatusList(obj: any) {
    return this.http.post(this.apiUrl + "enum/StatusList", obj)
  }

  
}

