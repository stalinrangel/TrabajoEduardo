import { Injectable } from '@angular/core';
import { IonRouterOutlet } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BackpopService {
  routerOutlet: IonRouterOutlet;

  constructor() {}

  async popToRoot() {
    if (!this.routerOutlet) {
      throw new Error('IonRouterOutlet not initialized.');
    }

    const stackCtrl = (this.routerOutlet as any).stackCtrl;
    const stackId = this.routerOutlet.getActiveStackId();
    const depth = stackCtrl.getStack(stackId).length;
    if (depth > 1) {
      this.routerOutlet.pop(depth - 1, stackId);
    }
  }
}