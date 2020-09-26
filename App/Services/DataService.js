import Frisbee from 'frisbee';
import AppStorage from '../Util/AppStorage';

const api = new Frisbee({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function fetchServerImages() {
  let promises = [];
  api.setOptions({
    baseURI: 'https://jsonplaceholder.typicode.com/photos',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  let response = [];
  serverImages = [];
  try {
    response = await api.get();
  } catch (err) {
    Alert.alert(
      'Error',
      `Network request failed`,
      [
        {
          text: 'Ok',
          onPress: () => {
            console.log('');
          },
        },
      ],
      {cancelable: false},
    );
    return {error: 'unable to call api', err};
  }
  if (response.ok) {
    serverImages = response.body;
  }
  AppStorage.saveServerImagesToDisk(serverImages);
  localImages = await AppStorage.getLocalImages();
  response = {
    serverImages,
    localImages,
  };
  return response;
}

async function fetchLocalImages(payload) {
  let storedImages = await AppStorage.getLocalImages();
  let localImages = [];
  localImages.push(payload);
  let localImagesArray = localImages.concat(storedImages);
  let status = await AppStorage.saveLocalImagesToDisk(localImagesArray);
  return localImagesArray;
}

export const DataService = {
  fetchServerImages: fetchServerImages,
  fetchLocalImages: fetchLocalImages,
};
