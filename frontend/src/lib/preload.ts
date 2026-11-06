export function preloadImage(src: string | null) {
  if (!src) {
    return Promise.resolve(false);
  }
  const image = new Image();
  image.src = src;
  return image.decode().then(
    () => true,
    () => false,
  );
}
