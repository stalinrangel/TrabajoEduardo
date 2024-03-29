import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RefreshService } from '../../services/refresh/refresh.service';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { PhotoService } from '../services/photo.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { UploadingService } from  '../uploading.service';
import { FileUploader, FileLikeObject } from  'ng2-file-upload';
import { concat } from  'rxjs';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})

export class CurriculumPage implements OnInit {

  public fileUploader2: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver2: boolean = false;

  public fileUploader: FileUploader = new FileUploader({});
  public hasBaseDropZoneOver: boolean = false;

  public loginUserForm: FormGroup;
  public imageForm: FormGroup;
  private apiResponse;
  public subscription: any;
  public datos;
  public response;
  public loading;
  public labor_cat;
  public email;
  public p_r=[
    {
    "person": "",
    "phone": "",
    "activo":1
    }
  ];
  public j_r=[
    {
    "place": "",
    "job_position": "",
    "person": "",
    "phone": "",
    "activo": 1
    }
  ];

  public acreditaciones=[
    {
      "nombre": "",
      "file": "",
      "activo":1
      }
  ];

  constructor(public http: HttpClient,
    private builder: FormBuilder,
    public nav: NavController,
    private toastController: ToastController,
    private auth: AuthService,
    public photoService: PhotoService,
    private transfer: FileTransfer,
    private uploadingService: UploadingService,
    public storage: StorageService
    ) {

    }


 ngOnInit() {
   this.initForm();
   this.labor_categories();

 }

 addPhotoToGallery() {
    this.photoService.addNewToGallery();
    this.uploadImage();
  }
  image_user;

  s_i2(){
    this.imageForm = this.builder.group({
      profile_pic: ['Eimar', [Validators.required]],
      user_email: ['Stalin', [Validators.required]],
     });

     this.auth.subir_imagen(this.imageForm.value).subscribe(allowed => {
      if (allowed == 1) {
       // this.loading.dismiss();
        return Observable.throw("Se ha guardado con éxito");
        //this.nav.navigateForward('folder/Inbox');
      } else {
        //this.refresh.publishFormRefresh(2);
       // this.loading.dismiss();
        return Observable.throw("Error al guardar.");
        //this.nav.pop();
      }
    },
    error => {
      //this.loading.dismiss();
      console.log(error);
      //this.presentToast(error.error);
    });
  }

  s_i(){
    console.log(this.photoService.url_photo);
    const formData = new FormData();
    //formData.append('user_email', this.loginUserForm.value.email);
    formData.append('profile_pic', 'sas');
    console.log(formData.get('profile_pic'));


    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'token aa9b23f3cb7ec4a3a52e00fbe6ee3aae49b94bb3');
    /*headers = headers.append('Content-Type', 'multipart/form-data');
    headers = headers.append('enctype', 'multipart/form-data');

    /*let headers = new HttpHeaders({
    //'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    'Authorization' : 'token aa9b23f3cb7ec4a3a52e00fbe6ee3aae49b94bb3'
    });*/
    /*let headers = new HttpHeaders().set('Content-Type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    headers = headers.set('Authorization', 'token aa9b23f3cb7ec4a3a52e00fbe6ee3aae49b94bb3');*/

    var url=`${environment.api}api/profile-picture/`;

