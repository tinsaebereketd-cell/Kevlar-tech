async function fileToOptimizedDataUrl(file: File): Promise<string> {
  const rawDataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Could not read selected image file.'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read selected image file.'));
    reader.readAsDataURL(file);
  });

  // Optimize large camera photos while keeping small PNG/WebP/JPEG intact
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error('Unsupported image format.'));
    el.src = rawDataUrl;
  });

  const MAX_DIMENSION = 1600;
  let { width, height } = img;
  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    if (width >= height) {
      height = Math.round((height * MAX_DIMENSION) / width);
      width = MAX_DIMENSION;
    } else {
      width = Math.round((width * MAX_DIMENSION) / height);
      height = MAX_DIMENSION;
    }
  } else if (rawDataUrl.length < 1_500_000 && /^data:image\/(png|jpeg|jpg|webp);base64,/i.test(rawDataUrl)) {
    return rawDataUrl;
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return rawDataUrl;
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL('image/jpeg', 0.86);
}

export async function uploadPcImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (JPG, PNG, or WebP).');
  }

  const dataUrl = await fileToOptimizedDataUrl(file);
  const response = await fetch('/api/inventory/upload-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ dataUrl }),
  });

  const data = (await response.json()) as { imageUrl?: string; error?: string };
  if (!response.ok || !data.imageUrl) {
    throw new Error(data.error ?? 'Failed to upload PC photo.');
  }

  return data.imageUrl;
}
