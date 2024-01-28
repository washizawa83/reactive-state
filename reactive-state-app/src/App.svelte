<script lang="ts">
	import { Router, Route } from "svelte-routing";
	import TopPage from "./pages/TopPage.svelte";
	import AppPage from "./pages/AppPage.svelte";
</script>

<Router>
	<Route path="/" component="{TopPage}" />
	<Route path="app" component="{AppPage}" />
</Router>
  