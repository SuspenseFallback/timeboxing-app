// service-worker.js

self.addEventListener("push", (event) => {
  console.log("push", event.data.json().data.title);
  const options = {
    body: event.data.json().data.body,
  };

  event.waitUntil(
    self.registration.showNotification(event.data.json().data.title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("On notification click: ", event.notification.tag);
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url === "/" && "focus" in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow("/");
      })
  );
});
