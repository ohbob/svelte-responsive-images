<script>
  const optimizedFolder = "optim";
  export let w = "100%";
  export let c = "";
  export let src = "";
  export let alt = "Image";
  let loaded = false;
  src = src.split(".")[0];
  let containerWidth;

  const SETSRC = [
    25, 50, 100, 200, 320, 420, 520, 620, 720, 920, 1020, 1220, 1420, 1920,
    1920, 1920, 1920,
  ];
  const SIZES = [
    10, 25, 50, 100, 200, 320, 420, 520, 620, 720, 920, 1020, 1220, 1420, 1920,
    1920,
  ];

  function load(img) {
    img.onload = () => (loaded = true);
  }

  function getImageSrc(src, imageFormat, maxSize) {
    let str = "";
    for (let i = 0; i < SIZES.length; i++) {
      const currentSize = SIZES[i];
      if (currentSize <= maxSize.containerWidth) {
        str += `${optimizedFolder}/${src.src}-${SETSRC[i]}.${imageFormat} ${currentSize}w, `;
      }
    }
    return str;
  }
</script>

<div class:loaded style="width: 100%; max-width:{w}">
  <div style="overflow: hidden;" bind:offsetWidth={containerWidth}>
    <picture>
      <source
        type="image/avif"
        srcSet={getImageSrc({ src }, "avif", { containerWidth })}
      />
      <source
        type="image/webp"
        srcSet={getImageSrc({ src }, "webp", { containerWidth })}
      />
      <source
        type="image/jpg"
        srcSet={getImageSrc({ src }, "jpg", { containerWidth })}
      />
      <source srcSet={getImageSrc({ src }, "jpg", { containerWidth })} />
      <img
        use:load
        className="main {c}"
        {alt}
        src="./{optimizedFolder}/{src}-25.webp"
        loading="lazy"
      />
    </picture>
  </div>
</div>

<style>
  img {
    object-position: center;
    width: 100%;
    will-change: opacity;
  }

  .blur {
    filter: blur(1px);
    transform: scale(1);
  }

  .placeholder {
    position: relative;
    z-index: 1;
  }

  .loaded .placeholder {
    position: absolute;
  }
</style>
