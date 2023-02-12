import imageCompression from "browser-image-compression";

export function isEmptyObject(obj) {
  return JSON.stringify(obj) === "{}";
}

export function timeToHourTillNow(date) {
  let date1 = new Date();

  var diff = (date1.getTime() - date.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
}

export async function compressFile(imageFile) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    return compressedFile;
  } catch (error) {
    return { error: "File could not be commpressed" };
  }
}

export async function compressProfileImageFile(imageFile) {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 400,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(imageFile, options);

    return compressedFile;
  } catch (error) {
    return { error: "File could not be commpressed" };
  }
}
