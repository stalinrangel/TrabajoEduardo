import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Principal', url: '/principal', icon: 'home' },
    { title: 'Curriculum', url: '/curriculum', icon: 'document' },
    { title: 'Ofertas', url: '/ofertas', icon: 'briefcase' },
  ];
  public imageForm: FormGroup;
  public email = 'Usuario';
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private storage: Storage) {}
  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();

  }
}
