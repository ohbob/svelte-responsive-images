# Svelte-responsive-images
Svelte-responsive-images is a preprocessor which automates image optimization using [sharp](https://github.com/lovell/sharp).

It parses your `img` tags, optimizes and replaces src accordingly to the width of the parent element. (External images are not optimized.)

`Image` component enables lazyloading and serving webp and a fallback jpg with multiple sizes via `srcset`, and sets a tiny 10x10 placeholder of the source image, while the larger image is loading.
[Live Demo](https://demo.digitalsolutions.lv), [src demo](https://github.com/robertsozolins/svelte-responsive-images/tree/master/demo_post),

# Usage
Edit your rollup configuration.

    # rollup.config.js
    import { imageOptimizer } from 'svelte-responsive-images'
    plugins: [
	    ImageOptimizer(),
	    ....
	    ]

Now you can the  component, but note that we aren't adding any extensions to the filename.

    import { Image } from "svelte-responsive-images";
    <Image src="1" />

## How does the optimization work?

- On start time the script looks for images in /public/
-  Performs checks if /public/images/jpg/ or /webp/ exsists if not makes them.
- After that checks if the optimized files aren't already there and creates optimized versions of images as seen in table below.
- I went for 70% for quality of jpg/webp.  The reason is that I'm serving one step higher resolution as it's cheaper than going up in quality, but still maintaining good filesize and quality.

|source |size|webp|size|jpg|size|
|--|-----|----|----|---|--|
|Sample.jpg|8.37mb |Sample-1920.webp| 187kb | Sample-1920.jpg|407kb |
|| |Sample-1420.webp| 118kb | Sample-1420.jpg|246kb |
|| |Sample-1220.webp| 95kb | Sample-1220.jpg|188kb |
|| |Sample-1020.webp| 73kb | Sample-1020.jpg|139kb|
|| |Sample-920.webp| 73kb | Sample-920.jpg| 113kb|
|| |Sample-720.webp| 42kb | Sample-720.jpg|76kb |
|| |Sample-620.webp| 33kb | Sample-620.jpg|60kb|
|| |Sample-520.webp| 26kb | Sample-520.jpg|45kb |
|| |Sample-420.webp| 18kb | Sample-420.jpg|32kb |
|| |Sample-320.webp| 12kb | Sample-320.jpg|21kb |
|| |Sample-200.webp| 7kb | Sample-200.jpg|11kb|
|| |Sample-100.webp| 3kb | Sample-100.jpg|4kb|
|| |Sample-50.webp| 908b | Sample-50.jpg|2kb|
|| |Sample-25.webp| 334b | Sample-25.jpg|650b|
|||Sample-10.webp| 118b | Sample-10.jpg|341b|

## Component

The component adjusts srcset to the width of the parent container. In the [demo](https://demo.digitalsolutions.lv) example, it's 1050px wide.

       <picture>
	       <source type="image/webp"
	       srcset="./images/webp/100-50.webp 25w,
	       ./images/webp/100-100.webp 50w,
	       ./images/webp/100-200.webp 100w,
	       ./images/webp/100-320.webp 200w,
	       ./images/webp/100-420.webp 320w,
	       ./images/webp/100-520.webp 420w,
	       ./images/webp/100-620.webp 520w,
	       ./images/webp/100-720.webp 620w,
	       ./images/webp/100-920.webp 720w,
	       ./images/webp/100-1020.webp 920w,
	       ./images/webp/100-1220.webp 1020w, ">

	       <source srcset="./images/jpg/100-50.jpg 25w,
	       ./images/jpg/100-100.jpg 50w,
	       ./images/jpg/100-200.jpg 100w,
	       ./images/jpg/100-320.jpg 200w,
	       ./images/jpg/100-420.jpg 320w,
	       ./images/jpg/100-520.jpg 420w,
	       ./images/jpg/100-620.jpg 520w,
	       ./images/jpg/100-720.jpg 620w,
	       ./images/jpg/100-920.jpg 720w,
	       ./images/jpg/100-1020.jpg 920w,
	       ./images/jpg/100-1220.jpg 1020w, ">

	       <img class="main  svelte-i277u2"
		       alt="alt"
		       srcset="./images/jpg/100-10.jpg"
		       onerror="this.src = 'noPhotoFound.png';"
		       loading="lazy">
	</picture>
