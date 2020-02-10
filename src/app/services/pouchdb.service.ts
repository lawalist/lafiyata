import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import PouchdbFind from 'pouchdb-find';
import * as Relational from 'relational-pouch';


@Injectable({
  providedIn: 'root'
})
export class PouchdbService {

  public remoteDB: any;
  public localDB: any;

  constructor() { 
    PouchDB.plugin(Relational);
    PouchDB.plugin(PouchdbFind);
    this.localDB = new PouchDB('lafiyata-db');
    //this.localDB.setMaxListeners(20);
    //this.localDB.sync('http://localhost:5984/lafiyata', { live: true, retry: true });
    //this.creatDocByTypeSecondIndex();
    this.createDBSchema();
  }


  createDBSchema(){

    this.localDB.setSchema([

      {
        singular: 'medecin',
        plural: 'medecins',
        /*relations: {
          //'pays': {belongsTo: 'pays'},
        }*/
        
      },
      {
        singular: 'patient',
        plural: 'patients'
      },
      {
        singular: 'maladie',
        plural: 'maladies',
      },
      {
        singular: 'laboratoire',
        plural: 'laboratoires',
      }
    ]);
   }


  createRelationalDoc(doc){
    return this.localDB.rel.save(doc.type, doc);
  }

  putRelationalDocAttachment(docType, docId, docRev, fileName = 'avatar', attachment, contentType = 'text/plain'){
    return this.localDB.rel.putAttachment(docType,  {id: docId, rev: docRev}, fileName, attachment, contentType);
  }

  getRelationalDocAttachment(docType, docId, fileName = 'avatar'){
    return this.localDB.rel.getAttachment(docType, docId, fileName).then((attachment) => {
      // convert the Blob into an object URL and show it in an image tag
      if(attachment && attachment != ''){
        return URL.createObjectURL(attachment);
      }else{
        return null;
      }
    });
  }

  removeRelationalDocAttachment(doc, fileName = 'avatar'){
    return this.localDB.rel.removeAttachment(doc.type, doc, fileName);
  }

  updateRelationalDoc(doc){
    return this.localDB.rel.save(doc.type, doc);
  }

  deleteRelationalDocDefinitivement(doc){
    return this.localDB.rel.del(doc.type, doc);
  }

  findRelationalDocByID(type, id){
    return this.localDB.rel.find(type,id);
  }

  findRelationalDocByTypeAndID(type, id){
    return this.localDB.rel.find(type,id);
  }


  existRelationalDocByTypeAndID(type, id){
    return this.localDB.rel.find(type,id).then((res) => {
      return true
    }).catch((err) => {
      return false;
    });
  }

  findAllRelationalDocByType(type){
    return this.localDB.rel.find(type);
  }

  findRelationalDocByTypeAndOptions(type, options){
    return this.localDB.rel.find(type, options);
  }

  findRelationalDocHasMany(type, belongsToKey, belongsToId){
    return this.localDB.rel.findHasMany(type, belongsToKey, belongsToId);
  }

}