    this.http.post(url, formData, {'headers':headers})
        .toPromise()
        .then(
          data => {
            console.log(data);
          },
          msg => {
            console.log(msg);
          });

  }

  save_image(){
    //https://trabajoenobra-test.herokuapp.com/api/profile-picture/
    var datos={
      profile_pic:'asd',
      user_email:this.loginUserForm.value.email
    }
    this.imageForm = this.builder.group({
      //profile_pic: ['Eimar', [Validators.required]],
      user_email: ['Stalin', [Validators.required]],
     });
    console.log(datos);
    var headers={
      //'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
    };
    this.http.post(`${environment.api}api/profile-picture/`, this.imageForm.value)
        .toPromise()
        .then(
          data => {
            console.log(data);
          },
          msg => {
            console.log(msg);
          });
  }
  public uploadImage() {
    console.log('das');
    alert('das');
    alert(this.photoService.url_photo);
	  // Destination URL
	  var url = `${environment.api}api/profile-picture/`;

	  // File for Upload
	  var targetPath = this.photoService.url_photo;

	  // File name only
	  var filename = 'chato.jpg';

	  var options = {
	    fileKey: "profile_pic",
	    fileName: filename,
	    chunkedMode: false,
	    mimeType: "multipart/form-data",
	    params : {'fileName': filename,
                'profile_pic':this.photoService.url_photo,
                'user_email':this.loginUserForm.value.email
                },
	    headers : {
           Connection: "close",
           Authorization : "token aa9b23f3cb7ec4a3a52e00fbe6ee3aae49b94bb3",


        }
	  };

	  const fileTransfer: FileTransferObject = this.transfer.create();

	  //this.presentLoading();
	  // Use the FileTransfer to upload the image
	  fileTransfer.upload(targetPath, url, options).then(data => {
	   console.log(data);
     alert('exito');
	  }, err => {
	    console.log(err);
      alert('error4');
      alert(JSON.stringify(err));
	  });

    console.log(fileTransfer);
	}

  get_url(){
    console.log(this.photoService.photos[0]);
    this.image_user=this.photoService.photos[this.photoService.photos.length];
  }

  items;

  onChange(evt) {
    console.log(evt);
    if (evt == -1) {
      this.items = this.labor_cat.map(x => x.id);
    } else {
      let selectAllIndex = this.items.indexOf(-1);
      this.items.splice(selectAllIndex, 1);
    }
    console.log(this.items);
    //this.loginUserForm.patchValue({token_notificacion: ids.userId});
    var aux=[];
    //console.log(this.labor_cat.length);
    for(var i=0;i<this.items.length;i++){
      for(var j=0;j<this.labor_cat.length;j++){
        //console.log(this.labor_cat[j].id+' '+' '+this.items[i]);
        if(this.labor_cat[j].id==this.items[i]){
          this.labor_cat[j].grade=1;
          this.labor_cat[j].category=this.labor_cat[j].id;
          aux.push(this.labor_cat[j]);
        }
      }
    }
    console.log(aux);
    this.loginUserForm.patchValue({categories: aux});
  }


 async presentToast(text) {
  const toast = await this.toastController.create({
    message: text,
    duration: 2000
  });
  toast.present();
}

 initForm() {

    this.loginUserForm = this.builder.group({
      first_name: ['', [Validators.required]],
      second_name: ['', [Validators.required]],
      first_lastname: ['', [Validators.required]],
      second_lastname: ['', [Validators.required]],
      born: ['', [Validators.required]],
      document_number: ['', [Validators.required]],
      phone_number: ['', [Validators.required]],
      experience_years: [, [Validators.required]],
      working: [false, [Validators.required]],
      has_lodging: [false, [Validators.required]],
      has_transport: [false, [Validators.required]],
      has_tools: [false, [Validators.required]],
      user: ['', [Validators.required]],
      email: ['', [Validators.required]],
      document_type: [1, [Validators.required]],
      education: [1, [Validators.required]],
      residence: [1, [Validators.required]],
    // selec_categ: ['', [Validators.required]],
      categories: [[{"category": 1, "grade":15}], [Validators.required]],
      job_references: [[], [Validators.required]],
      personal_references: [[], [Validators.required]],
    });
    this.storage.get('TOEMAIL').then((val) => {
      console.log(val);
      this.loginUserForm.patchValue({user: val});
      this.loginUserForm.patchValue({email: val});

    });
  }

  labor_categories(){
    this.http.get(`${environment.api}api/labor-categories`)
      .toPromise()
      .then(
      data => {
        this.labor_cat=data;
        this.labor_cat=this.labor_cat.data;
        console.log(this.labor_cat[0]);
      },
      msg => {
        //observer.error(msg.error);
        //observer.complete();
      });
  }
  agregar_categ(){
    console.log(this.loginUserForm.value.selec_categ);
  }
  curriculo(){
     console.log(this.loginUserForm);

     this.loginUserForm.patchValue({personal_references: this.p_r});
     this.loginUserForm.patchValue({job_references: this.j_r});

    if (this.loginUserForm.valid) {

          if (false) {
            this.presentToast("Contraseñas no coinciden.");
          }else{
            this.auth.curriculum(this.loginUserForm.value).subscribe(allowed => {
              if (allowed == 1) {
                this.loading.dismiss();
                alert("Se ha guardado con éxito");
                return Observable.throw("Se ha guardado con éxito");

                //this.nav.navigateForward('folder/Inbox');
              } else {
                //this.refresh.publishFormRefresh(2);
                this.loading.dismiss();
                return Observable.throw("Error al guardar.");
                //this.nav.pop();
              }
            },
            error => {
              this.loading.dismiss();
              //this.presentToast(error.error);
            });
          }
        //};
      //});
    } else {
      this.presentToast("Por favor, verifica los datos.");
    }
  }

  person;
  phone;

  add_p_r(person,phone){

    console.log(person);
    console.log(phone);
    this.p_r[(this.p_r.length-1)].activo=0;
    this.p_r.push(
      {
        "person": "",
        "phone": "",
        "activo":1
        }
    );
  }
  add_j_r(){
    this.j_r[(this.j_r.length-1)].activo=0;
    this.j_r.push(
      {
        "place": "",
        "job_position": "",
        "person": "",
        "phone": "",
        "activo": 1
      }
    );
  }

  fileOverBase(event): void {
    this.hasBaseDropZoneOver = event;
  }
  getFiles(): FileLikeObject[] {
    return this.fileUploader.queue.map((fileItem) => {
      return fileItem.file;

    });
  }
  uploadFiles() {
    console.log('upload');
    let files = this.getFiles();
    let requests = [];

    files.forEach((file) => {
      let formData = new FormData();
      formData.append('file' , file.rawFile, file.name);
      formData.append('user_email' , 'e.stalinrangel@gmail.com');
      requests.push(this.uploadingService.uploadFormData_file(formData));
      console.log('upload2');
    });
    console.log('upload3');
    concat(...requests).subscribe(
      (res) => {
        let resp:any;
        console.log(res);
        resp=res;
        alert(resp.message);
        requests=[];
      },
      (err) => {
        console.log(err);
        alert(err.error.message);
        requests=[];
      }
    );
  }

  fileOverBase2(event): void {
    this.hasBaseDropZoneOver2 = event;
  }
  getFiles2(): FileLikeObject[] {
    return this.fileUploader2.queue.map((fileItem) => {
      return fileItem.file;

    });

  }
  uploadPhoto() {
    console.log('upload photo');
    let files = this.getFiles2();
    let requests = [];

    files.forEach((file) => {
      let formData = new FormData();
      formData.append('profile_pic' , file.rawFile, file.name);
      requests.push(this.uploadingService.uploadFormData(formData));

    });

    concat(...requests).subscribe(
      (res) => {
        let resp:any;
        console.log(res);
        resp=res;
        //alert(resp.message);
        alert('Error, intentelo nuevamente.');
        this.image_user=resp.url;
        requests=[];
      },
      (err) => {
        console.log(err);
        alert('Error, intentelo nuevamente.');
        requests=[];
      }
    );
  }
}

