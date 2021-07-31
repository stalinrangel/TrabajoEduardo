import { Component, OnInit } from '@angular/core';
import { NavController, Platform, LoadingController, AlertController, ToastController } from '@ionic/angular';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})


export class PrincipalPage implements OnInit {

  constructor(public photoService: PhotoService,public nav: NavController) { }

  ngOnInit() {
  }

  addPhotoToGallery() {

    this.photoService.addNewToGallery();
  }

  get_url(){
    console.log(this.photoService.photos[0]);
  }

  curriculum(){
    this.nav.navigateForward('curriculum');
  }


}


