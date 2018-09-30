import test from "ava";
import { format } from ".";

test("format", t => {
  const list = [
    "https://status.firebase.google.com/incident/Crashlytics/18015",
    "https://status.firebase.google.com/incident/Hosting/18016",
    "https://status.firebase.google.com/incident/Hosting/18017",
    "https://status.firebase.google.com/incident/Realtime%20Database/18054",
    "https://status.firebase.google.com/incident/Realtime%20Database/18055",
    "https://status.firebase.google.com/incident/Realtime%20Database/18056",
  ];

  t.deepEqual(format(list), {
    Crashlytics: [
      "https://status.firebase.google.com/incident/Crashlytics/18015",
    ],
    Hosting: [
      "https://status.firebase.google.com/incident/Hosting/18016",
      "https://status.firebase.google.com/incident/Hosting/18017",
    ],
    "Realtime Database": [
      "https://status.firebase.google.com/incident/Realtime%20Database/18054",
      "https://status.firebase.google.com/incident/Realtime%20Database/18055",
      "https://status.firebase.google.com/incident/Realtime%20Database/18056",
    ],
  });
});
