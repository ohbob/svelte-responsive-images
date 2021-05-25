export default (imageName, imageFormat, maxSize) => {
    let setsrc = [50, 100, 200, 320, 420, 520, 620, 720, 920, 1020, 1220, 1420, 1920, 1920, 1920, 1920]
    let sizes = [25, 50, 100, 200, 320, 420, 520, 620, 720, 920, 1020, 1220, 1420, 1920, 1920]
    let str = ""
    let i = 0
    sizes.forEach(currentSize => {
        if ((currentSize) <= maxSize.containerWidth) {
            str = str.concat(
                `/assets/images/${imageName.src}/${imageName.src}_${setsrc[i]}.${imageFormat} ${currentSize}w, `
            )
        }
        i++
    })
    return str
}