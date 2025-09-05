import * as ort from "onnxruntime-web";

export function imageData(imageData, target = 112) {
  const { data, width, height } = imageData;
  const float32 = new Float32Array(width * height * 3);

  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];

    float32[i] = (r - 127.5) / 128.0;
    float32[i + width * height] = (g - 127.5) / 128.0;
    float32[i + 2 * width * height] = (b - 127.5) / 128.0;
  }

  return new ort.Tensor("float32", float32, [1, 3, height, width]);
}
