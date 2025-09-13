import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import useOnnxSession from "../hook/onnxSeesion";
import useFaceApi from "../hook/useFaceApi";
import { imageData } from "../hook/preprocess";

export default function FaceEmbedder({ onEmbed }) {
  const { session, loading: onnxLoading } = useOnnxSession();
  const { ready: faceReady, faceapi } = useFaceApi();
  const webcamRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [embedding, setEmbedding] = useState(null);

  async function handleCapture(e) {
    e.preventDefault();
    if (!session) return alert("ONNX model not loaded yet");
    if (!faceReady) return alert("Face-API not ready");

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) return alert("Cannot capture screenshot");

    const img = new Image();
    img.src = screenshot;

    img.onload = async () => {
      const det = await faceapi
        .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      if (!det)
        return alert("No face detected. please align your face to camera");

      const { box } = det.detection;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const pad = Math.max(box.width, box.height) * 0.3;
      const cx = box.x + box.width / 2;
      const cy = box.y + box.height / 2;
      const size = Math.max(box.width, box.height) + pad * 2;
      const sx = Math.max(0, cx - size / 2);
      const sy = Math.max(0, cy - size / 2);

      canvas.width = 112;
      canvas.height = 122;
      ctx.drawImage(img, sx, sy, size, size, 0, 0, 112, 112);
      setPreview(canvas.toDataURL("image/jpeg"));

      const imageDat = ctx.getImageData(0, 0, 112, 112);
      const input = imageData(imageDat);
      const feeds = { [session.inputNames[0]]: input };
      const out = await session.run(feeds);
      const output = out[session.outputNames[0]].data;
      setEmbedding(Array.from(output).slice(0, 16));
      console.log("embedding length:", output.length);

      if (onEmbed) {
        onEmbed({
          profilePic: canvas.toDataURL("image/jpeg"),
          embedding: Array.from(output),
        });
      }
    };
  }

  return (
    <div className="p-4 space-y-3">
      <div className="font-semibold">Face Embedding (Detected)</div>
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={320}
        height={240}
      />
      <button
        onClick={handleCapture}
        disabled={onnxLoading || !faceReady}
        className={`px-3 py-2 rounded text-white ${
          onnxLoading || !faceReady ? "bg-gray-400" : "bg-green-600"
        }`}
      >
        {onnxLoading
          ? "Loading ONNX…"
          : !faceReady
          ? "Loading Face-API…"
          : "Detect & Embed"}
      </button>

      {preview && (
        <div>
          <div className="text-sm">Aligned crop:</div>
          <img src={preview} alt="crop" width={112} height={112} />
        </div>
      )}

      {embedding && (
        <pre className="text-xs bg-gray-50 p-2 rounded">
          Embedding (first 16): {JSON.stringify(embedding, null, 2)}
        </pre>
      )}
    </div>
  );
}
