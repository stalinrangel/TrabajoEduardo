import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DomController } from '@ionic/angular';

interface Theme {
  name: string;
  styles: ThemeStyle[];
}

interface ThemeStyle {
  themeVariable: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private themes: Theme[] = [];
  private currentTheme: number = 0;
  public colors = {
    color: '',
    color1: ''
  }

  constructor(private domCtrl: DomController, @Inject(DOCUMENT) private document) {
  }


  setTheme(value1,value2): void {
 
    let theme = this.themes.find(theme => theme.name === name);

    this.domCtrl.write(() => {
    	document.documentElement.style.setProperty('--ion-color-secondary', value1);
      document.documentElement.style.setProperty('--ion-color-tertiary', value2);
      this.colors.color = value2;
      this.colors.color1 = value1;
    });
  }

  getTheme(){
    return this.colors;
  }

}
