import Frisbee from 'frisbee';
import AppStorage from '../Util/AppStorage';

const api = new Frisbee({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

async function fetchServerImages() {
  console.log('called fetchServerImages()');
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
  console.log('response response', response.ok);
  console.log('response', response);
  if (response.ok) {
    serverImages = response.body;
  }
  AppStorage.saveServerImagesToDisk(serverImages);
  return serverImages;
}

export const DataService = {
  fetchServerImages: fetchServerImages,
};
