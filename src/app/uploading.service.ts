import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadingService {
  public imageForm: FormGroup;
  public DJANGO_API_SERVER: string = "https://trabajoenobra-test.herokuapp.com/api/profile-picture/";
  public DJANGO_API_SERVER_file: string = "https://trabajoenobra-test.herokuapp.com/api/files/";
  constructor(private http: HttpClient,
    public storage: StorageService,
    private builder: FormBuilder) {
      this.imageForm = this.builder.group({
        headers: ['']
       });
    }

  public uploadFormData(formData) {


     this.storage.get('TOTOKEN').then((val) => {
      console.log(val);
      this.imageForm.patchValue({headers: val});
    });

    //setTimeout (() => {
      let headers = new HttpHeaders();
      let token='token '+this.imageForm.value.headers;
      console.log(this.imageForm.value);
      console.log(this.imageForm.value);
      headers = headers.append('Authorization', token);
      return this.http.post<any>(`${this.DJANGO_API_SERVER}`, formData,{'headers':headers});
   //}, 400);
  }


  public uploadFormData_file(formData) {



     this.storage.get('TOTOKEN').then((val) => {
      console.log(val);
      this.imageForm.patchValue({headers: val});
    });
    let token='token '+this.imageForm.value.headers;
    console.log(token);
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', token);
    return this.http.post<any>(`${this.DJANGO_API_SERVER_file}`, formData,{'headers':headers});
  }
}
