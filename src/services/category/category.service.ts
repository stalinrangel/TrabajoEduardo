import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpClient, public storage: StorageService) {}

  public getCategory(): Observable<any>{
    return this.http.get(`${environment.api}categsub`);
  }

  public setAgenda(data): Observable<any>{
    return this.http.post(`${environment.api}agenda`,data);
  } 

  getServices(id,token?): Observable<any>{
    return this.http.get(`${environment.api}establecimientos/`+id+`/productos?token=`+token);
  }

  addService(data,token?): Observable<any>{
    return this.http.post(`${environment.api}productos`,data);
  } 

  imageService(data,token): Observable<any>{
    return this.http.post(`${environment.api}imagenes?token=`+token,data);
  }

  /* Delete servicios */
  deleteService(id,token?): Observable<any>{
    return this.http.delete(`${environment.api}productos/`+id+`?token=`+token);
  }

  /* Put servicios */
  editService(data,id,token): Observable<any>{
    return this.http.put(`${environment.api}productos/`+id+`?token=`+token,data);
  }

  /* GET services */
  getServicesCliente(id): Observable<any>{
    return this.http.get(`${environment.api}subcategorias/`+id+`/productos`);
  }

  getDetailProviders(id): Observable<any>{
    return this.http.get(`${environment.api}productos/`+id);
  }

  getAgendaG(id): Observable<any>{
    return this.http.get(`${environment.api}agenda/usuario/`+id);
  }

  getAgendaD(id,fecha): Observable<any>{
    return this.http.get(`${environment.api}agenda/usuario/`+id+`/dia/`+fecha);
  }

  sendAgendaD(data): Observable<any>{
    return this.http.post(`${environment.api}agenda/diaria`,data);
  }

  putAgendaD(id,data): Observable<any>{
    return this.http.put(`${environment.api}agenda/`+id+`/diaria`,data);
  }

  /* Post order */
  setOrder(order): Observable<any>{
    return this.http.post(`${environment.api}pedidos`,order);
  }

   /* GET services en curso */
  getTracking(id,token): Observable<any>{
    return this.http.get(`${environment.api}usuarios/`+id+`/pedidos/encurso?token=`+token);
  }

  /* GET services en historial */
  getHistory(id,token): Observable<any>{
    return this.http.get(`${environment.api}usuarios/`+id+`/pedidos/finalizados?token=`+token);
  }

  /* Get detalle de pedido */
  getOrderId(id,token): Observable<any>{
    return this.http.get(`${environment.api}pedidos/`+id+'?token='+token);
  }

  /* Get pedidos en espera */
  getInput(id,token): Observable<any>{
    return this.http.get(`${environment.api}repartidores/`+id+'/pedido/enespera?token='+token);
  }

  /* Get pedidos CLINICA en espera */
  getInputCL(id,token): Observable<any>{
    return this.http.get(`${environment.api}clinica/`+id+'/pedido/enespera?token='+token);
  }

  /* Put aceptar servicios */
  acceptService(id,pedido_id,hora,token): Observable<any>{
    return this.http.put(`${environment.api}notificaciones/`+id+`/aceptar/pedido?pedido_id=`+pedido_id+`&hora_aceptado=`+hora+`&token=`+token,{});
  }

  /* Put finalizar servicios */
  finishService(id,data,token): Observable<any>{
    return this.http.put(`${environment.api}notificaciones/`+id+`/finalizar/pedido?token=`+token,data);
  }

  /* Get clinicas */
  getClinics(id): Observable<any>{
    return this.http.get(`${environment.api}clinicas/subcategorias/`+id);
  }

  /* Get pedidos en curso PROV */
  getTrackingProvider(id,token): Observable<any>{
    return this.http.get(`${environment.api}repartidores/`+id+'/pedido/encurso?token='+token);
  }

  /* Get pedidos finalizados PROV */
  getHistoryProvider(id,month,year,token): Observable<any>{
    return this.http.get(`${environment.api}repartidores/`+id+`/historial/pedidos?mes=`+month+`&anio=`+year+`&token=`+token);
  }

  /* Get horario PROV */
  gethoursProvider(id,token): Observable<any>{
    return this.http.get(`${environment.api}agenda_usuario/`+id+'?token='+token);
  }

  /* Enviar calificacion del servicio */
  sendCalification(data,token): Observable<any>{
    return this.http.post(`${environment.api}calificaciones?token=`+token,data);
  }

  /* Cancelar servicio */
  cancelOrder(data,id,token): Observable<any>{
    return this.http.post(`${environment.api}cancelar_pedidos/`+id+`?token=`+token,data);
  }

  /* Cancelar servicio Profesional */
  cancelOrderPR(id,token): Observable<any>{
    return this.http.get(`${environment.api}cancela/profesional/`+id+`?token=`+token);
  }

  /* Cancelar servicio Clinica */
  cancelOrderCL(id,token): Observable<any>{
    return this.http.get(`${environment.api}cancela/clinica/`+id+`?token=`+token);
  }

  /* Valid tk */
  validtk(id): Observable<any>{
    let data = {
      token: id
    }
    return this.http.post(`${environment.api}validar/token`,data);
  }

  /* Get sig */
  getSig(id, mount): Observable<any>{
    return this.http.get(`${environment.api}firma_execute_purchase?MERCHANT_ORDER=`+id+`&MERCHANT_AMOUNT=`+mount);
    //return this.http.get(`${environment.api}firma?MERCHANT_ORDER=`+id);
  }

  /* Get sig */
  checkPay(id): Observable<any>{
    return this.http.get(`${environment.api}check_pay/`+id);
  }

  /* Post card */
  PostCard(id, idData, tokenData): Observable<any>{
    let data = {
      id_user: idData,
      tokenUser: tokenData,
      usuario_id: id
    }
    return this.http.post(`${environment.api}store_cards/`+id, data);
  }

  /*Get Cards*/
  getTargets(id): Observable<any>{
    return this.http.get(`${environment.api}get_cards/`+id);
  }

  /* Get sig */
  setPay(data): Observable<any>{
    return this.http.post(`${environment.api}pay`,data);
  }

  /*Put profesional*/
  putProfesional(id,data): Observable<any>{
    return this.http.put(`${environment.api}pedidos/`+id,data);
  }

  /* Get sig */
  registerPay(id,data): Observable<any>{
    return this.http.post(`${environment.api}store_paypagos/`+id,data);
  }
 
  /* Get info pay */
  getPay(id): Observable<any>{
    return this.http.get(`${environment.api}get_paypagos_pedido/`+id);
  }

  msgNewOrder(email,name){
    this.http.get(`${environment.api}nuevo_pedido/`+email+`?servicio=`+name)
    .toPromise()
    .then(
    data => {
    },
    msg => {
    }); 
  }

  newNotify(token,contenido,pedido_id,action){
    this.http.get(`${environment.api}onesignal.php?token_notificacion=`+token+`&contenido=`+contenido+`&pedido_id=`+pedido_id+`&accion=`+action)
    .toPromise()
    .then(
    data => {
    },
    msg => {
    }); 
  }

  /* Post Anverso */
  setDoc1(id,data): Observable<any>{
    let data1 = {
      anverso: data
    }
    return this.http.post(`${environment.api}update_anverso/`+id,data1);
  }

  /* Post Reverso */
  setDoc2(id,data): Observable<any>{
    let data1 = {
      reverso: data
    }
    return this.http.post(`${environment.api}update_reverso/`+id,data1);
  }

  /* Post titularidad_cuenta */
  setDoc3(id,data): Observable<any>{
    let data1 = {
      titularidad_cuenta: data
    }
    return this.http.post(`${environment.api}update_titularidad_cuenta/`+id,data1);
  }

  /* Post recibo3637 */
  setDoc4(id,data): Observable<any>{
    let data1 = {
      recibo3637: data
    }
    return this.http.post(`${environment.api}update_recibo3637/`+id,data1);
  }

  /* Post constitucion */
  setDoc5(id,data): Observable<any>{
    let data1 = {
      constitucion: data
    }
    return this.http.post(`${environment.api}update_constitucion/`+id,data1);
  }

  /* Post cif */
  setDoc6(id,data): Observable<any>{
    let data1 = {
      cif: data
    }
    return this.http.post(`${environment.api}update_cif/`+id,data1);
  }

  /* Get documentos */
  getDocs(id): Observable<any>{
    return this.http.get(`${environment.api}documentos/`+id);
  }

  /* update cuenta */
  addAcount(data,id,token): Observable<any>{
    return this.http.post(`${environment.api}update_datos/`+id+`?token=`+token,data);
  }

  /* POST contrato */
  postContrat(nombre,ci,direccion,telefono,usuario_id,token,data): Observable<any>{
    return this.http.get(`${environment.api}con_contratos_store?nombre=`+nombre+`&ci=`+ci+`&direccion=`+direccion+`&telefono=`+telefono+`&usuario_id=`+usuario_id+`&firma=`+null+`&token=`+token);
  }

  /* PUT datos de usuario */
  setUser(id,token,data): Observable<any>{
    return this.http.put(`${environment.api}repartidores/`+id+'?token='+token, data);
  }

  /* Get contrato */
  getContrat(id): Observable<any>{
    return this.http.get(`${environment.api}con_contratos/`+id);
  }

}
