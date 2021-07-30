import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {

  public DJANGO_API_SERVER: string = "https://trabajoenobra-test.herokuapp.com/api/profile-picture/";
  constructor(private http: HttpClient) { }

  public uploadFormData(formData) {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'token aa9b23f3cb7ec4a3a52e00fbe6ee3aae49b94bb3');
    return this.http.post<any>(`${this.DJANGO_API_SERVER}`, formData,{'headers':headers});
  }
}
