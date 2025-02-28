"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function App() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
              setWaitingWorker(newWorker);
            }
          });
        });
      });
    }
  }, []);

  const refreshPage = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    window.location.reload();
  };

  return (
    <>
      {updateAvailable && (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg text-center">
          A new version is available!{" "}
          <button onClick={refreshPage} className="underline font-bold">
            Update
          </button>
        </div>
      )}
      <p className="bg-green-500">Hello There Everyone</p>
      <Image src='/test.jpg' alt='Image' height="300" width="300" />
    </>
  );
}
