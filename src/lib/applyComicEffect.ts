// lib/applyComicEffect.ts

export function applySolarize(imageData: ImageData): ImageData {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] > 127 ? 255 - data[i] : data[i];
    data[i + 1] = data[i + 1] > 127 ? 255 - data[i + 1] : data[i + 1];
    data[i + 2] = data[i + 2] > 127 ? 255 - data[i + 2] : data[i + 2];
  }
  return imageData;
}

export function applyEdgeDetect(imageData: ImageData): ImageData {
  const { width, height, data } = imageData;
  const output = new Uint8ClampedArray(data.length);
  const sobel = [-1, 0, 1, -2, 0, 2, -1, 0, 1];

  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      let gx = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = ((y + ky) * width + (x + kx)) * 4;
          const brightness = (data[px] + data[px + 1] + data[px + 2]) / 3;
          gx += brightness * sobel[(ky + 1) * 3 + (kx + 1)];
        }
      }
      const idx = (y * width + x) * 4;
      const edge = Math.min(255, Math.abs(gx));
      output[idx] = output[idx + 1] = output[idx + 2] = edge;
      output[idx + 3] = 255;
    }
  }
  imageData.data.set(output);
  return imageData;
}

export function applyGrainSepia(imageData: ImageData): ImageData {
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 30;
    let r = data[i] + noise;
    let g = data[i + 1] + noise;
    let b = data[i + 2] + noise;

    const sepiaR = r * 0.393 + g * 0.769 + b * 0.189;
    const sepiaG = r * 0.349 + g * 0.686 + b * 0.168;
    const sepiaB = r * 0.272 + g * 0.534 + b * 0.131;

    data[i] = Math.min(255, sepiaR);
    data[i + 1] = Math.min(255, sepiaG);
    data[i + 2] = Math.min(255, sepiaB);
  }
  return imageData;
}

export function applyPosterize(imageData: ImageData): ImageData {
  const data = imageData.data;
  const levels = 4;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.floor(data[i] / (256 / levels)) * (256 / levels);
    data[i + 1] = Math.floor(data[i + 1] / (256 / levels)) * (256 / levels);
    data[i + 2] = Math.floor(data[i + 2] / (256 / levels)) * (256 / levels);
  }
  return imageData;
}
// Cartoonify efekti – kenarları belirginleştirip renkleri yumuşatır
export function applyCartoonify(imageData: ImageData): ImageData {
  const data = imageData.data;
  const threshold = 40;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const avg = (r + g + b) / 3;

    const band = Math.round(avg / threshold) * threshold;
    data[i] = data[i + 1] = data[i + 2] = band;
  }

  return imageData;
}

// Comic Pop Contrast – yüksek kontrast ve doygunluk efekti
export function applyComicPop(imageData: ImageData): ImageData {
  const data = imageData.data;
  const contrast = 1.6;
  const brightness = 20;

  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, contrast * data[i] + brightness);     // R
    data[i + 1] = Math.min(255, contrast * data[i + 1] + brightness); // G
    data[i + 2] = Math.min(255, contrast * data[i + 2] + brightness); // B
  }

  return imageData;
}

