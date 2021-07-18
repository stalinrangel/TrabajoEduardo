import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

	public showMute: boolean = false;

	musics = [
	'assets/1.mp3',
	'assets/2.mp3',
	'assets/3.mp3',
	'assets/4.mp3',
	'assets/5.mp3',
	'assets/6.mp3'
	]

  	constructor(private nativeAudio: NativeAudio) { 
	}

	playSound(index){
		this.showMute = false;
		this.nativeAudio.preloadComplex('uniqueId', this.musics[index], 0.4, 1, 0).then(success => {
			this.nativeAudio.play('uniqueId').then(success => {				
			},
			error => {
			});
			this.nativeAudio.loop('uniqueId').then(success => {
			},
			error => {
			});
		},
		error => {
		});
	}

	repeatSound(){
		this.showMute = false;
		this.nativeAudio.play('uniqueId').then(success => {				
		},
		error => {
		});
		this.nativeAudio.loop('uniqueId').then(success => {
		},
		error => {
		});
	}

	stopSound(){
		this.showMute = true;
		this.nativeAudio.stop('uniqueId').then(success => {
		},
		error => {
		});
	}

	getStatus(){
		return this.showMute;
	}

}
