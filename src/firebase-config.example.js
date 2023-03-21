const firebaseConfig = {
    apiKey: "xxxxxxxx",
    authDomain: "xxxxxxx.firebaseapp.com",
    projectId: "xxxxxxx",
    storageBucket: "xxxxxxx.appspot.com",
    messagingSenderId: "xxxxxxxx",
    appId: "1:xxxxxxxxx:web:xxxxxxxxx"
};

export function getFirebaseConfig() {
    if (!firebaseConfig || !firebaseConfig.apiKey) {
      // eslint-disable-next-line no-useless-concat
      throw new Error('No Firebase configuration object provided.' + '\n' +
      'Add your web app\'s configuration object to firebase-config.js');
    } else {
      return firebaseConfig;
    }
}