import { Component } from '@angular/core';
import { PouchdbService } from '../services/pouchdb.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public pouchdbService: PouchdbService, private translate: TranslateService) {
    this.translate.setDefaultLang('fr');
  }

  ngOnInit(){
    this.getAll();
  }

  getAll(){
    this.pouchdbService.findAllRelationalDocByType('medecin').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

}
