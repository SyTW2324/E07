import Compressor from 'compressorjs';


export async function compressImages(pictures: File[]) {
  const compressedImages = await Promise.all(
    pictures.map(async (picture) => {
      const compressedImage = await compressImage(picture);
      return compressedImage;
    })
  );

  return compressedImages;
}

export async function compressImage(file: File) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(result);
      },
      error(e) {
        console.error('Error al comprimir la imagen:', e);
        reject(e);
      },
    });
  });
}