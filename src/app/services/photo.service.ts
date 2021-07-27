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

  constructor() { }


  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: "",
      webviewPath: capturedPhoto.webPath
    });
    console.log(capturedPhoto.webPath);
    this.url_photo=capturedPhoto.webPath;
  }

  public url(){
    return this.photos;
  }
}
export interface Photos {
  filepath: string;
  webviewPath: string;
}
