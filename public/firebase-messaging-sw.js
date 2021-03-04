importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');
  firebase.initializeApp({
    projectId: 'jornadasolar-dev',
    authDomain: 'jornadasolar-dev.firebasedev.com',
    apiKey: 'AIzaSyCVPPYUcfB5vtYF34hFX0HEYelMcE5qvBg',
    messagingSenderId: '606006334999',
    appId: '1:606006334999:web:22f530ae5fce3e2474ee5'
  });
  firebase.messaging();
  //background notifications will be received here
  firebase.messaging().setBackgroundMessageHandler((payload) => console.log('payload', payload));
