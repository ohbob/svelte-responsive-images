<script>
    import getImageSrc from './getimg.js'
    import { fade } from 'svelte/transition'
    export let w = "100%"
    export let c = "";

    let loaded = false;
    export let src = "";
    let containerWidth

    function load(img) {
        img.onload = () => loaded = true;
    }
</script>

<div class:loaded style="width: 100%; max-width:{w}">
    <div style="overflow: hidden;" bind:offsetWidth={containerWidth}>
        {#if !loaded}
        <img out:fade="{{duration: 300}}" class="placeholder blur" src="./images/jpg/{src}-10.jpg" alt="placeholder">
			{/if}
			<picture>
				<source type="image/webp" srcset={getImageSrc({src}, "webp" , {containerWidth})}>
				<source srcset={getImageSrc({src}, "jpg" , {containerWidth})}>
				<img use:load class="main {c}" alt="alt" srcset="./images/jpg/{src}-10.jpg"
				    onerror="this.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMszXpSDwAFYwJEhxButQAAAABJRU5ErkJggg==';"
				    loading="lazy">
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
        z-index: 1
    }

    .loaded .placeholder {
        position: absolute
    }
</style>