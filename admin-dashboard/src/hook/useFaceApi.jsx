import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export default function useFaceApi(modelPath = "/models/faceapi") {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(modelPath);
        await faceapi.nets.faceLandmark68Net.loadFromUri(modelPath);

        if (!mounted) return;
        setReady(true);
        console.log("Face Api models loaded");
      } catch (err) {
        console.error("face-api load error:", err);
        if (!mounted) return;
        setError(err);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [modelPath]);

  return { ready, error, faceapi };
}
