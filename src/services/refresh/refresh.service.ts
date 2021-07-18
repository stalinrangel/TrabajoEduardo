import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  
  private formRefreshAnnouncedSource = new Subject();
  public formRefreshSource$ = this.formRefreshAnnouncedSource.asObservable();
  private formRefreshAnnouncedSource1 = new Subject();
  public formRefreshSource1$ = this.formRefreshAnnouncedSource1.asObservable();

  publishFormRefresh(data?){
    this.formRefreshAnnouncedSource.next(data);
  }

  publishFormRefresh1(data?){
    this.formRefreshAnnouncedSource1.next(data);
  }
}
