import AsyncStorage from '@react-native-community/async-storage';
export class DataStorage {
  constructor() {
    this.localImages = [];
    this.serverImages = [];
  }

  async saveLocalImagesToDisk(localImages) {
    return AsyncStorage.setItem('localImages', JSON.stringify(localImages));
  }

  async saveServerImagesToDisk(serverImages) {
    return AsyncStorage.setItem('serverImages', JSON.stringify(serverImages));
  }
  async getLocalImages() {
    let localImages = await AsyncStorage.getItem('localImages');
    return localImages != null ? JSON.parse(localImages) : [];
  }

  async getServerImages() {
    let serverImages = await AsyncStorage.getItem('serverImages');
    return serverImages != null ? JSON.parse(serverImages) : [];
  }
}
