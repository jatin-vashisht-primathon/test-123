"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        setUpdateAvailable(true);
      });
    }
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <div className="h-screen w-screen bg-red-300">
        Hello There Yp
      </div> 
      {updateAvailable && (
        <div className="fixed bottom-4 left-4 right-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg text-center">
          A new version is available!{" "}
          <button onClick={refreshPage} className="underline font-bold">
            Update
          </button>
        </div>
      )}
    </>
  );
}
