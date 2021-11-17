import { Injectable } from '@angular/core';
import {Camera, CameraPhoto, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem,Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { IonList,IonItem,IonThumbnail,IonImg,IonLabel } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  //create an array to show all our
  //taken pictures
  public photos: Phototaken[] = [];

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100

    });

    //save the picture and add to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    //set current taken photo as first
    //in photos array
    // this.photos.unshift({
    //   filepath: 'soon...',
    //   webviewPath: capturedPhoto.webPath,
    //   //thumbnail: capturedPhoto.webPath

    //   });

  }
  //this method will implement save
  //use file system API
  private async savePicture(cameraPhoto: CameraPhoto) {

    //convert image to base64 format req by Filesystemapi
    //read as base64 is helper function to define later
    //given platform specific requirement
    //seperate logic
    const base64Data = await this.readAsBase64(cameraPhoto);

    //write file to dir
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    })



    //user webPath to display image
    //instead of base64 since its loaded in memory
    return {
      filepath: fileName,
      webviewPath: cameraPhoto.webPath
    }

  }

  private async readAsBase64(cameraPhoto: Photo) {
    //fetch photo, read as blob, convert to base64
    const response  = await fetch(cameraPhoto.webPath!);
    const blob  = await response.blob()
    return await this.convertBlobToBase64(blob) as string;

  }

  convertBlobToBase64 = (blob: Blob)=> new Promise((resolve, reject)=>{
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = ()=> {
      resolve(reader.result)
    };
    //filereader function to convert to base64
    reader.readAsDataURL(blob);

  });


  }


//need to save photo to storage
//also need to render to app
//define an interface to save our metadata
export interface Phototaken {
  filepath: string;
  webviewPath: string;
  //thumbnail: string;


}


