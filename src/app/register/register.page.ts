import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RefreshService } from '../../services/refresh/refresh.service';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  private apiResponse;
  public subscription: any;
  public datos;
  public response;
  public loading;
  public loginUserForm: FormGroup;
  public apiuser = {
    nombre: '',
    apPaterno: '',
    apMaterno: '',
    eMail: '',
    telefono: '',
    IdFacebook: 0,
    IdGoogle: 0,
    IdTipoRegistro: 0,
    passw: '',
  };

  constructor(private builder: FormBuilder,
     public nav: NavController,
     private toastController: ToastController,
     private auth: AuthService
     ) { }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginUserForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rpassword: ['', [Validators.required]],
      token_notificacion: ['']
    });
  }


  async presentToast(text) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

  goBack(){
    this.nav.navigateForward('login');
  }
  register(){
    if (this.loginUserForm.valid) {
      //this.presentLoading();
      //this.oneSignal.getIds().then((ids) => {
        //if (ids.userId != null && ids.userId != '') {
          //this.storage.set('token_notificacionMSGRAFF',ids.userId);
          //this.loginUserForm.patchValue({token_notificacion: ids.userId});
          if (this.loginUserForm.value.password !== this.loginUserForm.value.rpassword) {
            this.presentToast("Contraseñas no coinciden.");
          }else{
            this.auth.login(this.loginUserForm.value).subscribe(allowed => {
              if (allowed == 1) {
                this.loading.dismiss();
                this.nav.navigateForward('folder/Inbox');
              } else {
                //this.refresh.publishFormRefresh(2);
                this.loading.dismiss();
                this.nav.pop();
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
}
