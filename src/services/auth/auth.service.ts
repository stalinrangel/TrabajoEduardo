import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController, Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usuario: any;

  constructor(public http: HttpClient, public storage: StorageService, public nav: NavController) {}

 public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}api/token/login`, credentials)
        .toPromise()
        .then(
          data => {
            this.usuario = data;
            console.log(data);
            this.nav.navigateForward('curriculum');
            /*this.storage.setObject('MASSGGRAPROV1',credentials);
            if(this.usuario.user.tipo_usuario == 3 || this.usuario.user.tipo_usuario == 4){
              this.storage.set('TKMASSGGRAPROV',this.usuario.token);
              this.storage.set('IDMASSGGRAPROV',this.usuario.user.repartidor.id);
              this.storage.setObject('USMASSGGRAPROV', this.usuario.user);
              observer.next(1);
              observer.complete();
            } else {
              this.storage.set('TKMASSGGRA',this.usuario.token);
              this.storage.setObject('USMASSGGRA', this.usuario.user);
              observer.next(0);
              observer.complete();
            }*/

          },
          msg => {
            observer.error(msg.error);
            observer.complete();
          });
      });
    }
  }

  public loginSocial(credentials) {
    if (credentials.email === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}login/app`, credentials)
        .toPromise()
        .then(
          data => {
            this.usuario = data;
            this.storage.set('TKMASSGGRA',this.usuario.token);
            this.storage.setObject('USMASSGGRA', this.usuario.user);
            observer.next(true);
            observer.complete();
          },
          msg => {
            observer.error(msg.error);
            observer.complete();
          });
      });
    }
  }

  public registerSocial(credentials) {
    if (credentials.nombre === null || credentials.email === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}usuarios`, credentials)
        .toPromise()
        .then(
        data => {
          this.msgNewRegister(credentials.email, credentials.nombre);
          //this.msgNewRegister('massage.graf.app@gmail.com', credentials.nombre);
          this.usuario = data;
          this.storage.set('TKMASSGGRA',this.usuario.token);
          this.storage.setObject('USMASSGGRA', this.usuario.usuario);
          observer.next(true);
          observer.complete();
        },
        msg => {
          observer.error(msg.error);
          observer.complete();
        });
      });
    }
  }

  public registrar(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}api/users/`, credentials)
        .toPromise()
        .then(
        data => {
          console.log(data);
          //this.msgNewRegister(credentials.email, credentials.nombre);
          //this.msgNewRegister('massage.graf.app@gmail.com', credentials.nombre);
          //this.usuario = data;
          //this.storage.setObject('MASSGGRAPROV1',credentials);
          //this.storage.set('TKMASSGGRA',this.usuario.token);
          //this.storage.setObject('USMASSGGRA', this.usuario.usuario);
          //observer.next(true);
          //observer.complete();
        },
        msg => {
          observer.error(msg.error);
          observer.complete();
        });
      });
    }
  }
  public curriculum(credentials) {
    if (credentials.email === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}api/candidates`, credentials)
        .toPromise()
        .then(
        data => {
          console.log(data);
          //this.msgNewRegister(credentials.email, credentials.nombre);
          //this.msgNewRegister('massage.graf.app@gmail.com', credentials.nombre);
          //this.usuario = data;
          //this.storage.setObject('MASSGGRAPROV1',credentials);
          //this.storage.set('TKMASSGGRA',this.usuario.token);
          //this.storage.setObject('USMASSGGRA', this.usuario.usuario);
          //observer.next(true);
          //observer.complete();
        },
        msg => {
          observer.error(msg.error);
          observer.complete();
        });
      });
    }
  }
  public subir_imagen(credentials) {
    if (credentials === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        let headers = new HttpHeaders();
        headers = headers.append('Authorization', 'token aa9b23f3cb7ec4a3a52e00fbe6ee3aae49b94bb3');
        this.http.post(`${environment.api}api/profile-picture/`, credentials, {'headers':headers})
        .toPromise()
        .then(
        data => {
          console.log(data);
        },
        msg => {
          observer.error(msg.error);
          observer.complete();
        });
      });
    }
  }
  public labor_categories(credentials) {
    return Observable.create(observer => {
      this.http.get(`${environment.api}api/labor-categories`)
      .toPromise()
      .then(
      data => {
        console.log(data);
      },
      msg => {
        observer.error(msg.error);
        observer.complete();
      });
    });
  }

  public register(credentials) {
    if (credentials.nombre === null || credentials.email === null  || credentials.telefono === null || credentials.password === null || credentials.rpassword === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}usuarios`, credentials)
        .toPromise()
        .then(
        data => {
          this.msgNewRegister(credentials.email, credentials.nombre);
          this.msgNewRegister('massage.graf.app@gmail.com', credentials.nombre);
          this.usuario = data;
          this.storage.setObject('MASSGGRAPROV1',credentials);
          this.storage.set('TKMASSGGRA',this.usuario.token);
          this.storage.setObject('USMASSGGRA', this.usuario.usuario);
          observer.next(true);
          observer.complete();
        },
        msg => {
          observer.error(msg.error);
          observer.complete();
        });
      });
    }
  }


  //// PROVEEDOR //////
  public registerProveedor(credentials) {
    if (credentials.nombre === null || credentials.email === null  || credentials.telefono === null || credentials.password === null || credentials.rpassword === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}establecimientos`, credentials)
        .toPromise()
        .then(
        data => {
          this.msgNewRegister(credentials.email, credentials.nombre);
          this.msgNewRegister('massage.graf.app@gmail.com', credentials.nombre);
          this.usuario = data;
          this.storage.setObject('MASSGGRAPROV1',credentials);
          this.storage.set('TKMASSGGRAPROV',this.usuario.token);
          this.storage.setObject('USMASSGGRAPROV', this.usuario.usuario);
          observer.next(true);
          observer.complete();
        },
        msg => {
          observer.error(msg.error);
          observer.complete();
        });
      });
    }
  }

  public loginProveedor(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        this.http.post(`${environment.api}login/repartidores`, credentials)
        .toPromise()
        .then(
          data => {
            this.usuario = data;
            this.storage.setObject('MASSGGRAPROV1',credentials);
            this.storage.set('TKMASSGGRAPROV',this.usuario.token);
            this.storage.set('IDMASSGGRAPROV',this.usuario.user.repartidor.id);
            this.storage.setObject('USMASSGGRAPROV', this.usuario.user);
            observer.next(true);
            observer.complete();
          },
          msg => {
            observer.error(msg.error);
            observer.complete();
          });
      });
    }
  }

  msgNewRegister(email,name){
    this.http.get(`${environment.api}nuevo_registro/`+email+`?usuario=`+name)
    .toPromise()
    .then(
    data => {
    },
    msg => {
    });
  }
}
