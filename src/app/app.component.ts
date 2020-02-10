import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private translate: TranslateService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initTranslate();
    });
  }

  public changeLanguage(): void {
    this.translateLangue();
  }

  translateLangue(): void {
    this.translate.use('fr');

  }

  initTranslate() {
    // La langue par défaut est le français
    this.translate.setDefaultLang('fr');

    //Recupérer la langue du navigateur
    if (this.translate.getBrowserLang() !== undefined) {
      //global.langue = this.translate.getBrowserLang();
      console.log('La langue du navigateur est', this.translate.getBrowserLang());
    }
    else {
      // Si non définit, utiliser la langue par défaut qui est le françias
      //global.langue = 'fr'; 
    }

    this.translateLangue();
  }

}
