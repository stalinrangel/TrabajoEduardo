import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RefreshService } from '../../services/refresh/refresh.service';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})
export class CurriculumPage implements OnInit {

  public loginUserForm: FormGroup;
  private apiResponse;
  public subscription: any;
  public datos;
  public response;
  public loading;
  public labor_cat;
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

  constructor(public http: HttpClient,
    private builder: FormBuilder,
    public nav: NavController,
    private toastController: ToastController,
    private auth: AuthService,
    private storage: Storage
    ) { 
      
    }


 ngOnInit() {
   this.initForm();
   this.labor_categories();
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
    first_name: ['Eimar', [Validators.required]],
    second_name: ['Stalin', [Validators.required]],
    first_lastname: ['Rangel', [Validators.required]],
    second_lastname: ['Duran', [Validators.required]],
    born: ['1989-08-14', [Validators.required]],
    document_number: ['234234234', [Validators.required]],
    phone_number: ['234234234', [Validators.required]],
    experience_years: [2, [Validators.required]],
    working: [false, [Validators.required]],
    has_lodging: [true, [Validators.required]],
    has_transport: [true, [Validators.required]],
    has_tools: [true, [Validators.required]],
    user: ["e.stalinrangel@gmail.com", [Validators.required]],
    email: ["e.stalinrangel@gmail.com", [Validators.required]],
    document_type: [1, [Validators.required]],
    education: [1, [Validators.required]],
    residence: [1, [Validators.required]],
   // selec_categ: ['', [Validators.required]],
    categories: [[{"category": 1, "grade":15}], [Validators.required]],
    job_references: [[], [Validators.required]],
    personal_references: [[], [Validators.required]],
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
}

