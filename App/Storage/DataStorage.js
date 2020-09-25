import AsyncStorage from '@react-native-community/async-storage';
export class DataStorage {

  constructor() {
    this.localImages = [];
    this.serverImages = [];
  }

  async loadFromDisk() {
    try {
      let data = await AsyncStorage.getItem('data');
      //console.log('data is', data, password);
      if (data !== null) {
        const localImages = data.localImages;
        const serverImages = data.serverImages;
        this.localImages = localImages;
        this.serverImages = serverImages;
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  }

  async saveLocalImagesToDisk(localImages) {
    let data = {
      localImages: localImages,
    };
    return AsyncStorage.setItem('data', JSON.stringify(data));
  }

  async saveServerImagesToDisk(serverImages) {
    let data = {
      serverImages: serverImages,
    };
    return AsyncStorage.setItem('data', JSON.stringify(data));
  }
  getLocalImages() {
    return this.localImages;
  }

  getServerImages() {
    return this.serverImages;
  }
}
