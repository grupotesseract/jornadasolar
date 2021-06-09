importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.1/firebase-messaging.js');

firebase.initializeApp({
  projectId: 'jornadasolar-dev',
  authDomain: 'jornadasolar-dev.firebasedev.com',
  apiKey: 'AIzaSyCVPPYUcfB5vtYF34hFX0HEYelMcE5qvBg',
  messagingSenderId: '606006334999',
  appId: '1:606006334999:web:22f530ae5fce3e2474ee5'
});

const messaging = firebase.messaging();
//background notifications will be received here
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title + ' - in';
  const notificationOptions = {
    body: payload.notification.body,
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      console.log('registration', registration)
      registration.showNotification(notificationTitle, notificationOptions);
    }
  })
});