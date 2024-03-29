import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public photos: Photos[] = [];
  public url_photo=null;
  public url_photo_complete=null;

  constructor() { }


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });


    console.log(capturedPhoto);
    this.url_photo=capturedPhoto.webPath/*+'.'+capturedPhoto.format*/;
    this.url_photo_complete=capturedPhoto.webPath+'.'+capturedPhoto.format;
  }

  public url(){
    return this.photos;
  }
}
export interface Photos {
  filepath: string;
  webviewPath: string;
}
