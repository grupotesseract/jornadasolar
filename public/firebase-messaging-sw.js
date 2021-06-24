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

//user clicked / tapped a push notification
self.addEventListener('notificationclick', function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  //get url from event
  let url = clickedNotification.data.FCM_MSG.data.link

  //exit if the url could not be found
  if (!url)
    return;

  url = 'app/' + url

  const promiseChain = clients.matchAll({
    type: 'window',
    includeUncontrolled: true
  }).then((windowClients) => {

    let matchingClient = null;
    console.log('windowClients', windowClients)

    if (windowClients.length > 0)
      matchingClient = windowClients[0]
    console.log('matchingClient', matchingClient)


    if (matchingClient) {
      matchingClient.focus()
      return;
    } else {
      return clients.openWindow(url);
    }
  });

  event.waitUntil(promiseChain);
  clickedNotification.close();

});



//background notifications will be received here
messaging.onBackgroundMessage((payload) => {
  const notification = payload.notification
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body,
    icon: '/icons/icon-192x192.png',
    requireInteration: true
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
