import { useEffect, useState } from "react";
import * as ort from "onnxruntime-web";

export default function useOnnxSession(
  modelPath = "/models/buffalo_l/w600k_r50.onnx"
) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        ort.env.wasm.wasmPaths = "/onnxruntime/";

        const s = await ort.InferenceSession.create(modelPath, {
          executionProviders: ["wasm"],
        });
        if (!mounted) return;
        setSession(s);
        setLoading(false);
        console.log("Embedding models:", modelPath);
      } catch (err) {
        console.error("failed to load model", err);
        if (!mounted) return;
        setError(err);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [modelPath]);

  return { session, loading, error };
}
