import {Injectable} from '@angular/core';
import {Hotspot, Scene} from '../types';
import {ModeService} from "./mode.service";
import {SettingsService} from "./settings.service";
import {LanguageService} from './language.service';
import {UserDBService} from './user-db.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  SCENES: Array<Scene> = [];
  openRequest;

  nameHotspot = '';
  colorHotspot = '';
  soundHotspot = '';
  typeHotspot;
  strokeWidth = 2;

  haveAddHotspot = false;

  constructor(public modeService: ModeService,
              public settingsService: SettingsService,
              public languageService: LanguageService,
              public userDBService: UserDBService,
              public router: Router) {
    this.init();
  }

  addScene(base64data: string, sceneName: string = '', firstimagename: string = '') {
    if (this.SCENES == null || this.SCENES.length == 0) {
      this.SCENES = [{
        name: sceneName,
        images: [
          {name: firstimagename, base64data, canvasData: null, hidden: false, hotspots: Array<Hotspot>()}
        ],
        hidden: false
      }];
    } else {
      this.SCENES.push({
        name: sceneName,
        images: [
          {name: firstimagename, base64data, canvasData: null, hidden: false, hotspots: Array<Hotspot>()}
        ],
        hidden: false
      });
    }
    this.update();
  }

  addImage(base64data: string, sceneNumber: number, imageName: string = '') {
    this.SCENES[sceneNumber].images.push({
      name: imageName,
      base64data,
      canvasData: null,
      hidden: false,
      hotspots: Array<Hotspot>()
    });
    this.update();
  }

  checkNames(scene, image, name){
    let check = true;
    if(scene != undefined && image != undefined){
      this.SCENES[scene].images[image].hotspots.forEach(x => {
        if(name.toUpperCase() == x.name.toUpperCase()){
          check = false;
        }
      });
    }
    return check;
  }

  canvasSave(selectedScene: number, selectedImage: number, canvasData: string) {
    this.SCENES[selectedScene].images[selectedImage].canvasData = canvasData;
    this.update();
  }

  getScenes(): Array<Scene> {
    return this.SCENES;
  }

  updateScenes() {
    this.update();
  }

  renameImage(selectedScene: number, selectedImage: number, newImageName: string) {
    this.SCENES[selectedScene].images[selectedImage].name = newImageName;
    this.update();
  }

  renameScene(selectedScene: number, newImageName: string) {
    this.SCENES[selectedScene].name = newImageName;
    this.update();
  }

  removeImage(selectedScene: number, selectedImage: number) {
    if (this.SCENES[selectedScene].images.length >= 2) {
      this.SCENES[selectedScene].images.splice(selectedImage, 1);
      this.update();
    } else {
      this.removeScene(selectedScene);
    }

  }

  removeScene(selectedScene: number) {
    this.SCENES.splice(selectedScene, 1);
    this.update();
  }

  hideImage(selectedScene: number, selectedImage: number) {
    const sceneIsHidden = this.SCENES[selectedScene].images[selectedImage].hidden;
    this.SCENES[selectedScene].images[selectedImage].hidden = !sceneIsHidden;
    // Hides the scene if all it's images are hidden
    let i = 0;
    while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden) {
      i++;
    }
    if (i == this.SCENES[selectedScene].images.length) {
      if (!this.SCENES[selectedScene].hidden) {
        this.hideScene(selectedScene);
      }
    }
    else {
      this.SCENES[selectedScene].hidden = false;
    }
    this.update();
  }

  hideScene(selectedScene: number) {
    const sceneIsHidden = this.SCENES[selectedScene].hidden;
    if (sceneIsHidden) {
      this.SCENES[selectedScene].hidden = false;
      // Test if all of the images in the scene are hidden, unhides the first if so.
      let i = 0;
      while (i < this.SCENES[selectedScene].images.length && this.SCENES[selectedScene].images[i].hidden) {
        i++;
      }
      if (i == this.SCENES[selectedScene].images.length) {
        this.hideImage(selectedScene, 0);
      }
    } else {
      this.SCENES[selectedScene].hidden = true;
    }
    this.update();
  }

  statusHideShowSceneImage(selectedScene: number, selectedImage: number){
    if (this.SCENES.length != 0){
      return this.SCENES[selectedScene].images[selectedImage].hidden;
    } else {
      return false;
    }
  }

  changeHotspot(hotspot: Hotspot, selectedScene: number, selectedImage: number, hotspotName: string, svgPath: number[], strokeColor: string, base64sound: string) {
    hotspot.strokeColor = strokeColor;
    hotspot.name = hotspotName;
    hotspot.svgPointArray = svgPath;
    if (base64sound !== null) {
      hotspot.base64sound = base64sound;
    }
    this.updateScenes()
  }

  addHotspot(selectedScene: number, selectedImage: number, hotspotName: string, svgPath: number[], strokeColor: string, base64sound: string, typeSound: string, strokeWidth: number) {
    if (this.SCENES[selectedScene].images[selectedImage].hotspots == null) {
      this.SCENES[selectedScene].images[selectedImage].hotspots = [{
        name: hotspotName,
        svgPointArray: svgPath,
        strokeColor,
        base64sound,
        typeSound,
        strokeWidth
      }];
    } else {
      this.SCENES[selectedScene].images[selectedImage].hotspots.push({
        name: hotspotName,
        svgPointArray: svgPath,
        strokeColor,
        base64sound,
        typeSound,
        strokeWidth
      });
    }
    this.haveAddHotspot = true;
    this.update();
  }

  getImageHotspots(selectedScene: number, selectedImage: number): Array<Hotspot> {

    if (selectedScene != undefined && selectedImage != undefined) {
      return this.SCENES[selectedScene].images[selectedImage].hotspots;
    }
    return [];
  }

  // INITIALISATION
  init() {


    this.openRequest = indexedDB.open('SaveVisualSceneDisplay', 3);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      const userListStore = db.transaction(['UserList'], 'readwrite').objectStore('UserList').get(1);
      userListStore.onsuccess = e => {
        this.userDBService.usersList = userListStore.result;
      };
      /* istanbul ignore next */
      userListStore.onerror = e => {
      };

      const gridStore = db.transaction(['Scenes'], 'readwrite').objectStore('Scenes').get(1);
      gridStore.onsuccess = e => {
        this.SCENES = gridStore.result;
      };
      /* istanbul ignore next */
      gridStore.onerror = e => {
      };

      const configStore = db.transaction(['Configuration'], 'readwrite').objectStore('Configuration').get(1);
      configStore.onsuccess = e => {
        this.settingsService.setConfiguration(configStore.result);
      };
      /* istanbul ignore next */
      configStore.onerror = e => {
      };
    };

    this.openRequest.onupgradeneeded = event => {

      // Creaction of Store
      const db = event.target.result;
      const transaction = event.target.transaction;

      if (!db.objectStoreNames.contains("UserList")) {
        db.createObjectStore('UserList', {autoIncrement: true});
        const userListStore = transaction.objectStore('UserList');
        userListStore.add(this.userDBService.usersList);
      }

      if (!db.objectStoreNames.contains("Scenes")) {
        db.createObjectStore('Scenes', {autoIncrement: true});
        const scenesStore = transaction.objectStore('Scenes');
        scenesStore.add(this.SCENES);
      }

      if (event.oldVersion <= 1) {
        if (!db.objectStoreNames.contains("Configuration")) {
          db.createObjectStore('Configuration', {autoIncrement: true});
          const configurationStore = transaction.objectStore('Configuration');
          configurationStore.add(this.settingsService.getConfiguration());
        }
      }
    };
  }

  update() {


    this.openRequest = indexedDB.open('SaveVisualSceneDisplay', 3);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // UPDATE THE SCENE
      const scenesStore = db.transaction(['Scenes'], 'readwrite');
      const scenesObjectStore = scenesStore.objectStore('Scenes');
      const storeScenesRequest = scenesObjectStore.get(1);
      storeScenesRequest.onsuccess = () => {
        scenesObjectStore.put(this.SCENES, 1);
      };

      // UPDATE THE GRID
      const configurationStore = db.transaction(['Configuration'], 'readwrite');
      const configurationObjectStore = configurationStore.objectStore('Configuration');
      const storeConfigurationRequest = configurationObjectStore.get(1);
      storeConfigurationRequest.onsuccess = () => {
        configurationObjectStore.put(this.settingsService.getConfiguration(), 1);
      };
    };
  }
  updateUserList() {


    this.openRequest = indexedDB.open('SaveVisualSceneDisplay', 3);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;
      // UPDATE THE USER LIST
      const userListStore = db.transaction(['UserList'], 'readwrite');
      const userListObjectStore = userListStore.objectStore('UserList');
      const storeUserListRequest = userListObjectStore.get(1);
      storeUserListRequest.onsuccess = () => {
        userListObjectStore.put(this.userDBService.usersList, 1);
      };
    };
  }

  // INITIALISATION
  loadUsersList() {

    this.openRequest = indexedDB.open('SaveVisualSceneDisplay', 3);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;
      const gridRequest = db.transaction(['UserList']).objectStore('UserList').get(1);
      gridRequest.onsuccess = e => {
        const loggedUser = localStorage.getItem('logged');
        /* istanbul ignore next */
        if (loggedUser != null) {
          this.userDBService.currentUser = loggedUser;
        }
        this.userDBService.usersList = gridRequest.result;
        this.loadInfoFromCurrentUser();
      };

    };

    // NEW DATABASE VERSION
    this.openRequest.onupgradeneeded = event => {
      // Creaction of Store
      const db = event.target.result;
      const transaction = event.target.transaction;
      this.createUsersListObject(db, transaction);
      this.createSceneObject(db, transaction);
      this.createConfigurationObject(db, transaction);
    };
  }

  private createUsersListObject(db: any, transaction: any) {
    db.createObjectStore('UserList', {autoIncrement: true});
    const userList = transaction.objectStore('UserList');
    userList.add(this.userDBService.usersList);
  }

  private createSceneObject(db: any, transaction: any) {
    db.createObjectStore('Scenes', {autoIncrement: true});
    const scenesStore = transaction.objectStore('Scenes');
    scenesStore.add(this.SCENES);
  }

  private createConfigurationObject(db: any, transaction: any) {
    db.createObjectStore('Configuration', {autoIncrement: true});
    const configurationStore = transaction.objectStore('Configuration');
    configurationStore.add(this.settingsService.getConfiguration());
  }

  loadInfoFromCurrentUser() {
    console.log('currentUser :', this.userDBService.currentUser);
    this.openRequest = indexedDB.open('SaveVisualSceneDisplay', 3);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      //LOAD CONFIGURATION
      const configRequest = db.transaction(['Configuration']).objectStore('Configuration').get(this.userDBService.currentUser);
      configRequest.onsuccess = e => {
        let resultConfig = configRequest.result;
        //IF CONFIG DOES NOT EXIST YET FOR THIS USER /* istanbul ignore next */
        if (resultConfig == null) {
          //GET DEFAULT CONFIG
          resultConfig = this.settingsService.getConfiguration();
        }
        this.settingsService.setConfiguration(resultConfig);
      };

      const sceneRequest = db.transaction(['Scenes']).objectStore('Scenes').get(this.userDBService.currentUser);
      sceneRequest.onsuccess = e => {
        let resultScene = sceneRequest.result;
        /* istanbul ignore next */
        if(resultScene == null){
          this.SCENES = [];
        }
        else{
          this.SCENES = sceneRequest.result;
        }
      }
    };
    //this.router.navigate(['fr/dashboard']);
  }


  loadUserOfUsersList(username: string) {
    // this.init();

    this.openRequest = indexedDB.open('SaveVisualSceneDisplay', 3);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;
      const gridRequest = db.transaction(['UserList']).objectStore('UserList').get(1);
      gridRequest.onsuccess = e => {
        this.userDBService.usersList = gridRequest.result;
        let findUser = this.userDBService.usersList.find(user => user.toLowerCase() == username.toLowerCase());
        /* istanbul ignore next */
        if (findUser != null) {
          this.userDBService.currentUser = findUser;
          //this.userDBService.setLoggedIn();
          this.loadInfoFromCurrentUser();
        } else {
          this.userDBService.addUser(username);
          this.updateUserList();
          this.loadUserOfUsersList(username);
        }
      };

    };
    // NEW DATABASE VERSION
    this.openRequest.onupgradeneeded = event => {
      // Creaction of Store
      const db = event.target.result;
      const transaction = event.target.transaction;
      this.createUsersListObject(db, transaction);
      this.createSceneObject(db, transaction);
      this.createConfigurationObject(db, transaction);
    };
  }

  updateConfig() {
    this.openRequest = indexedDB.open('SaveVisualSceneDisplay', 3);

    // ERROR
    this.openRequest.onerror = event => {
      alert('Database error: ' + event.target.errorCode);
    };

    // SUCCESS
    this.openRequest.onsuccess = event => {
      const db = event.target.result;

      // UPDATE THE GRID
      const configurationStore = db.transaction(['Configuration'], 'readwrite');
      const configurationObjectStore = configurationStore.objectStore('Configuration');
      const storeConfigurationRequest = configurationObjectStore.get(this.userDBService.currentUser);
      storeConfigurationRequest.onsuccess = () => {
        configurationObjectStore.put(this.settingsService.getConfiguration(), this.userDBService.currentUser);
      };
    };
  }

}
