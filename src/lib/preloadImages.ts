/**
 * Preloads images progressively — first frame immediately,
 * then the rest in background batches.
 */
export function preloadImages(
  folder: string,
  frameCount: number,
  onProgress?: (loaded: number, total: number) => void
): Promise<HTMLImageElement[]> {
  const images: HTMLImageElement[] = new Array(frameCount)

  // Frames are named starting at 0001
  const currentFrame = (i: number) =>
    `/sequences/${folder}/frame_${String(i + 1).padStart(4, "0")}.jpg`

  return new Promise((resolve) => {
    let loaded = 0

    const loadOne = (i: number) =>
      new Promise<void>((res) => {
        const img = new Image()
        img.onload = () => {
          images[i] = img
          loaded++
          onProgress?.(loaded, frameCount)
          res()
        }
        img.onerror = () => {
          // Create a blank placeholder so index is always valid
          images[i] = new Image()
          loaded++
          res()
        }
        img.src = currentFrame(i)
      })

    // Load first frame immediately, then batch-load the rest
    const BATCH = 10
    loadOne(0).then(async () => {
      const rest = Array.from({ length: frameCount - 1 }, (_, i) => i + 1)
      for (let b = 0; b < rest.length; b += BATCH) {
        await Promise.all(rest.slice(b, b + BATCH).map(loadOne))
      }
      resolve(images)
    })
  })
}
