<div class:loaded style="width: 100%; max-width:{w}">
	<div style="overflow: hidden;" bind:offsetWidth={containerWidth}>
		<picture>
			<source type="image/avif" srcSet={getImageSrc({src}, "avif" , {containerWidth})}>
			<source type="image/webp" srcSet={getImageSrc({src}, "webp" , {containerWidth})}>
			<source srcSet={getImageSrc({src}, "jpg" , {containerWidth})}>
			<img use:load className="main {c}" alt="Image" src="/assets/images/{src}/{src}_10.webp" loading="lazy">
		</picture>
	</div>
</div>

<script>
	import getImageSrc from './getimg.js'

	export let w = "100%"
	export let c = "";
	let loaded = false;
	export let src = "";
	let containerWidth

	function load(img) {
		img.onload = () => loaded = true;
	}
</script>

<style>
	img {
		object-position: center;
		width: 100%;
		will-change: opacity;
	}

	.blur {
		filter: blur(1px);
		transform: scale(1);
		/*background: red;*/
	}

	.placeholder {
		position: relative;
		z-index: 1
	}

	.loaded .placeholder {
		position: absolute;
		/*opacity:0;*/
	}
</style>