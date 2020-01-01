<script>
import Image from "./components/svelte-responsive-images/index.svelte"
import Post from "./components/Post.svelte"
</script>

<div class="container">
	<Image src="100" />
</div>

<Post />


<style>
.container{
	max-width:1050px;
	margin: 0 auto;
}
</style>



