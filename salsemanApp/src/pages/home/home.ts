import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	private isOn: boolean = false;


	constructor(public navCtrl: NavController) {

	}


	getButtonText(): string {
		return `Switch ${this.isOn ? 'Off' : 'On'}`;
	}
	setState(): void {
		this.isOn = !this.isOn;
	}

	toggleDetails() {
		this.isOn = !this.isOn;
	}

}
