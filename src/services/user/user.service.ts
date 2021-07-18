import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient, public storage: StorageService) { }

  /* GET datos usuario */
  getUser(id): Observable<any>{
    let user = {
      IdUsuario: id,
      Idioma: 'ESP'
    }
    return this.http.post(`${environment.api}sc_patronna_cuenta_consulta`,user);
  }

  /* UPDATE datos usuario */
  updateUser(user): Observable<any>{
    return this.http.post(`${environment.api}sc_patronna_cuenta_actualiza`,user);
  }

  /* UPDATE password usuario */
  updatePassword(user): Observable<any>{
    return this.http.post(`${environment.api}sc_patronna_cuenta_actualiza_passw`,user);
  }

  /* GET estado proveedor */
  getStatus(id,token): Observable<any>{
    return this.http.get(`${environment.api}repartidores/`+id+'?token='+token);
  }

  /* PUT estado proveedor */
  setStatus(id,token,data): Observable<any>{
    return this.http.put(`${environment.api}repartidores/`+id+'?token='+token,data);
  }

  /* PUT datos de usuario */
  setUser(id,token,data): Observable<any>{
    return this.http.put(`${environment.api}usuarios/`+id+'?token='+token, data);
  }

  /* GET datos contacto */
  getContact(): Observable<any>{
    return this.http.get(`${environment.api}sistema/contacto`);
  }

  /* GET id de chat con soporte */
  getId(id,token): Observable<any>{
    return this.http.get(`${environment.api}chats/repartidores/michat/`+id+'&token='+token);
  }

  /* GET id de chat con soporte */
  getIdC(id,token): Observable<any>{
    return this.http.get(`${environment.api}chats/clientes/michat/`+id+'&token='+token);
  }

  /* GET estadisticas de pedidos de usuario */
  getCount(id,token): Observable<any>{
    return this.http.get(`${environment.api}pedidos/estadisticas/`+id+'?token='+token);
  }

}
