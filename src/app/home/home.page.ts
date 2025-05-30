import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [CommonModule, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButton, IonIcon, IonContent, IonTitle, IonToolbar, IonHeader,],
})
export class HomePage implements OnInit {
  public isLoggedIn = false;
  public user: any = null;

  async ngOnInit() {
    const status = await FacebookLogin.getCurrentAccessToken();
    this.isLoggedIn = !!status?.accessToken;
    if (this.isLoggedIn) {
      this.loadProfile();
    }
  }

  async fbLogin() {
    const result: FacebookLoginResponse =
      await FacebookLogin.login({ permissions: ['public_profile', 'email'] });

    this.isLoggedIn = result.accessToken != null;
    if (this.isLoggedIn) {
      this.loadProfile();
    }
  }

  async loadProfile() {
    // Use Facebook Graph API
    const token = (await FacebookLogin.getCurrentAccessToken()).accessToken;
    const response = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture&type=large&access_token=${token}`
    );
    this.user = await response.json();
  }

  async logout() {
    await FacebookLogin.logout();
    this.isLoggedIn = false;
    this.user = null;
  }
}
